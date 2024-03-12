import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';

const GivingBackInKindListComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase Firestore
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "Giving Back In kind");
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map(doc => doc.data());

        const adminRef = collection(db, "Admin");
        const adminSnapshot = await getDocs(adminRef);
        const adminEmails = adminSnapshot.docs.map(doc => doc.data().email);

        // Filter out users whose emails are also in the admin collection
        const filteredUsers = usersData.filter(user => !adminEmails.includes(user.email));
        
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className='flex justify-center'>
        <h2 className="text-3xl text-white border bg-indigo-700 p-3 w-[400px] text-center mx-auto rounded-lg font-bold mb-8">Giving BAck In Kind List</h2>
      </div>
      <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
        <table className="w-full border-collapse border-3xl border-gray-400 rounded-lg">
            <thead>
            <tr>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Name</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Email</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Degree</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Department</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Year of Passing</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Phone</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Item Name</th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">Time Taken to Give</th>
                {/* Add more headers as needed */}
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                <td className="p-3 border border-gray-400 bg-white">{user.name}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.email}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.degree}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.department}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.passingYear}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.phone}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.itemName}</td>
                <td className="p-3 border border-gray-400 bg-white">{user.duration}</td>
                {/* Add more cells as needed */}
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default GivingBackInKindListComponent;
