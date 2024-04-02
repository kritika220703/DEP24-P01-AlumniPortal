import React, { useState } from 'react';
import { BsBriefcase } from "react-icons/bs";

const WorkshopsForm = () => {
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('');
    const [content, setContent] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', { topic, type, content, date, duration });
    };

    return (
        <div className='flex flex-row gap-6 w-'>
            <div className='w-1/2 p-4'>
                <h1 className="text-4xl font-bold mb-4 transition-opacity duration-300 opacity-100 mt-4">
                    <span className="text-blue-500 text-center mr-4">Workshops</span><BsBriefcase className="inline-block mr-2" size={24} />
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="topic" className="block text-left">Topic of Workshop:</label>
                        <input
                            type="text"
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="type" className="block text-left">Type of Workshop:</label>
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="Technical">Technical</option>
                            <option value="Soft Skills">Soft Skills</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="content" className="block text-left">Content Covered:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="date" className="block text-left">Date of Workshop:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="duration" className="block text-left">Duration (days):</label>
                        <input
                            type="number"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="additionalInfo" className="block text-left">Additional Information:</label>
                        <textarea
                            id="additionalInfo"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className='w-1/2 p-4'>
                <img src='/images/talk1.webp' alt="Workshop" className="w-full h-full object-cover"/>
            </div>
        </div>
    );
};

export default WorkshopsForm;
