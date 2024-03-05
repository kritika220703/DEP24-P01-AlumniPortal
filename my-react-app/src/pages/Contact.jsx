import React from 'react'
import admin from '.././assets/admin.png'
import image from '.././assets/img4.jpg'
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Captcha from 'react-captcha-code';
import Captcha from '../components/captcha';

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Contact = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false); // State to track captcha verification

  let errorMessage = "";
  const notifySuccess = (message) => {
      toast.success(message, toastOptions);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Check if captcha is verified
    if (!verified) {
      errorMessage = "Please verify the captcha.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    //check if all fields are filled
    if(email === ""){
      errorMessage = "Email is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    
    if(fullName === ""){
        errorMessage = "Name is required.";
        toast.error(errorMessage, toastOptions);
        return;
    }

    if(phone === ""){
      errorMessage  = "Please provide your phone number.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(message === ""){
      errorMessage = "Your message is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    setIsLoading(true);
    try {
      const data = {
        email: email,
        name : fullName,
        phone : phone,
        message : message
      };

      console.log("calling api")
      const response = await fetch(`http://localhost:3000/email/contactUs`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      // setUserRes(response.data);

      if(response.status !== 200) {
        errorMessage = "Failed to send Contact Us mail.";
        toast.error(errorMessage, toastOptions);
        return;
      } else {
        notifySuccess("Contact Us message sent to your email id");
      }

      setEmail("");
      setFullName("");
      setMessage("");
      setPhone("");
      setVerified(false);

  } catch(error) {
    // errorMessage = "Failed to create an account.";
    toast.error(error, toastOptions);
    }
    setIsLoading(false);

    // Reload the page
    setTimeout(() => {
      window.location.reload();
    }, 5000); // Reload after 3 seconds

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
      <div className='bg-gray-300 text-black mt-0 py-2 text-[30px] font-bold flex items-center justify-center'>
        Contact Us
      </div>

      <div className='flex flex-row '>
        <div className='w-[750px] h-[500px] ml-6 rounded-xl'>
          <img src={admin} className='object-cover w-full h-full rounded-xl' />
        </div>

        <div className='flex flex-col gap-5'>
          <div className=' mt-5 w-[750px] flex flex-col gap-6 ml-[50px]'>
            <div className='flex flex-row justify-center'>
              <h1 className='text-[30px] font-extrabold font-serif text-gray-900 '>
                Alumni Engagement Hub
              </h1>
            </div>
            <p className='font-normal font-serif text-[25px] text-wrap mr-[20px]'>
              Energizing the alumni community at IIT Ropar is our mission. Supported by enthusiastic student volunteers, 
              we orchestrate a diverse array of events and initiatives. We invite you to reach out and join us 
              in building a vibrant alumni community.
            </p>            
          </div>

          <div className='flex flex-col p-2'>
            <div class="bg-gray-300 h-px w-[600px] my-6 ml-[100px]"></div>
            <div className='flex flex-row items-center gap-[55px] text-gray-700 ml-[162px] text-[25px] w-[600px] h-1 p-2'>
              <p >Email</p>
              <p >-</p>
              <p>alumniaffairs@iitrpr.ac.in</p>
            </div>
            <div class="bg-gray-300 h-px w-[600px] my-6 ml-[100px] "></div>
            <div className='flex flex-row items-center gap-[55px] text-gray-700 text-[25px] ml-[150px] w-[600px] h-1 p-2'>
              <p>IIT Ropar Website</p>
              <p>-</p>
              <p>www.iitrpr.ac.in</p>
            </div>
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
                className="w-full h-[50px] bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
              ></textarea>
            </div>
            <div className="mb-4">
              <Captcha setVerified={setVerified} /> {/* Pass setVerified as prop */}
            </div>
            <div className='flex flex-row justify-center'>
              <button
                type="submit"
                disabled={!verified} // Disable button if captcha is not verified
                className="bg-indigo-800 text-white py-2 px-8 rounded-lg hover:bg-white 
                hover:text-indigo-800 border border-gray-300 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
            
          </form>
        </div>

        <div className=' flex flex-col  mt-[50px] ml-auto mr-[50px] mb-[50px] w-[700px] h-[700px] rounded-xl overflow-hidden' 
          style={{ backgroundImage: `url(${image})`, opacity: '0.7', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className='text-white text-[50px] font-bold ml-[130px] mt-[50px]'>
            Give Back To IIT Ropar
          </div>
          <p className='mt-[120px] text-white font-medium text-[30px] ml-[50px] mr-[50px]'>
            Join us in building a stronger IIT Ropar community. Your support is not just an investment in our institution; 
            it's an investment in the leaders, thinkers, and innovators of tomorrow. Together, we can make a difference. 
            Donate today.
          </p>
          <button className='bg-indigo-800 w-[80px] mt-10 h-[50px] rounded-xl cursor-pointer text-white ml-[300px] '>
            <a href='./Donate' >Donate</a>
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Contact