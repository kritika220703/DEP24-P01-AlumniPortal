import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';

const PastReunionsList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        title: [],
        date: [],
        batch: []
    });

    useEffect(() => {
        // Fetch data from Firebase Firestore
        const fetchData = async () => {
          try {
            const Ref = collection(db, "pastReunions");
            const Snapshot = await getDocs(Ref);
            const Data = Snapshot.docs.map(doc => doc.data());
            
            setUsers(Data);
    
            // Reset filters to initial state
            setFilters({
                title: [],
                date: [],
                batch: []
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
                <h2 className="text-3xl text-white border bg-indigo-700 p-3 w-[400px] text-center mx-auto rounded-lg font-bold mb-8">Past Reunions</h2>
            </div>
            <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
                <table className="w-full border-collapse border-3xl border-gray-400 rounded-lg">
                    <thead>
                        <tr>
                            <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                                Batch  <FilterDropdown options={users.map(user => user.batch)} columnName="batch" />
                            </th>
                            <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                                Date <FilterDropdown options={users.map(user => user.date)} columnName="date" />
                            </th>
                            <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                                Title  <FilterDropdown options={users.map(user => user.title)} columnName="title" />
                            </th>
                            <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                                Description
                            </th>
                            <th className="sticky top-0 z-10 p-3 font-bold bg-gray-400 text-gray-800 border border-gray-700">
                                Image URL
                            </th>
                            {/* Add more headers as needed */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td className="p-3 border border-gray-400 bg-white">{user.batch}</td>
                                <td className="p-3 border border-gray-400 bg-white">{user.date}</td>
                                <td className="p-3 border border-gray-400 bg-white">{user.title}</td>
                                <td className="p-3 border border-gray-400 bg-white">{user.description}</td>
                                <td className="p-3 border border-gray-400 bg-white">{user.imageUrl}</td>
                                {/* Add more cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PastReunionsList