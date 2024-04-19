import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Assuming you have firebase.js setup correctly
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const RegistrationsPage = () => {
  const { batch } = useParams(); // Get the id and batch parameters from the URL
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // const q = query(collection(db, 'plannedReunions', batch, 'registeredCandidates')); // Assuming 'registeredCandidates' is the name of the collection
        const colRef = collection(db, "plannedReunions");
        // console.log(colRef);
        const q = query(colRef, where("batch", "==", batch));
        const querySnapshot = await getDocs(q);
        const registrationData = querySnapshot.docs.map((doc) => doc.data());
        setRegistrations(registrationData[0].registeredCandidates);
        console.log(registrationData[0].registeredCandidates);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
  }, [batch]);

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
    "& td, & th": {
      border: 0,
    },
    "&:hover": {
      backgroundColor: theme.palette.background.slate300, // Change this to the desired hover color
    },
  }));

  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[25px] text-white border bg-indigo-700 p-2 px-4 mt-5 w-full text-center mx-auto rounded-full font-bold mb-8">
            Registrations for Reunion {batch}
          </h2>
        </motion.div>
      </div>
      <TableContainer component={Paper} className="mb-[60px]">
        <Table
            sx={{ minWidth: 700 }}
            aria-label="customized table"
            className="shadow-3xl"
        >
            <TableHead>
                <TableRow hover>
                    <StyledTableCell align="right">S. No.</StyledTableCell> {/* Index column */}
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>

                    <StyledTableCell align="right">Entry No</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {registrations.map((registration, index) => (
                <StyledTableRow hover key={index} sx={{cursor: "pointer"}}>
                    <StyledTableCell align="right">{index + 1}</StyledTableCell>
                    <StyledTableCell align="right">{registration.name}</StyledTableCell>
                    <StyledTableCell align="right">{registration.email}</StyledTableCell>
                    <StyledTableCell align="right">{registration.entryNo}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
      </TableContainer>
      {/* <p>Batch: {batch}</p>
      <ul>
        {registrations.map((registration, index) => (
          <li key={index}>
            <p>Name: {registration.name}</p>
            <p>Email: {registration.email}</p>
            <p>Entry No: {registration.entryNo}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default RegistrationsPage;
