import React, { useState, useEffect } from 'react';
import './CommunityEventsAdmin.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { db } from "../firebase.js";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../firebase.js";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};

function CommunityEventsAdmin() {
    const [reunionType, setReunionType] = useState('planned'); // Default to editing planned reunions
    const [reunionOptions, setReunionOptions] = useState(['planned', 'past']);
    const [plannedReunions, setPlannedReunions] = useState([]);
    const [pastReunions, setPastReunions] = useState([]);
    const [batch, setBatch] = useState('');
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        // Fetch planned reunions from Firestore on component mount
        const fetchPlannedReunions = async () => {
            try {
                const reunionCollection = collection(db, 'plannedReunions');
                const reunionsSnapshot = await getDocs(reunionCollection);
                const reunionsData = reunionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPlannedReunions(reunionsData);
            } catch (error) {
                console.error('Error fetching planned reunions: ', error);
            }
        };

        // Fetch past reunions from Firestore on component mount
        const fetchPastReunions = async () => {
            try {
                const reunionCollection = collection(db, 'pastReunions');
                const reunionsSnapshot = await getDocs(reunionCollection);
                const reunionsData = reunionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPastReunions(reunionsData);
            } catch (error) {
                console.error('Error fetching past reunions: ', error);
            }
        };

        fetchPlannedReunions();
        fetchPastReunions();
    }, []);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddReunion = async () => {
        if (!batch || !date || !title || !description || !image) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const storageRef = ref(storage, `/reunionImages/${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {},
                (error) => {
                    console.log("Error uploading file:", error);
                },
                async () => {
                    try {
                        const url = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log("URL: ", url);

                        const reunionData = {
                            batch,
                            date,
                            title,
                            description,
                            imageUrl: url,
                        };

                        const collectionName = reunionType === 'planned' ? 'plannedReunions' : 'pastReunions';
                        await addDoc(collection(db, collectionName), reunionData);
                        toast.success("Reunion Added Successfully", toastOptions);
                    } catch (error) {
                        console.log("Error getting download URL or saving data:", error);
                    }
                }
            );

            // Reset form fields
            setBatch('');
            setDate('');
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Error adding reunion: ', error);
        }
    };

    return (
        <div className="community-events-admin">
            <div className='community-events-heading-admin'>
                <h1><FontAwesomeIcon icon={faHandshake} /> Community Events</h1>
            </div>
            <form className="reunion-input-container">
                <select value={reunionType} onChange={(e) => setReunionType(e.target.value)}>
                    {reunionOptions.map(option => (
                        <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)} Reunions
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    name="reunionImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="button" onClick={handleAddReunion}>Add Reunion</button>
            </form>
            <ToastContainer {...toastOptions} />
        </div>
    );
}

export default CommunityEventsAdmin;
