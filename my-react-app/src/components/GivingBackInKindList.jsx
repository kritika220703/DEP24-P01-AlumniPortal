import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';
import {motion} from 'framer-motion'

const GivingBackInKindListComponent = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: [],
    email: [],
    degree: [],
    department: [],
    passingYear: [],
    phone: [],
    itemName: [],
    duration: []
  });

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

        // Reset filters to initial state
        setFilters({
          name: [],
          email: [],
          degree: [],
          department: [],
          passingYear: [],
          phone: [],
          itemName: [],
          duration: []
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filters]);

  const applyFilter = () => {
    let filtered = [...users];
    Object.keys(filters).forEach(key => {
      const selectedFilters = filters[key];
      if (selectedFilters.length > 0) {
        filtered = filtered.filter(user => selectedFilters.includes(user[key]));
      }
    });
    setFilteredUsers(filtered);
  };

  const FilterDropdown = ({ options, columnName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const uniqueOptions = [...new Set(options)]; // Filter out duplicates
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleFilterChange = (e) => {
      const { value, checked } = e.target;
      const newFilters = checked
        ? [...filters[columnName], value]
        : filters[columnName].filter((filter) => filter !== value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        [columnName]: newFilters,
      }));
    };
  
    return (
      <div className="relative inline ml-2">
        <button
          className="p-1 border rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 inline-block mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.293 4.293a1 1 0 0 1 1.414 0L9 9.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414zM9 11a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1z"
              clipRule="evenodd"
            />
          </svg>

          
        </button>
        {isOpen && (
          <div className="absolute top-10 bg-white border rounded-md p-2">
            {uniqueOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option}
                  onChange={handleFilterChange}
                  checked={filters[columnName].includes(option)}
                />
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return ( 
    <div className="container mx-auto px-8">
      <div className='flex justify-center'>
      <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl text-white border mt-5 rounded-full bg-indigo-700 p-3 w-[400px] text-center mx-auto font-bold mb-8">
        Giving Back In Kind List
      </h2>
    </motion.div>
      </div>
      <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
        <table className="w-full border-collapse border-3xl border-gray-400 rounded-lg">
            <thead>
            <tr>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Name  <FilterDropdown options={users.map(user => user.name)} columnName="name" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Email <FilterDropdown options={users.map(user => user.email)} columnName="email" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Degree  <FilterDropdown options={users.map(user => user.degree)} columnName="degree" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Department  <FilterDropdown options={users.map(user => user.department)} columnName="department" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Year of Passing <FilterDropdown options={users.map(user => user.passingYear)} columnName="passingYear" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Phone <FilterDropdown options={users.map(user => user.phone)} columnName="phone" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Item Name <FilterDropdown options={users.map(user => user.itemName)} columnName="itemName" />
                </th>
                <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                  Time Taken to Give  <FilterDropdown options={users.map(user => user.duration)} columnName="duration" />
                </th>
                {/* Add more headers as needed */}
            </tr>
            </thead>
            <tbody>
            {filteredUsers.map((user, index) => (
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
