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


  return (
    <div>
        <div className='bg-none w-full h-[130px] flex flex-row items-center justify-center'>
        <motion.div
            className='w-[1200px] h-[70px] flex flex-row items-center justify-between text-[26px] font-bold'
            initial={{ borderRadius: 35 }}
            animate={{ borderRadius: toggle ? 0 : 35 }}
            transition={{ duration: 0.5 }}
            onClick={handleChangeClick}
        >

             {['Alumni', 'Give Back In Kind', 'Past Reunions', 'Planned Reunions'].map((option) => (
                    <motion.p
                        key={option}
                        className={`w-[250px] h-[50px] hover:bg-blue-400 flex items-center justify-center hover:rounded-3xl hover:text-white cursor-pointer ${toggle === option ? 'bg-blue-400 text-white rounded-3xl' : ''} `}
                        onClick={() => handleToggleClick(option)}
                        initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                
                    >
                        {option}
                    </motion.p>
                ))}
            
           
        </motion.div>
        </div>

        <div className='flex flex-col'>
            {toggle === 'Alumni' && (
                <React.Fragment>
                     <UserListComponent />
                    <PdfDownloadComponent />
                </React.Fragment>
            )}
            {toggle === 'Give Back In Kind' && (
                <React.Fragment>
                    <GivingBackInKindListComponent />
                    <PdfKindDownloadComponent />
                </React.Fragment>
            )}
            {toggle === 'Past Reunions' && (
                <React.Fragment>
                     <PastReunionsList/>
                    <PastReunionslistDownload />
                </React.Fragment>
            )}
            {toggle === 'Planned Reunions' && (
                <React.Fragment>
                     <PlannedReunionsList/>

                    <PlannedReunionsListDownload />
                </React.Fragment>
            )}
            
        </div>
    </div>
  )
}

export default DataList