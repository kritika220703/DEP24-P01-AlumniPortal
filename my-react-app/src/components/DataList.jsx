import React from 'react'
import { motion,AnimatePresence } from "framer-motion";
import GivingBackInKindListComponent from './GivingBackInKindList';
import UserListComponent from './UserListComponent';
import ExcelDownloadComponent from './ExcelDownloadComponent';
import PdfDownloadComponent from './PdfDownloadComponent';
import PdfKindDownloadComponent from './PdfKindDownloadComponent';
import PlannedReunionsList from './PlannedReunionsList';
import PlannedReunionsListDownload from './PlannedReunionsListDownload';
import PastReunionsList from './PastReunionsList';
import PastReunionslistDownload from './PastReunionslistDownload';
import SidebarProfile from "./SidebarProfile"
import {useState } from "react";
const DataList = () => {
    const[toggle,setToggle] = React.useState('Alumni');

    const [showData, setShowData] = React.useState({
        'Alumni': false,
        'Give Back In Kind': false,
        'Past Reunions': false,
        'Planned Reunions': false
    });

    const handleShowData = (toggleKey) => {
        setShowData({ ...showData, [toggleKey]: true });
    };

    const handleToggleClick = (option) => {
        setToggle(option);
        setShowData(prevState => {
            const updatedState = { ...prevState };
            Object.keys(updatedState).forEach(key => {
                if (key !== option) {
                    updatedState[key] = false;
                }
            });
            return updatedState;
        });
    };
    const [change, setChange] = useState(false);

    const handleChangeClick = () => {
        setChange(!change);
    };

    const [selectedOption, setSelectedOption] = useState('Alumni');
    const renderForm = () => {
        console.log(selectedOption);
        switch (selectedOption) {
            case 'Alumni':
                return <UserListComponent />;
            case 'Give Back in Kind':
                return <GivingBackInKindListComponent />;
            case 'Past Reunions':
                return <PastReunionsList />;
            case 'Planned Reunions':
                return <PlannedReunionsList/>;
            default:
                return null;
        }
    };

  return (
    <div className='flex flex-row '>
        <SidebarProfile setSelectedOption={setSelectedOption}/>
        <div className="ml-4 w-full">
                {selectedOption && (
                    <div className='w-full'>
                        {renderForm()}
                    </div>
                )}
            </div>
       
    </div>
  )
}

export default DataList