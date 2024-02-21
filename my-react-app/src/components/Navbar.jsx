import React from 'react'
import logo from "./../assets/logo.png"
import {Link} from "react-router-dom"
import NavLinks from "./NavLinks"
const Navbar = () => {
  const[open , setOpen] = React.useState(false)
  return (
   <nav className='bg-customBlue text-white font-normal'>
     <div className='flex items-center font-medium justify-around'>
        <div className='flex flex-row items-center z-50 p-5 md:w-auto w-full '>
          <div className='flex  items-center'>
            <img src={logo}alt="" className='md:cursor-pointer bg-white h-12 w-13 mr-3 p-1 rounded-full'/>
            <div className='flex flex-col '>
              <span className="font-bold text-2xl">Alumni Relations</span> <span className='hover:text-blue-500'>Indian Institute of Technology Ropar</span>
            </div>
          </div>
        </div>
        <div className='text-3xl md:hidden cursor-pointer' onClick={()=> setOpen(!open)}>
          <ion-icon name={`${open ?'close' : 'menu'}`}></ion-icon>
        </div>
        
        {/* Desktop View */}

       <ul className=' md:flex hidden  items-center gap-8 text-black-300 '>
        {/* <li>
          <Link to="/pages/Home" className="py-7 px-3 inline-block">Home
          </Link>
        </li> */}
        <NavLinks/>
       </ul>

       {/* Mobile View */}
       <ul className = {`md:hidden bg-white absolute w-full h-full bottom-0 py-24  pl-4 duration-500 ${open ? "left-0" : "left-[-100%]"}`}>
       
        <NavLinks/>
       </ul>

     </div>
     <hr className="border-t border-blue-700 my-0.5" />
   </nav>
  )
}

export default Navbar
