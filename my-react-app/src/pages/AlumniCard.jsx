import React, { useEffect, useState } from 'react';
import './AlumniCard.css'; // Import CSS file for styling
import { db, auth } from "../firebase.js"; // Import the db and auth objects from your Firebase configuration
import { collection, getDocs, where, query } from "firebase/firestore";
import logo from '.././assets/logo.png'; // Import logo image

const AlumniCard = () => {
  const [alumniData, setAlumniData] = useState(null); // Change state initialization to null

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const user = auth.currentUser; // Get the currently logged-in user
        if (user) {
          // Query the 'users' collection to find the document corresponding to the logged-in user
          const q = query(collection(db, 'users'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(doc => {
            const userData = doc.data();
            // Extract the required fields and create an object with them
            const alumni = {
              degree: userData.degree,
              department: userData.department,
              name: userData.name,
              passingYear: userData.passingYear,
              mobileNumber: userData.mobileNumber
            };
            setAlumniData(alumni);
          });
        } else {
          console.error('No user logged in.');
        }
      } catch (error) {
        console.error('Error fetching alumni data:', error);
      }
    };

    fetchAlumniData();
  }, []);

  return (
    <div>
      {alumniData && ( // Check if alumniData is not null before rendering
        <div className="alumni-card">
          <div className="college-logo">
            <img src={logo} alt="College Logo" />
          </div>
          <div className="alumni-content">
            <div className="alumni-details">
              <h3>{alumniData.name}</h3>
              <p className="degree">Degree: {alumniData.degree}</p>
              <p className="department">Department: {alumniData.department}</p>
              <p className="passing-year">Passing Year: {alumniData.passingYear}</p>
              <p className="contact">Mobile: {alumniData.mobileNumber}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniCard;
