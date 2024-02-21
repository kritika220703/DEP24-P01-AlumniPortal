import React from 'react'
import admin from '.././assets/admin.png'
import image from '.././assets/img4.jpg'
import { useState } from 'react';
// import Captcha from 'react-captcha-code';

const Contact = () => {
    const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
//   const [captcha, setCaptcha] = useState('');
//   const [generatedCaptcha, setGeneratedCaptcha] = useState('');

  const EmailLink = ({ email, subject, body }) => {
    const handleClick = () => {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    };
}

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted!');
  };
//   const handleCaptchaChange = (value) => {
//     setCaptcha(value);
//   };

//   const handleGenerateCaptcha = () => {
//     const newCaptcha = Math.random().toString(36).slice(2, 8).toUpperCase();
//     setGeneratedCaptcha(newCaptcha);
//   };

  return (
    <div>
        <div className='bg-gray-300 text-black mt-0 py-2 text-[25px] font-bold flex items-center justify-center'>Contact Us</div>
        <div className='flex flex-row '>
        <div className='w-[750px] h-[500px]'>
        <img src={admin} className='object-cover w-full h-full' />
        </div>
        <div className='flex flex-col gap-5'>
        <div className=' mt-5 w-[750px] flex flex-col gap-6 ml-[50px]'>
            <h1 className='text-[30px] font-extrabold font-serif text-gray-900 '>Alumni Engagement Hub</h1>
            <p className='font-normal font-serif text-[25px] text-wrap mr-[20px]'>Energizing the alumni community at IIT Ropar is our mission. Supported by enthusiastic student volunteers, we orchestrate a diverse array of events and initiatives. We invite you to reach out and join us in building a vibrant alumni community.</p>            
        </div>
        <div class="bg-gray-300 h-px w-[600px] my-4 ml-[100px]"></div>
        <div className='flex flex-row items-center justify-center gap-[55px] text-gray-700 ml-[162px] text-[25px] w-[600px] h-1'>
            <p >Email</p>
            <p >-</p>
            <p>alumniaffairs@iitrpr.ac.in</p>
        </div>
        <div class="bg-gray-300 h-px w-[600px] my-4 ml-[100px] "></div>
        <div className='flex flex-row items-center justify-center gap-[55px] text-gray-700 text-[25px] ml-[50px] w-[600px] h-1'>
            <p>IIT Ropar Website</p>
            <p>-</p>
            <p>www.iitrpr.ac.in</p>
        </div>
        
        </div>
        </div>
<div className='flex flex-row'>
    <div className="w-[700px] h-[700px] mt-[50px] mx-auto bg-white p-8 border border-gray-300 rounded-lg">
      <h1 className="text-xl font-bold mb-4 ml-[150px]">Call Back or mail to <br/>office.alumni@iitrpr.ac.in</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Captcha</label>
          {/* <Captcha charNum={6} onChange={handleCaptchaChange} /> */}
          <button
            type="button"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mt-2 hover:bg-white hover:text-gray-900 transition-colors duration-300"
            // onClick={handleGenerateCaptcha}
          >
            Generate New Captcha
          </button>
        </div>
        <button
          type="submit"
          className="bg-indigo-800 text-white py-2 px-4 rounded-lg hover:bg-white hover:text-indigo-800 border border-gray-300 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
        <div className=' flex flex-col  mt-[50px] ml-auto mr-[50px] mb-[50px] w-[700px] h-[700px] rounded-xl overflow-hidden' style={{ backgroundImage: `url(${image})`, opacity: '0.7', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='text-white text-[50px] font-bold ml-[130px] mt-[50px]'>Give Back To IIT Ropar</div>
        <p className='mt-[120px] text-white font-medium text-[30px] ml-[50px] mr-[50px]'>Join us in building a stronger IIT Ropar community. Your support is not just an investment in our institution; it's an investment in the leaders, thinkers, and innovators of tomorrow. Together, we can make a difference. Donate today.</p>
        <button className='bg-indigo-800 w-[80px] mt-10 h-[50px] rounded-xl cursor-pointer text-white ml-[300px] '><a href='./Donate' >Donate</a></button>

        </div>
</div>

    </div>
  )
}

export default Contact