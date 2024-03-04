import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './GivingBack.css';
import {db} from "../firebase.js"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const GivingBack = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [entryNo, setEntryNo] = useState("");
  const [yearOfPassing, setYearOfPassing] = useState("");
  const [phone, setphone] = useState("");
  const [department, setDepartment] = useState("");
  const [hostel, setHostel] = useState("");
  const [course, setCourse] = useState("");
  const [country, setCountry] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [donation, setDonation] = useState("");
  const [duration, setDuration] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let errorMessage = "";
  const notifySuccess = (message) => {
      toast.success(message, toastOptions);
  };
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(newEmail);
    // const isValid = validator.isEmail(newEmail);
    setIsValidEmail(isValid);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(email === ""){
      errorMessage = "Email is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    
    if(name === ""){
      errorMessage = "UserName is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(entryNo === ""){
      errorMessage = "Entry Number is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(yearOfPassing === ""){
      errorMessage = "Year of Passing is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(phone === ""){
      errorMessage = "Phone No. is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(donation === ""){
      errorMessage = "Gifts or Grants field is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(duration === ""){
      errorMessage = "Time taken to donate is required.";
      toast.error(errorMessage, toastOptions);
      return;
    }
    
    const colRef = collection(db, 'Giving Back In kind');
    console.log(colRef);
    const q = query(colRef, where('email', '==', email));

    // try {
    //   console.log("in giving back in kind try part")
    //   const snapshot = await getDocs(q);
    
    //   if (snapshot.size > 0) {
    //     // Documents satisfying the query exist
    //       errorMessage = "Entered email is already in use. Please log in or use different email id.";
    //       toast.error(errorMessage, toastOptions);
    //       return;
    //   } 
    // } catch (error) {
    //   console.error('Error getting documents:', error);
    // }

    setIsLoading(true);
    try {
      const data = {
        email: email,
        name: name,
        entryNo: entryNo,
        passingYear: yearOfPassing,
        phone: phone,
        department: department,
        hostel: hostel,
        degree: course,
        country: country,
        linkedIn: linkedin,
        itemName: donation,
        duration: duration
      };

      console.log("calling api")
      const response = await fetch(`http://localhost:3000/email/givingBackInKind`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)

      if(response.status !== 200) {
        errorMessage = "Failed to send giving back in kind mail";
        toast.error(errorMessage, toastOptions);
        return;
      } else {
        notifySuccess("giving back in kind mail sent to alumni cell id");
        const docRef = await addDoc(collection(db, "Giving Back In kind"), {
          email: email,
          name: name,
          entryNo: entryNo,
          passingYear: yearOfPassing,
          phone: phone,
          department: department,
          hostel: hostel,
          degree: course,
          country: country,
          linkedIn: linkedin,
          itemName: donation,
          duration: duration
        });
      }
    } catch {
      errorMessage = "Failed to send mail";
      toast.error(errorMessage, toastOptions);
    }

    setName("");
    setEmail("");
    setEntryNo("");
    setYearOfPassing("");
    setphone("");
    setDepartment("");
    setHostel("");
    setCourse("");
    setCountry("");
    setLinkedin("");
    setDonation("");
    setDuration("");
    setIsLoading(false);
  }

  return (
    <div>
      <div className='Giving-back-heading'>
        <h1> <FontAwesomeIcon icon={faHandHoldingUsd } /> Give Back In Kind</h1>
      </div>
      <div className='main-cont-1'>
        <div className='G_container-1'>
          <img src="/images/giveback.png" alt="Giving Back" />
          <div className='Text_box'>
            <h1>Give Back In Kind - Volunteering Form</h1>
            <p> Dear IIT Ropar Alumnus,
                <br/>Alumni have always been the intrinsic strength at IIT Ropar and a have played an active role in driving a number of high impact initiatives for the Institute. The institute recognizes and immensely values your passion and commitment towards the betterment of the Institute & Students.
                <br/>As a proud alumni, you can also make an immense contribution towards the future & vision of your alma mater by your Volunteering Efforts where you can support by means of your time, expertise, passion, valuable experience & by other means which are non-monetary.
                <br/>This form is designed to collect your interest to Volunteer for Give Back in Kind to IIT Ropar. Our team will share your interest and match it with the right opportunity for you to make an impact through your contributions, as they transpire.
            </p>
          </div>
        </div>
      </div>
      <div className='outer_form' >
        <div className='details_form'>
      <form>
              <label>
                Full Name:
                <br/>
                <input 
                  type="text" 
                  name="name" 
                  value={name}
                  className='text_input'
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br />
              <label>
                Email ID:
                <br/>
                <input 
                  type="email" 
                  name="email" 
                  className='text_input'
                  onChange={handleEmailChange} 
                />
                {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
              </label>
              <br />
              <label>
                Entry Number :
                <br/>
                <input 
                  type="text" 
                  name="entryNo" 
                  value={entryNo}
                  className='text_input'
                  onChange={(e) => setEntryNo(e.target.value)}
                />
              </label>
              <br />
              <label>
                Year of Passing:
                <br/>
                <input 
                  type="text" 
                  name="yearOfPassing" 
                  value={yearOfPassing}
                  className='text_input'
                  onChange={(e) => setYearOfPassing(e.target.value)}
                />
              </label>
              <br />
              <label>
                Your Phone/WhatsApp Numbers:
                <br/>
                <input 
                  type="tel" 
                  name="phone"
                  value={phone} 
                  className='text_input'
                  onChange={(e) => setphone(e.target.value)}
                />
              </label>
              <br />
              <label>
                Your Department at IIT Ropar:
                <br/>
                <select 
                  name="department" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className='text_input'
                >
                  <option value="">Choose</option>
                  <option value="CSE">Computer Science</option>
                  <option value="EE">Electrical</option>
                  <option value="ME">Mechanical</option>
                  <option value="MnC">Mathematics and Computing</option>
                  <option value="CH">Chemical</option>
                  <option value="Civil">Civil</option>
                  <option value="EP">Engineering Physics</option>
                  <option value="Ai">Artifical Intelligence</option>
                  <option value="ME">Metalurgy Engineering</option>
                  <option value="DS">Data Science</option>
                  <option value="bio">Biomedical</option>
                  <option value="Maths">Maths</option>
                  <option value="Phy">Physics</option>
                  <option value="chem">Chemistry</option>
                  <option value="Humanities">Humanities</option>
                </select>
              </label>
              <br />
              <label>
                Your Hostel:
                <br/>
                <select 
                  name="hostel" 
                  value={hostel}
                  onChange={(e) => setHostel(e.target.value)}
                  className='text_input'
                >
                  <option value="">Choose</option>
                  <option value="chenab">Chenab</option>
                  <option value="ravi">Ravi</option>
                  <option value="satluj">Satluj</option>
                  <option value="bhramputra">Bhramputra</option>
                  <option value="beas">Beas</option>
                  {/* Add more options as needed */}
                </select>
              </label>
              <br />
              <label>
                Degree or Type of Program(s) Enrolled in at IIT Ropar:
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="undergraduate"
                  onChange={(e) => setCourse(e.target.value)}
                /> 
                  Undergraduate (B.Tech/ B.E./B.Sc.)
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="masters"
                  onChange={(e) => setCourse(e.target.value)} 
                /> 
                  Masters (M.Tech/M.Sc.)
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="phd"
                  onChange={(e) => setCourse(e.target.value)} 
                /> 
                  Ph.D
                <br />
                <input 
                  type="checkbox" 
                  name="degree" 
                  value="dualDegree"
                  onChange={(e) => setCourse(e.target.value)} 
                /> 
                  Dual Degree (Integrated Program - Undergraduate + Masters)
                <br />
                <input 
                  type="text" 
                  name="others_degree" 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className='text_input' 
                  placeholder='Others' 
                />
              </label>
              <br />
              <label>
                Current Country of Residence:
                <br/>
                <input 
                  type="text" 
                  name="country" 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className='text_input' 
                />
              </label>
              <br />
              <label>
                Your Linkedin Profile URL:
                <br/>
                <input 
                  type="text" 
                  name="linkedin" 
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className='text_input' 
                />
              </label>
              <br />
              <label>
                Giving back to the Institute/ Staff Or Faculty in 'Kind' with Gifts & Grants:
                <br />
                <input 
                  type="text" 
                  name="donation"
                  value={donation}
                  onChange={(e) => setDonation(e.target.value)} 
                  className='text_input' 
                />
              </label>
              <br />
              <label>
                If a suitable 'Giving Back in Kind' opportunity comes up, how much time would you need to donate?
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="30-60 Days" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                  30-60 Days
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="15-30 Days"
                  onChange={(e) => setDuration(e.target.value)} 
                /> 
                  15-30 Days
                <br />
                <input 
                  type="checkbox" 
                  name="time" 
                  value="7-15 Days" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                  7-15 Days
                <br />
                <input 
                  type="checkbox"   
                  name="time" 
                  value="Within a Week" 
                  onChange={(e) => setDuration(e.target.value)}
                /> 
                  Within a Week
              </label>
              <br />
              {/* Add Captcha here */}
              <button 
                type="submit" 
                className='submit'
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GivingBack;
