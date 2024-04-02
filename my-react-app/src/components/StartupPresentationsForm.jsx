// StartupPresentationsForm.js
import React, { useState } from 'react';
import { BsChatDots, BsBriefcase, BsLightbulb } from "react-icons/bs";

const StartupPresentationsForm = () => {
    const [content, setContent] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [date, setDate] = useState('');
    const [startup, setStartup] = useState('');
    const [idea, setIdea] = useState('');
    const [problem, setProblem] = useState('');
    const [presenter, setPresenter] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', { startup, idea, problem, content, presenter, date, additionalInfo });
    };

    return (
        <div className='flex flex-row gap-6 w-'>
            <div className='w-1/2 p-4'>
                {/* <h2>Talks Form</h2> */}
                <h1 className="text-4xl font-bold mb-4 transition-opacity duration-300 opacity-100 mt-4">
                    <span className="text-blue-500 text-center mr-4">StartUp Presentations</span><BsLightbulb className="inline-block mr-2" size={24} />
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label htmlFor="startup" className="block text-left">StartUp Name</label>
                        <input
                            id="startup"
                            value={startup}
                            onChange={(e) => setStartup(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></input>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="idea" className="block text-left">Idea behind the startup:</label>
                        <textarea
                            id="idea"
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="problem" className="block text-left">What problem is it solving?</label>
                        <textarea
                            id="problem"
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            rows="4"
                            required
                        ></textarea>
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
                        <label htmlFor="presenter" className="block text-left">Presenter:</label>
                        <input
                            type="text"
                            id="presenter"
                            value={presenter}
                            onChange={(e) => setPresenter(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="date" className="block text-left">Date of Presentation:</label>
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
                <img src='/images/talk1.webp' alt="Talk" className="w-full h-full object-cover"/>
            </div>
        </div>
    );
};

export default StartupPresentationsForm;
