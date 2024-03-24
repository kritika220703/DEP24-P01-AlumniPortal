import React from 'react'
import { motion } from "framer-motion";
import GivingBackInKindListComponent from './GivingBackInKindList';
import UserListComponent from './UserListComponent';
import ExcelDownloadComponent from './ExcelDownloadComponent';
import PdfDownloadComponent from './PdfDownloadComponent';
import PdfKindDownloadComponent from './PdfKindDownloadComponent';
import PlannedReunionsList from './PlannedReunionsList';
import PlannedReunionsListDownload from './PlannedReunionsListDownload';
import PastReunionsList from './PastReunionsList';
import PastReunionslistDownload from './PastReunionslistDownload';

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

  return (
    <div>
        <div className='bg-none w-full h-[130px] flex flex-row items-center justify-center'>
            <motion.div
                className='w-[800px] h-[70px] flex flex-row items-center justify-center'
                initial={{ borderRadius: 35 }}
                animate={{ borderRadius: toggle ? 0 : 35 }}
                transition={{ duration: 0.5 }}
            >
                {['Alumni', 'Give Back In Kind', 'Past Reunions', 'Planned Reunions'].map((option) => (
                    <motion.div
                        key={option}
                        className={`w-[266px] h-[70px] flex items-center justify-center cursor-pointer ${toggle === option ? 'bg-indigo-800 text-white' : 'bg-blue-200 text-gray-600 border border-indigo-800'} text-[20px]`}
                        onClick={() => handleToggleClick(option)}
                        initial={{ borderRight: '2px solid transparent' }}
                        animate={{ borderRight: toggle === option ? '2px solid transparent' : '2px solid #5a67d8' }}
                        transition={{ duration: 0.5 }}
                    >
                        {option}
                    </motion.div>
                ))}
            </motion.div>
        </div>

        <div className='flex flex-col'>
            {toggle === 'Alumni' && (
                <React.Fragment>
                    {showData['Alumni'] && <UserListComponent />}
                    <PdfDownloadComponent />
                </React.Fragment>
            )}
            {toggle === 'Give Back In Kind' && (
                <React.Fragment>
                    {showData['Give Back In Kind'] && <GivingBackInKindListComponent />}
                    <PdfKindDownloadComponent />
                </React.Fragment>
            )}
            {toggle === 'Past Reunions' && (
                <React.Fragment>
                    {showData['Past Reunions'] && <PastReunionsList/>}
                    <PastReunionslistDownload />
                </React.Fragment>
            )}
            {toggle === 'Planned Reunions' && (
                <React.Fragment>
                    {showData['Planned Reunions'] && <PlannedReunionsList/>}

                    <PlannedReunionsListDownload />
                </React.Fragment>
            )}
            {/* Add more conditions for additional options */}
            {/* Button to show data */}
            {!showData[toggle] && (
                <div className='flex flex-row justify-center'>
                    <button 
                        className='bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold w-[200px] mt-4 mb-2'
                        onClick={() => handleShowData(toggle)}
                    >
                        Show Data
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}

export default DataList