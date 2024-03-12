import React from 'react'
import { motion } from "framer-motion";
import GivingBackInKindListComponent from './GivingBackInKindList';
import UserListComponent from './UserListComponent';
import ExcelDownloadComponent from './ExcelDownloadComponent';
import PdfDownloadComponent from './PdfDownloadComponent';
import PdfKindDownloadComponent from './PdfKindDownloadComponent';

const DataList = () => {
    const[toggle,setToggle] = React.useState(true);
  return (
    <div>
        <div className='bg-none w-full h-[130px] flex flex-row items-center justify-center'>
            <motion.div
                className='w-[800px] h-[70px] flex flex-row items-center justify-center'
                initial={{ borderRadius: 35 }}
                animate={{ borderRadius: toggle ? 0 : 35 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className={`w-[400px] h-[70px] flex items-center justify-center cursor-pointer ${toggle ? 'bg-indigo-800 text-white ' : 'bg-blue-200 text-gray-600 border border-indigo-800'} text-[20px]`}
                    onClick={() => setToggle(!toggle)}
                    initial={{ borderRight: '2px solid transparent' }}
                    animate={{ borderRight: toggle ? '2px solid transparent' : '2px solid #5a67d8' }}
                    transition={{ duration: 0.5 }}
                >
                    Alumni
                </motion.div>
                
                <motion.div
                    className={`w-[400px] h-[70px] flex items-center justify-center cursor-pointer ${!toggle ? 'bg-indigo-800 text-white' : 'bg-blue-200 text-gray-600 border border-indigo-800'} text-[20px]`}
                    onClick={() => setToggle(!toggle)}
                    initial={{ borderLeft: '2px solid transparent' }}
                    animate={{ borderLeft: toggle ? '2px solid transparent' : '2px solid #5a67d8' }}
                    transition={{ duration: 0.5 }}
                >
                    Donation In kind
                </motion.div>
            </motion.div>
        </div>

        {toggle ? (
            <div className='flex flex-col'>
                <UserListComponent/>
                <PdfDownloadComponent/>
            </div>
        ) : (
            <div className='flex flex-col'>
                <GivingBackInKindListComponent/>
                <PdfKindDownloadComponent/>
            </div>
        )}
    </div>
  )
}

export default DataList