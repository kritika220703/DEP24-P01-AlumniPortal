import React from 'react';
import { motion } from "framer-motion";
import {useState , useEffect} from 'react';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import list from "./list.json";
const GiveToIITRopar = () => {
    const[toggle,setToggle] = React.useState(false);
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      fetch("https://restcountries.com/v2/all?fields=name")
        .then((res) => res.json())
        .then((data) => {
          setCountries(data);
        });
    }, []);

    const handleClick = () => {
        setSelected("Select a fund");
        setOpen(!open);
      };
    
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

    <div className='mt-8'>
        <div className='ml-[100px]'>
            <div>
                <p className='text-gray-800 text-[30px] font-bold '> Donation Details </p>
                <div className="w-72  font-medium h-80">
      {/* <div
        onClick={() => setOpen(!open)}
        className={`bg-white border border-gray-500 w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select a fund"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div> */}
      <div
      onClick={handleClick}
      className={`bg-white border border-gray-500 w-full p-2 flex items-center justify-between rounded ${
        !selected && "text-gray-700"
      }`}
      style={{ borderColor: selected === "Select a fund" ? "blue" : "inherit" }}
    >
      {selected
        ? selected?.length > 25
          ? selected?.substring(0, 25) + "..."
          : selected
        : "Select a fund"}
        
      <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
    </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
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
    </div>
            </div>
        </div>
    </div>
    </div>
  )
}
export default GiveToIITRopar;