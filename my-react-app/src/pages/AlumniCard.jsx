import React, { useEffect, useState } from 'react';
import './AlumniCard.css'; // Import CSS file for styling
import { db, auth } from "../firebase.js"; // Import the db and auth objects from your Firebase configuration
import { collection, getDocs, where, query } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faHandshake } from '@fortawesome/free-solid-svg-icons'; // Import faHandshake icon
import logo from '.././assets/logo3.png'; // Import logo image

const AlumniCard = () => {
  const [alumniData, setAlumniData] = useState(null); // Change state initialization to null
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("userId") !== null;
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot = await getDocs(q);

        if (snapshot.size > 0) {
          snapshot.forEach((doc) => {
            const userData = doc.data();
            const alumni = {
              name: userData.name,
              degree: userData.degree,
              department: userData.department,
              passingYear: userData.passingYear,
              mobileNumber: userData.phone, // Assuming 'phone' is the field for the mobile number
              profileURL: userData.profileURL, // Assuming 'profileURL' is the field for the profile photo URL
            };
            setAlumniData(alumni);
          });
        } else {
          console.log('No documents found for the given query.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
    <div className='community-events-heading'>
        <h1> <FontAwesomeIcon icon={faHandshake} /> Alumni Membership Card</h1>
    </div>
    <div className="alumni-card">
      
      <div className="header">
        <div className="logo">
          <img src={logo} alt="College Logo" />
        </div>
        {/* <p>Alumni Membership Card</p> */}
      </div>
      <div className="alumni-content">
        <div className="profile-photo">
          {alumniData && <img src={alumniData.profileURL} alt="Profile" />} {/* Render the profile photo */}
        </div>
        <div className="info">
          <div>
            <h3>{alumniData && alumniData.name}</h3>
          </div>
          <div>
            <p className="degree">Degree: {alumniData && alumniData.degree}</p>
          </div>
          <div>
            <p className="department">Department: {alumniData && alumniData.department}</p>
          </div>
          <div>
            <p className="passing-year">Passing Year: {alumniData && alumniData.passingYear}</p>
          </div>
          <div>
            <p className="contact">Mobile: {alumniData && alumniData.mobileNumber}</p>
          </div>
        </div>
      </div>
    </div>
    </> 
  );
};

export default AlumniCard;
