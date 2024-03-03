import React from 'react';
import image from '.././assets/img5.jpg'
import image1 from '.././assets/img4.jpg'
import image2 from '.././assets/img6.jpg'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Donate = () => {
  const Navigate = useNavigate();
  return (
   <div>
     <div
  className='flex flex-col w-full h-[700px] rounded-xl overflow-hidden'
  style={{
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    opacity: '0.7'
  }}
>

<div className="text-center mt-[200px]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        // transition={{ delay: 0.5, duration: 1.5 }}
        className="text-extrabold text-5xl text-white font-serif leading-tight"
      >
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{delay:0.5 , duration: 1 }}
        >
          Help IIT Ropar deliver greater value and
        </motion.span>
        <br />
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{delay:0.7, duration: 1 }}
        >
          attain higher levels of quality in its teaching and research.
        </motion.span>
      </motion.h1>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="font-serif mt-8 text-[20px] w-[200px] h-[50px] bg-indigo-950 text-white hover:bg-white hover:text-black"
        whileHover={{ scale: 1.1 }}
        onClick={()=>{Navigate('/givetoiitropar')}}
      >
        Give to IIT Ropar
      </motion.button>
    </div>
</div>
 
<div className='bg-indigo-950 flex flex-row items-center justify-between  text-white text-[30px] font-extrabold w-full h-[230px]'>
  <p className='ml-[150px]'>5000 CR <br/> 10 year goal</p>
  <p>500 CR <br/> Pledged Donations</p>
  <p className='mr-[150px]'>100+ <br/> Donors</p>
</div>

<div className='bg-gray-200 w-full h-[660px] flex flex-row  gap-6 '>
  <div className='mt-[70px] ml-[200px]'>
    <p className='text-bold text-[30px] font-serif'>Giving Back</p>
    <p className='text-bold text-[20px] mt-[20px] font-serif'>“... And miles to go before I sleep.” - Robert Frost</p>
    <p className='w-[600px] h-[30px] text-bold text-[20px] mt-[20px] font-serif'>IIT Ropar has come a long way since its inception but has miles to go, as Robert Frost mentions. Together, we can support IIT Ropar in its vision.</p>
    <p className='w-[600px] h-[30px] text-bold text-[19px] mt-[90px] font-serif'>IIT Ropar Endowment Fund is helping IIT Ropar in its journey. Endowments are structured to exist in perpetuity, meaning that the institution can rely on the endowment’s earnings forever.</p>
    <p className='w-[600px] h-[30px] text-bold text-[20px] mt-[90px] font-serif'>Your generous contributions will help not only today’s generation but also generations to follow and ensure a smooth glide path for IIT Ropar to reach for the skies.</p>
  </div>

  <div className='h-[600px] mt-8 bg-white w-[500px]  rounded-3xl shadow-lg ml-auto mr-[150px] border border-gray-300'>
    <img src={image1} className='w-[430px] h-[300px] mt-8 ml-8 rounded-xl'/>
    <div className='text-extrabold text-[30px] font-serif ml-8 mt-3'>General Funds</div>
    <div className='text-normal text-[18px] font-serif ml-8 mt-3'>Contributions made to the General Fund help IIT Ropar the freedom to undertake innovative projects, support pathbreaking research initiatives, and promote student well being.</div>
    <button className='text-bold text-white text-sans w-[170px] h-[45px] bg-blue-900 rounded-3xl mt-3 ml-8'>Modes of Donation</button>
  </div>
 
</div>

<div className='flex flex-row w-full h-[600px]'>
  <div className='mt-[70px] ml-[200px]'>
  <p className='text-bold text-[30px] font-serif'>Impact of Giving</p>
  <p className='text-normal w-[600px] h-[30px] text-[20px] mt-10 font-serif'>The Endowment and other gifts to the University support IIT Delhi’s mission. These financial resources provide critical support to the University by advancing pioneering research, building infrastructure for growth, and supporting student welfare.</p>
  <button className='mt-[100px] w-[100px] h-[45px] rounded-lg bg-blue-900 text-white text-normal '>View More </button>
  </div>
  <img src={image2} className='w-[600px] mt-10 object-cover h-[400px]'/>
</div>
   </div>
  );
}

export default Donate;