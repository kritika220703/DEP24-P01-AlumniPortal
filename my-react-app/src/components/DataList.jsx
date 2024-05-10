import React, { useState } from 'react';
import GivingBackInKindListComponent from './GivingBackInKindList';
import UserListComponent from './UserListComponent';
import PlannedReunionsList from './PlannedReunionsList';
import PastReunionsList from './PastReunionsList';
import SidebarProfile from "./SidebarProfile";
import AdminList from "./AdminList";
import * as XLSX from 'xlsx';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import HomeProfile from './HomeProfile';

const DataList = () => {
    const [selectedOption, setSelectedOption] = useState('Home');

    // Fetch data functions
    const fetchDataForAlumni = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterAlumniData(data);
    };

    const fetchDataForAdmin = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "admin"));
        querySnapshot.forEach((doc) => {
            data.push({...doc.data() });
        });
        return filterAdminData(data);
    };

    const fetchDataForGiveBack = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "Giving Back In kind"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterGiveBackData(data);
    };

    const fetchDataForPastReunions = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "pastReunions"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return filterPastReunionsData(data);
    };

    const fetchDataForPlannedReunions = async () => {
        const data = [];
        const querySnapshot = await getDocs(collection(db, "plannedReunions"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    };

    // Function to filter Alumni data to keep only the specified columns
    const filterAlumniData = (data) => {
        return data.map((item) => ({
            name: item.name,
            degree: item.degree,
            entryNo: item.entryNo,
            joiningYear: item.joiningYear,
            hostel: item.hostel,
            email: item.email,
            role: item.role,
            phone: item.phone,
            department: item.department,
            country: item.country,
            passingYear: item.passingYear,
            approved: item.approved,
            address: item.address,
            linkedin: item.linkedin,
        }));
    };

    const filterAdminData = (data) => {
        return data.map((item) => ({
            email: item.email,
            approved: item.approved,
        }));
    };

    // Function to filter "Giving Back in Kind" data to keep only the specified columns
    const filterGiveBackData = (data) => {
        return data.map((item) => ({
            name: item.name,
            degree: item.degree,
            department: item.department,
            itemName: item.itemName,
            duration: item.duration,
            phone: item.phone,
            email: item.email,
            hostel: item.hostel,
            entryNo: item.entryNo,
            passingYear: item.passingYear,
            country: item.country,
            linkedIn: item.linkedIn,
        }));
    };

    const filterPastReunionsData = (data) => {
        return data.map((item) => ({
            title: item.title,
            batch: item.batch,
            date: item.date,
            description: item.description,
        }));
    };

    // Function to export data to Excel
    const exportToExcel = (data) => {
        // Convert the data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate the Excel file as a binary string
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a blob from the binary string
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        // Create a link element and set the URL to the blob
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');

        // Trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Render form based on selected option
    const renderForm = () => {
        const handleDownloadClick = async () => {
            let data = [];

            // Determine which data to fetch based on the selected option
            switch (selectedOption) {
                case 'Alumni':
                    data = await fetchDataForAlumni();
                    break;
                case 'Give Back in Kind':
                    data = await fetchDataForGiveBack();
                    break;
                case 'Past Reunions':
                    data = await fetchDataForPastReunions();
                    break;
                case 'Planned Reunions':
                    data = await fetchDataForPlannedReunions();
                    break;
                case 'Admin':
                    data = await fetchDataForAdmin();
                    break;
                default:
                    return null;
            }

            // Export the data to Excel
            exportToExcel(data);
        };

        const buttonStyle = {
            display: 'block',
            margin: '20px auto', // Centers the button
            padding: '10px 20px',
            backgroundColor: '#007bff', // Blue background color
            color: '#fff',
            borderRadius: '12px', // Rounded corners
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
        };

        switch (selectedOption) {
            case 'Home':
                return (
                    <>
                        <HomeProfile />
                        
                    </>
                );
            case 'Alumni':
                return (
                    <>
                        <UserListComponent />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Give Back in Kind':
                return (
                    <>
                        <GivingBackInKindListComponent />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Past Reunions':
                return (
                    <>
                        <PastReunionsList />
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>
                    </>
                );
            case 'Planned Reunions':
                return (
                    <>
                        <PlannedReunionsList />
                        {/* <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button> */}
                    </>
                );
            case 'Admin':
                return (
                    <>
                        <AdminList/>
                        <button style={buttonStyle} onClick={handleDownloadClick}>
                            Download Excel
                        </button>

                    </>
                )
            default:
                return null;
        }
    };

    return (
        <div className='flex flex-row'>
            {/* <SidebarProfile setSelectedOption={setSelectedOption} /> */}
            <div className="ml-4 w-full">
                {selectedOption && (
                    <div className='w-full'>
                        {renderForm()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataList;
