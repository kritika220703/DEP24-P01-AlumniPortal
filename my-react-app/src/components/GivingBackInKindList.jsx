import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { auth, db } from "../firebase.js";
import { query, where, getDocs, collection } from 'firebase/firestore';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { motion } from 'framer-motion';
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
          className="p-1 border rounded-md  bg-gray-600 hover:bg-gray-400"
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    
     '& td, & th': {
      border: 0,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.slate300, // Change this to the desired hover color
    },
  }));
  

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
      

<TableContainer component={Paper} className='mb-[60px]'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table" className='shadow-3xl '>
        <TableHead>
          <TableRow hover>
            <StyledTableCell> Name  <FilterDropdown options={users.map(user => user.name)} columnName="name" className="text-black"/></StyledTableCell>
            <StyledTableCell align="right">Email <FilterDropdown options={users.map(user => user.email)} columnName="email" /></StyledTableCell>
            <StyledTableCell align="right">Degree  <FilterDropdown options={users.map(user => user.degree)} columnName="degree" /></StyledTableCell>
            <StyledTableCell align="right"> Department  <FilterDropdown options={users.map(user => user.department)} columnName="department" /></StyledTableCell>
            <StyledTableCell align="right">Entry No  <FilterDropdown options={users.map(user => user.entryNo)} columnName="entryNo" /></StyledTableCell>
            <StyledTableCell align="right">Phone <FilterDropdown options={users.map(user => user.phone)} columnName="phone" /></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filteredUsers.map((user, index) => (
            <StyledTableRow key={index} hover sx={{cursor:"pointer"}}>
              
              <StyledTableCell >
              {user.name}
              </StyledTableCell>
              <StyledTableCell align="right" >{user.email}</StyledTableCell>
              <StyledTableCell align="right">{user.degree}</StyledTableCell>
              <StyledTableCell align="right">{user.department}</StyledTableCell>
              <StyledTableCell align="right">{user.entryNo}</StyledTableCell>
              <StyledTableCell align="right">{user.phone}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default GivingBackInKindListComponent;
