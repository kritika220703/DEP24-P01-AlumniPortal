import React, { useState } from 'react';
import image from '.././assets/job.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase'; // Import Firestore database instance
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions

const toastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: 'dark',
};

const Internship = () => {
  const [formData, setFormData] = useState({
    type: '',
    companyName: '',
    contactPerson: '',
    contactNumber: '',
    description: '',
    email: '',
    jobDomain: '',
    duration: '',
  });

  const [showDuration, setShowDuration] = useState(false); // State to control the visibility of the duration field

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Check if the selected type is 'Internship' or 'Both' to determine whether to show the duration field
    if (name === 'type' && (value === 'Internship' || value === 'Both')) {
      setShowDuration(true);
    }
    if (name === 'type' && (value === 'Full Time' )) {
      setShowDuration(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation checks
    if (!formData.type || !formData.companyName || !formData.contactPerson || !formData.contactNumber || !formData.email || !formData.jobDomain || (showDuration && !formData.duration) || !formData.description) {
      toast.error('Please fill in all fields', toastOptions);
      return;
    }

    // Store form data in Firestore
    try {
      await addDoc(collection(db, 'job'), formData);
      toast.success('Information stored successfully', toastOptions);
      
      // Send form data to backend to send email
      const response = await fetch('http://localhost:3000/email/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully', toastOptions);
      } else {
        toast.error('Failed to send message. Please try again later.', toastOptions);
      }

      // Reset form fields
      setFormData({
        type: '',
        companyName: '',
        contactPerson: '',
        contactNumber: '',
        description: '',
        email: '',
        jobDomain: '',
        duration: '',
      });
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save information or send message. Please try again later.', toastOptions);
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-gray-200 w-full h-[120px] gap-2'>
        <p className='text-black font-bold font-serif text-[28px]'>Internship/Full Time Opportunities</p>
      </div>  

      <div className="container mx-auto px-4">
        <div className='flex flex-row justify-center ml-8'>
          <div className='w-[700px] h-[600px] bg-white p-8 '>
            <img src={image} alt='job' className='w-full h-full object-cover' />
          </div>
        <div className="w-[700px] h-[600px] mt-[50px] mx-auto bg-white p-8 border border-gray-300 rounded-lg mb-px">
          <h1 className="text-xl font-bold mb-4 text-center">Fill the Form Here</h1>
          <form onSubmit={handleSubmit}>
            <select name='type' value={formData.type} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md'>
              <option value=''>Select Opportunity Type</option>
              <option value='Internship'>Internship</option>
              <option value='Full Time'>Full Time</option>
              <option value='Both'>Both</option>
            </select>
            <input type='text' name='companyName' placeholder='Company Name' value={formData.companyName} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md w-full' />
            <input type='text' name='contactPerson' placeholder='Contact Person' value={formData.contactPerson} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md w-full' />
            <input type='text' name='contactNumber' placeholder='Contact Number' value={formData.contactNumber} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md w-full' />
            <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md w-full' />
            <input type='text' name='jobDomain' placeholder='Job Domain' value={formData.jobDomain} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md w-full' />
            <textarea name='description' placeholder='Description' value={formData.description} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md w-full'></textarea>
            {showDuration && (
              <select name='duration' value={formData.duration} onChange={handleChange} className='mb-2 p-2 border border-gray-400 rounded-md'>
                <option value=''>Select Internship Duration</option>
                <option value='2 months'>2 months</option>
                <option value='6 months'>6 months</option>
                <option value='Both'>Both</option>
              </select>
            )}
            <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>Submit</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
    </div>
    
  );
};

export default Internship;
