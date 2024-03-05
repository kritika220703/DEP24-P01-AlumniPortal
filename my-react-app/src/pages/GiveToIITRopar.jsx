import React from 'react';
import { motion } from "framer-motion";
import {useState , useEffect} from 'react';
import { BiChevronDown } from "react-icons/bi";

import list from "./list.json";

import Accordion from "./Accordion.json";
import AccordionItem from "./AccordionItem.jsx";
import AccordionReccuring from './AccordionReccuring.jsx';
const GiveToIITRopar = () => {
    const[toggle,setToggle] = React.useState(false);
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const handleClick = () => {
        setSelected("Select a fund");
        setOpen(!open);
      };
    
  const [openaccordion, setOpenaccordion] = useState(false);
  const Toggle =(index) => {
    if(openaccordion === index){
      return setOpenaccordion(null);
    }
    setOpenaccordion(index);
  }


  return (
    <div>
        <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-gray-100 flex flex-col justify-center items-center h-[250px] w-full '
    >
      <motion.p
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 50 }}
        className='text-black text-[70px] font-semibold font-sans mb-4 text-center'
      >
        Donate Online
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 1, type: "spring", stiffness: 50 }}
        className='text-gray-600 text-[30px] font-medium font-sans mb-4 text-center'
      >
        Your generous contributions propel our success and amplify our influence.
      </motion.p>
    </motion.div>

    <div className='bg-blue-200 w-full h-[130px] flex flex-row items-center justify-center'>
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
          One-time
        </motion.div>
        <motion.div
          className={`w-[400px] h-[70px] flex items-center justify-center cursor-pointer ${!toggle ? 'bg-indigo-800 text-white' : 'bg-blue-200 text-gray-600 border border-indigo-800'} text-[20px]`}
          onClick={() => setToggle(!toggle)}
          initial={{ borderLeft: '2px solid transparent' }}
          animate={{ borderLeft: toggle ? '2px solid transparent' : '2px solid #5a67d8' }}
          transition={{ duration: 0.5 }}
        >
          Recurring
        </motion.div>
      </motion.div>
    </div>
    
    { toggle ? 
    <div className='mt-8 flex flex-row gap-[100px]'>
        <div className='ml-[100px] flex flex-col gap-8 '>
            <div >
                <p className='text-gray-800 text-[30px] font-bold '> Donation Details </p>
                {/* <div className="w-72  font-medium h-80 mt-5"> */}
                <div className='flex flex-row gap-[70px] mt-4'>
                <div className='flex flex-col gap-2 '>
                  <p className='text-semibold text-lg text-gray-700'>Select a fund</p>
                    <div
                      onClick={() => setOpen(!open)}
                      className={`bg-white border border-gray-500  flex items-center justify-between w-[300px] h-[50px] rounded ${
                        !selected && "text-gray-700"
                      } 
                      `}
                    >
                      {selected
                        ? selected?.length > 25
                          ? selected?.substring(0, 25) + "..."
                          : selected
                        : " "}
                      <BiChevronDown size={20} className={`${open && "rotate-180"}  `} />
                    </div>
                </div>

                <div>
                  <p className='text-semibold text-lg text-gray-700'>Donation Amount in INR</p>
                  <input
                    type="text"
                    className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                    placeholder=''/>
                </div>
               

                </div>
      




{/* <div class="relative z-0 w-full mb-5 flex items-center border border-gray-300">
  <input
    type="text"
    name="name"
    placeholder=" "
    required
    className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
  />
  <label
    for="name"
    onClick={() => setOpen(!open)}
    className={`absolute duration-300 top-3 -z-1 origin-0 text-gray-500  ${
      !selected && "text-gray-700"
    }`}
  >
    Select a fund
  </label>
  <BiChevronDown size={20} className={`${open ? "ml-2 rotate-180" : "ml-2"}`} />
</div> */}


     

      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60  border border-gray-300 w-72 absolute z-10" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          {/* <AiOutlineSearch size={18} className="text-gray-700" /> */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="search here..."
            className="placeholder:italic placeholder:text-slate-400 p-2 outline-none"
          />
        </div>
        {list?.map((country) => (
          <li
            key={country?.name}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {country?.name}
          </li>
        ))}
      </ul>
    {/* </div> */}
            </div>

        <div>
          <p className='text-gray-800 text-[30px] font-bold'>Contact Details</p>
          <div className='flex flex-row gap-[50px] mt-4'>
          <div>
              <p className='text-semibold text-lg text-gray-700'>First Name</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          <div>
              <p className='text-semibold text-lg text-gray-700'>Last Name</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          </div>
          <div className='flex flex-row gap-[50px] mt-6'>
          <div>
              <p className='text-semibold text-lg text-gray-700'>Email ID</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          <div>
              <p className='text-semibold text-lg text-gray-700'>PAN Number</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          </div>
          <div className='mt-6'>
              <p className='text-semibold text-lg text-gray-700'>Contact Number</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
        </div>

        <div>
          <p className='text-gray-800 text-[30px] font-bold'>Address Details</p>
          <div className='flex flex-row gap-[50px] mt-4'>
          <div>
              <p className='text-semibold text-lg text-gray-700'>Address Line1</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          <div>
              <p className='text-semibold text-lg text-gray-700'>Address Line2</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          </div>
          <div className='flex flex-row gap-[50px] mt-6'>
          <div>
              <p className='text-semibold text-lg text-gray-700'>Country</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          <div>
              <p className='text-semibold text-lg text-gray-700'>State</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          </div>
          <div className=' flex flex-row gap-[50px] mt-6'>
            <div>
              <p className='text-semibold text-lg text-gray-700'>City</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
            <div>
              <p className='text-semibold text-lg text-gray-700'>Pincode</p>
              <input
                type="text"
                className="w-[300px] h-10 p-2 border border-gray-500 rounded "
                placeholder=''/>
          </div>
          </div>
        </div>

        <div className=' ml-[25px] w-[600px] h-[50px] bg-indigo-800 text-white text-[27px] flex items-center justify-center font-bold font-serif cursor-pointer'>
          <p>Continue to Payment Conformation</p>
        </div>
      
        </div>

        <div className='w-[600px] h-[180px] border text-[23px] text-gray-700 text-normal border-gray-400 flex items-center justify-center font-sans sticky top-[30px]'>
          <p className='ml-5'>Forge a commitment to 'Pay Your Fees at Today's Rate' and sustain the legacy of excellence at IIT Ropar! <span
    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Click here </span>to make your pledge now</p>
        </div>
    </div> 
     : 
    <AccordionReccuring/>
   
    }
  

<div className='w-[1400px] h-0.5 bg-gray-400 rounded mt-10 ml-11'></div>
<div>
  <div className='flex items-center justify-center text-bold text-[40px] mt-[30px] mb-10 font-bold'>Other Ways To Give</div>
    <div className=' w-full flex items-start'> 
  <div className='flex flex-wrap items-center justify-center '>
    {Accordion.map((data, index) => (
      <div key={index} className='w-1/2 px-[10px]'>
        <AccordionItem
          open={index === openaccordion}
          title={data.title}
          desc={data.content}
          toggle={() => Toggle(index)}
        />
      </div>
    ))}
  </div>
</div>
</div>
    </div>
  )
}
export default GiveToIITRopar;