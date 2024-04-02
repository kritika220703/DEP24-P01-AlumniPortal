import React, { useState } from 'react';
import EventsSidebar from '../components/EventsSidebar';
import { BsChatDots, BsBriefcase, BsLightbulb } from "react-icons/bs";
import TalksForm from '../components/TalksForm';
import WorkshopsForm from '../components/WorkshopsForm';
import StartupPresentationsForm from '../components/StartupPresentationsForm';

const Events = () => {
    const [selectedOption, setSelectedOption] = useState('Talks');

    // Function to render icon based on selected option
    const renderIcon = () => {
        switch (selectedOption) {
            case 'Talks':
                return <BsChatDots className="inline-block mr-2" size={24} />;
            case 'Workshops':
                return <BsBriefcase className="inline-block mr-2" size={24} />;
            case 'Startup Presentations':
                return <BsLightbulb className="inline-block mr-2" size={24} />;
            default:
                return null;
        }
    };

    const renderForm = () => {
        switch (selectedOption) {
            case 'Talks':
                return <TalksForm />;
            case 'Workshops':
                return <WorkshopsForm />;
            case 'Startup Presentations':
                return <StartupPresentationsForm />;
            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <EventsSidebar setSelectedOption={setSelectedOption} />
            <div className="ml-4 w-full">
                {selectedOption && (
                    <div className='w-full'>
                        {/* <h1 className="text-4xl font-bold mb-4 transition-opacity duration-300 opacity-100 mr-4 mt-4 pl-4">
                            <span className="text-blue-500 text-center mr-4">{selectedOption}</span>{renderIcon()}
                        </h1> */}
                        {renderForm()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
