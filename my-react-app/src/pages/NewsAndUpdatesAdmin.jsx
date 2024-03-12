import React, { useState } from 'react';
import './NewsAndUpdatesAdmin.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {db} from "../firebase.js";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import {storage} from "../firebase.js";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
} from "firebase/storage";

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

function NewsAndUpdatesAdmin() {
  const [newsHeading, setNewsHeading] = useState('');
  const [newsDescription, setNewsDescription] = useState('');
  const [newsImage, setNewsImage] = useState(null);
  const [newsurl, setNewsUrl ] = useState('');

  const handleNewsChange = (e) => {
    setNewsImage(e.target.files[0]);
  };

  const handleAddNews = async () => {
    if (!newsHeading || !newsDescription) {
      alert('Please fill in all fields');
      return;
    }
    // console.log(newsHeading);
    // console.log(newsDescription);
    // console.log(newsImage);
    const storageRef = ref(storage,`/news/${newsImage.name}`)
    const uploadTask = uploadBytesResumable(storageRef, newsImage);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            
        },
        (error) => {
            console.log("Error uploading file:", error);
        },
        async () => {
            try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("URL: ", url);
                setNewsUrl(url);
                console.log(url);
                const docRef = await addDoc(collection(db, 'NewsUpdates'), {
                    id: Date.now(),
                    Heading: newsHeading,
                    Description: newsDescription,
                    NewsUrl: url
                });
                
            } catch (error) {
                console.log("Error getting download URL or saving data:", error);
            }
        }
    ); 
    toast.success("News Updated Successfully", toastOptions);

    setNewsHeading('');
    setNewsDescription('');
    setNewsImage(null);
  };

  return (
    <div className="news-admin">
        <div className='news-updates-heading-admin'>
          <h1><FontAwesomeIcon icon={faNewspaper} /> News and Updates</h1>
        </div>
      <div className="news-input-container">
        <label>
          News Heading:
          <input
            type="text"
            value={newsHeading}
            onChange={(e) => setNewsHeading(e.target.value)}
          />
        </label>
        <label>
          News Description:
          <textarea
            value={newsDescription}
            onChange={(e) => setNewsDescription(e.target.value)}
          />
        </label>
        <label>
          News Image URL:
          <input name= "profilepic" type="file" accept="image/*" onChange={handleNewsChange} />
        </label>
        <button onClick={handleAddNews}>Add News</button>
      </div>
    </div>
  );
}

export default NewsAndUpdatesAdmin;
