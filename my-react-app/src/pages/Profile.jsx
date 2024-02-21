import React, {useState, useEffect} from 'react'
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { addDoc, getDoc, getDocs, collection, doc, updateDoc, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: '',
        email: '',
        phone: '',
        institute: '',
    });
    const [userData, setUserData] = useState(null);

    // const user = {
    //     name: 'John Doe',
    //     email: 'john.doe@example.com',
    //     phone: '+1234567890',
    //     institute: 'Example Institute', // Add institute name
    //     // Add more fields as needed
    // };

    useEffect(() => {
        console.log('Updated userData:', userData);
    }, [userData]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("trying to fetch");
                const userId = auth.currentUser.uid;
                console.log("suerid:  ", userId);
                
                const colRef = collection(db, 'Users');
                console.log(colRef);
                const q = query(colRef, where('uid', '==', userId));
                
                try {
                    const snapshot = await getDocs(q);
                  
                    if (snapshot.size > 0) {
                      // Documents satisfying the query exist
                      snapshot.forEach((doc) => {
                        console.log(doc.id, '=>', doc.data());
                        setUserData(doc.data());
                        console.log("after: ",userData);
                      });
                    } else {
                      console.log('No documents found for the given query.');
                    }
                } catch (error) {
                    console.error('Error getting documents:', error);
                }
                
            } catch (error) {
                console.error('Error fetching user data:', error);
                console.log("error in fetching data from firebase");
            }
        };

        fetchUserData();
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    

    const handleEditClick = () => {
        setIsEditing(!isEditing);

        // Initialize editedUser with the fetched user data when entering edit mode
        setEditedUser({
            name: userData?.name || '',
            email: userData?.email || '',
            phone: userData?.phone || '',
            institute: userData?.institute || '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleSaveChanges = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);
            const colRef = collection(db, 'Users');
            const q = query(colRef, where('uid', '==', userId));

            const querySnapshot = await getDocs(q);

            // Check if any documents match the query
            if (querySnapshot.size > 0) {
            // Get the reference to the first matching document
            const docRef = doc(db, 'Users', querySnapshot.docs[0].id);

            // Update the document with the new data
            await updateDoc(docRef, editedUser);

            // Fetch updated data after saving changes
            const updatedSnapshot = await getDoc(docRef);

            if (updatedSnapshot.exists()) {
                // Update the userData state with the new data
                setUserData(updatedSnapshot.data());
            }

            console.log('Document successfully updated!');
            } else {
            console.log('No documents found for the given query.');
            }
            // Update the Firestore document with the edited user details
            // await updateDoc(userDocRef, editedUser);

            setIsEditing(false);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      

    const renderProfileDetails = () => {
        return (
            <div className="p-4 ">
                {userData ? (
                    <>
                        <div className="text-center mb-4">
                            <FaUser className="text-4xl text-indigo-500 mb-2" />
                            <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                <FaEnvelope className="text-lg text-gray-400 mr-2" />
                                {userData.email}
                            </p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                <FaPhone className="text-lg text-gray-400 mr-2" />
                                {userData.phone}
                            </p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-600">
                                <strong>Institute:</strong> {userData.institute}
                            </p>
                        </div>
                    </>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        );
    };

    const renderEditProfileForm = () => {
        return (
            <div className="p-4 ">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={editedUser.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email id"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone No."
                        value={editedUser.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="institute"
                        placeholder="Institute Name"
                        value={editedUser.institute}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                        // onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="container mx-auto mt-8 p-4 flex items-center h-screen">
            <div className="w-[60%] max-w-[800px] mx-auto bg-white rounded-md overflow-hidden shadow-md flex flex-col">
                {/* {isEditing ? renderEditProfileForm() : renderProfileDetails()} */}

                <div className="p-4">
                    <button
                        className="bg-indigo-500 text-white px-4 py-2 rounded-md"
                        // onClick={handleEditClick}
                        disabled={isEditing} // Disable button while editing
                    >
                        {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                    </button>
                </div>

                {/* <Stack direction="row" spacing={2} className="ml-auto">
                    <Avatar {...stringAvatar(userData.name)} sx={{ width: 80, height: 80 }} />
                </Stack> */}

            </div>
        </div>
    );
}

export default Profile