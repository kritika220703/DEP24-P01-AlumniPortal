import React, {useState, useEffect} from 'react'
import { FaUser, FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import { GiDiploma } from 'react-icons/gi';
import { db, auth } from "../firebase";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { IoIosBusiness } from 'react-icons/io';
import { MdEvent } from 'react-icons/md';
import { UserIcon } from '@heroicons/react/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineNumber, AiOutlineMail, AiOutlinePhone, AiFillLinkedin, AiOutlineHome  } from 'react-icons/ai';
import { addDoc, getDoc, getDocs, collection, doc, updateDoc, query, where } from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
  } from "firebase/storage";
import {storage} from "../firebase.js"

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [userData, setUserData] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);
    let dp = "";
    const [profileURL, setProfileURL] = useState(dp);
    const [editedUser, setEditedUser] = useState({
        name: '',
        email: '',
        phone: '',
        institute: '',
        entryNo: '',
        linkedin: '',
        address: '',
        degree: '',
        department: '',
        passingYear: '',
        work_exp: [{}], // Store work experience as an array
        higherEducation: [{}], // Store work experience as an array
        profilepic: '',
        profileURL: ''
    });
    

    // const user = {
    //     name: 'John Doe',
    //     email: 'john.doe@example.com',
    //     phone: '+1234567890',
    //     institute: 'Example Institute', // Add institute name
    //     // Add more fields as needed
    // };

    useEffect(() => {
        console.log('Updated userData:', userData);
    }, [userData]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("trying to fetch");
                const userId = auth.currentUser.uid;
                console.log("userid:  ", userId);
                
                const colRef = collection(db, 'Users');
                console.log(colRef);
                const q = query(colRef, where('uid', '==', userId));
                
                try {
                    const snapshot = await getDocs(q);
                  
                    if (snapshot.size > 0) {
                      // Documents satisfying the query exist
                      snapshot.forEach((doc) => {
                        console.log(doc.id, '=>', doc.data());
                        setUserData(doc.data());
                        setProfileURL(doc.data.profileURL);
                        console.log("profile url",profileURL);
                        // console.log("after: ",userData);
                    });
                    } else {
                      console.log('No documents found for the given query.');
                    }
                } catch (error) {
                    console.error('Error getting documents:', error);
                }
                
            } catch (error) {
                console.error('Error fetching user data:', error);
                console.log("error in fetching data from firebase");
            }
        };

        fetchUserData();
    }, []); // Empty dependency array to ensure the effect runs only once on mount

    

    const handleEditClick = () => {
        setIsEditing(!isEditing);

        // Initialize editedUser with the fetched user data when entering edit mode
        setEditedUser({
            name: userData?.name || '',
            email: userData?.email || '',
            phone: userData?.phone || '',
            institute: userData?.institute || '',
            entryNo: userData?.entryNo || '',
            linkedin: userData?.linkedin || '',
            address: userData?.address || '',
            degree: userData?.degree || '',
            department: userData?.department || '',
            passingYear: userData?.passingYear || '',
            work_exp: userData?.work_exp || [{}],
            higherEducation: userData?.higherEducation || [{}],
            profilepic: userData?.profilePicture || '',
            profileURL: userData.profileURL || ''
        });
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedUser({
    //         ...editedUser,
    //         [name]: value,
    //     });
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    const handleInputChangeWorkExp = (e, index) => {
        const { name, value } = e.target;
        const updatedWorkExp = [...editedUser.work_exp];
        updatedWorkExp[index] = { ...updatedWorkExp[index], [name]: value };
        setEditedUser({ ...editedUser, work_exp: updatedWorkExp });
    };
    
    const handleInputChangeHigherEdu = (e, index) => {
        const { name, value } = e.target;
        const updatedHigherEdu = [...editedUser.higherEducation];
        updatedHigherEdu[index] = { ...updatedHigherEdu[index], [name]: value };
        setEditedUser({ 
            ...editedUser, 
            higherEducation: updatedHigherEdu 
        });
    };

    const handleRemoveWorkExp = (index) => {
        // Remove the work experience at the specified index
        const updatedWorkExp = [...editedUser.work_exp];
        updatedWorkExp.splice(index, 1);
        setEditedUser({
            ...editedUser,
            work_exp: updatedWorkExp
        });
    };

    const handleAddWorkExp = () => {
        // Add an empty work experience object to the array
        setEditedUser({
            ...editedUser,
            work_exp: [...editedUser.work_exp, {}]
        });
    };

    const handleRemoveHighEdu = (index) => {
        // Remove the work experience at the specified index
        const updatedHighEdu = [...editedUser.higherEducation];
        updatedHighEdu.splice(index, 1);
        setEditedUser({
            ...editedUser,
            higherEducation: updatedHighEdu
        });
    };

    const handleAddHighEdu = () => {
        // Add an empty work experience object to the array
        setEditedUser({
            ...editedUser,
            higherEducation: [...editedUser.higherEducation, {}]
        });
    };

    const handleProfilePictureChange = (e) => {
        setProfilePicture(e.target.files[0]);
        // const { name, value } = e.target;
        //   setEditedUser({
        //       ...editedUser,
        //       [name]: e.target.files[0],
        //   });
        // console.log(editedUser)
        console.log(profilePicture);
    };

    const handleSaveChanges = async () => {
        try {
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, 'users', userId);
            const colRef = collection(db, 'Users');
            const q = query(colRef, where('uid', '==', userId));

            const querySnapshot = await getDocs(q);

            // Check if any documents match the query
            if (querySnapshot.size > 0) {
            // Get the reference to the first matching document
            const docRef = doc(db, 'Users', querySnapshot.docs[0].id);
            
            if (profilePicture) {
                const storageRef = ref(storage,`/files/${userData.entryNo}`)
                console.log("stor ref: ",storageRef);
                const uploadTask = uploadBytesResumable(storageRef, profilePicture);
             
                uploadTask.on(
                    "state_changed",
                    (err) => console.log(err),
                    () => {
                        console.log("innnn");
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log("URL: ",url);
                            // setProfileURL(process.env.PROFILE_BASE_URL + url);
                            setEditedUser({ ...editedUser, profileURL: url });
                        });
                    }
                ); 
                console.log(profileURL);
            }

            // Update the document with the new data
            await updateDoc(docRef, editedUser);

            // Fetch updated data after saving changes
            const updatedSnapshot = await getDoc(docRef);

            if (updatedSnapshot.exists()) {
                // Update the userData state with the new data
                setUserData(updatedSnapshot.data());
            }

            if (profilePicture) {
                const storageRef = ref(storage,`/files/${userData.entryNo}`);
                console.log("full: ",storageRef);
                const uploadTask = uploadBytesResumable(storageRef, profilePicture);
             
                uploadTask.on(
                    "state_changed",
                    (err) => console.log(err),
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                            console.log(url);
                            // setProfileURL(url);
                            setEditedUser({ ...editedUser, profileURL: url });
                        });
                    }
                ); 
            }

            console.log('Document successfully updated!');
            } else {
            console.log('No documents found for the given query.');
            }
            // Update the Firestore document with the edited user details
            // await updateDoc(userDocRef, editedUser);

            setIsEditing(false);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let year = currentYear; year >= currentYear - 50; year--) {
            years.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return years;
    };

    // Define arrays for course and specialization options
    const courseOptions = ["B.Tech", "M.tech", "Ph.D.", "BSc", "MSc", "Dual Degree"];
    const specializationOptions = ["Computer Science", "Electrical", "Mechanical", "Chemical", "Civil", "Metallurgy and Materials", "Mathematics and Computing", "Engineering Physics", "AI", "Data Sience", "Bio-Medical", "Mathematics", "Humanaties", "Chemistry", "Physics"];

    // Array of country code options
    const countryCodeOptions = [
        { value: '+1', label: '+1 (USA)' },
        { value: '+44', label: '+44 (UK)' },
        { value: '+91', label: '+91 (India)' },
        // Add more options as needed
    ];

    // const handleStartDateChange = (date, index) => {
    //     const updatedHigherEducation = [...editedUser.higherEducation];
    //     updatedHigherEducation[index].startDate = date;
    //     setEditedUser({ ...editedUser, higherEducation: updatedHigherEducation });
    // };
    
    // const handleEndDateChange = (date, index) => {
    //     const updatedHigherEducation = [...editedUser.higherEducation];
    //     updatedHigherEducation[index].endDate = date;
    //     setEditedUser({ ...editedUser, higherEducation: updatedHigherEducation });
    // };      

    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }
      

    const renderProfileDetails = () => {
        return (
            <div className="p-6 mt-0">
                <div className="text-center mb-4 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white p-4 mb-4 mr-2 bg-blue-900 py-2 rounded-md shadow-md w-[200px]">Profile</h1>
                    {/* Use the UserIcon component */}
                    {/* <UserIcon className="h-8 w-8 text-blue-500" /> */}
                </div>

                {userData ? (
                    <div className='flex flex-row justify-between auto-rows-fr'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className="text-center mb-4 flex flex-col bg-slate-100 rounded-md overflow-hidden shadow-md w-[300px] p-6 min-h-[270px]">
                                <img src={`https://console.firebase.google.com/u/0/project/alumni-portal-df4f5/storage/alumni-portal-df4f5.appspot.com/${profileURL}`} className="rounded-full w-36 h-36 mx-auto mb-2" alt="Profile"/>
                                <h1 className="text-2xl font-bold text-gray-800 mb-1">{userData.name}</h1>
                                <p className="text-gray-500">{userData.email}</p>
                            </div>
                            <div className="text-center mb-4 flex flex-col bg-slate-100 rounded-md overflow-hidden shadow-md w-[300px] p-6 min-h-[300px]">
                                <h3 className='text-2xl font-bold text-gray-800 mb-4'>Contact Details</h3>
                                <div className="flex items-center mb-2">
                                    <AiOutlineMail className="text-gray-500 mr-2" />
                                    <p className="text-gray-500">{userData.email}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <AiOutlinePhone className="text-gray-500 mr-2" />
                                    <p className="text-gray-500">{userData.phone}</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <AiFillLinkedin className="text-gray-500 mr-2" />
                                    <p className="text-gray-500">{userData.linkedin}</p>
                                </div>
                                <div className="flex items-center">
                                    <AiOutlineHome className="text-gray-500 mr-2" />
                                    <p className="text-gray-500">{userData.address}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-col border-l border-r border-gray-300 bg-slate-100 w-[600px] p-8 mb-4 rounded-md overflow-hidden shadow-md'>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Details</h2>
                                <div className="mb-5">
                                    <p className="text-gray-600 flex flex-row">
                                        <FaEnvelope className="text-lg text-gray-400 mr-4" />
                                        <strong className='mr-3'>Email Id:</strong> {userData.email}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600 flex flex-row">
                                        <AiOutlineNumber className="text-lg text-gray-400 mr-4" />
                                        <strong className='mr-3'>Entry Number:</strong> {userData.entryNo}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600 flex flex-row">
                                        <SchoolIcon className="text-lg text-gray-400 mr-4" />
                                        <strong className='mr-3'>Degree:</strong> {userData.degree}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600 flex flex-row">
                                        <IoIosBusiness className="text-lg text-gray-400 mr-4" />
                                        <strong className='mr-3'>Department:</strong> {userData.department}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-600 flex flex-row">
                                        <MdEvent className="text-lg text-gray-400 mr-4" />
                                        <strong className='mr-3'>Year of Passing:</strong> {userData.passingYear}
                                    </p>
                                </div>
                            </div>

                            <div className='flex flex-col border-l border-r border-gray-300 bg-slate-100 w-[600px] p-8 rounded-md overflow-hidden shadow-md'>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Higher Education</h2>
                                {Array.isArray(userData.higherEducation) && userData.higherEducation.length > 0 ? (
                                    <ul className="list-disc pl-4">
                                        {userData.higherEducation.map((highEdu, index) => (
                                            <li key={index} className="mb-6 border border-gray-200 rounded-md p-4 flex flex-row justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{highEdu.course}</h3>
                                                    <h4 className="text-sm text-gray-500">{highEdu.specialization}</h4>
                                                    <p className="text-sm text-gray-500">{highEdu.institute}</p>
                                                </div>
                                                <div className="flex flex-row justify-center items-center">
                                                    <h5>
                                                        {highEdu.startYear}-{highEdu.endYear}
                                                    </h5>
                                                </div>                                                
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No higher Education available</p>
                                )}
                            </div>

                        </div>
                        
                        
                        <div className='flex flex-col w-[400px] p-8 bg-slate-100 rounded-md overflow-hidden shadow-md '>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Work Experience</h3>
                            {Array.isArray(userData.work_exp) && userData.work_exp.length > 0 ? (
                                <ul className="list-disc pl-4">
                                    {userData.work_exp.map((workExp, index) => (
                                        <li key={index} className="mb-6 border border-gray-200 rounded-md p-4 flex flex-row justify-between">
                                            <div>
                                                <h4 className="text-lg font-semibold">{workExp.job_title}</h4>
                                                <p className="text-sm text-gray-500">{workExp.company}</p>
                                            </div>
                                            <div className="flex flex-col justify-center items-end">
                                                <p className="text-sm text-gray-500">{workExp.duration}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No work experience available</p>
                            )}
                        </div>
                    </div>
                        
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        );
    };

    const renderEditProfileForm = () => {
        return (
            <>
                
                <div className="text-center mb-4 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white p-4 mb-4 mr-2 bg-blue-900 py-2 rounded-md shadow-md">Edit Profile</h1>
                    {/* Use the UserIcon component */}
                    {/* <UserIcon className="h-8 w-8 text-blue-500" /> */}
                </div>

                <div className="p-10 flex flex-col bg-slate-200 bg-opacity-60 rounded-md mx-10 mt-2 mb-3 md:flex-row md:space-x-8 md:justify-between">
                    
                    <div className='flex flex-col flex-grow mb-8 md:w-1/3'>

                        <div className="flex flex-row justify-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">Basic Details</h3>
                        </div>
                        <form>
                            <h2>Upload Profile Photo</h2>
                            <input 
                                name= "profilepic" 
                                type="file" 
                                accept="image/*" 
                                onChange={handleProfilePictureChange} 
                            />
                        </form>
                        <div className="mb-1">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={editedUser.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-1">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email id"
                                value={editedUser.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-1">
                            <input
                                type="text"
                                name="entryNo"
                                placeholder="Entry Number"
                                value={editedUser.entryNo}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-1">
                            <input
                                type="text"
                                name="degree"
                                placeholder="Degree"
                                value={editedUser.degree}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 overflow-y-auto"
                            />
                        </div>

                        <div className="mb-1">
                            <input
                                type="text"
                                name="department"
                                placeholder="Department"
                                value={editedUser.department}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 overflow-y-auto"
                            />
                        </div>

                        <div className="mb-1">
                            <select
                                type="year"
                                name="passingYear"
                                value={editedUser.passingYear}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Select Year of Passing</option>
                                {renderYearOptions()}
                            </select>
                        </div>

                        <div className="mb-1">
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIN URL"
                                value={editedUser.linkedin}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex flex-row justify-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">Contact Information</h3>
                        </div>
                        <div className="flex flex-row mb-1">
                            <select
                                name="countryCode"
                                value={editedUser.countryCode}
                                onChange={handleInputChange}
                                className="w-1/4 px-4 py-2 mr-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            >
                                <option value="">Country Code</option>
                                {countryCodeOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone No."
                                value={editedUser.phone}
                                onChange={handleInputChange}
                                className="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-1">
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={editedUser.address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            />
                        </div>

                    </div>
                    
                    <div className='flex flex-col flex-grow mb-8 md:w-1/3'>

                        <div className="flex flex-row justify-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">Higher Education</h3>
                        </div>
                        {editedUser.higherEducation.map((highEdu, index) => (
                            <div key={index} className="mb-4 border border-gray-300 bg-slate-100 bg-opacity-0.8 rounded-md p-4">
                                <input
                                    type="text"
                                    name="institute"
                                    placeholder="Name of Institute"
                                    value={highEdu.institute || ''}
                                    onChange={(e) => handleInputChangeHigherEdu(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                />
                                <div className="flex flex-row mb-2 space-x-4">
                                    <input
                                        type="text"
                                        name="startYear"
                                        placeholder='Start Year'
                                        value={highEdu.startYear || ''}
                                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                                        className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    />
                                    <input
                                        type="text"
                                        name="endYear"
                                        placeholder='Start Year'
                                        value={highEdu.endYear || ''}
                                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                                        className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className='flex flex-row space-x-1'>
                                    <select
                                        name="course"
                                        value={highEdu.course || ''}
                                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                                        className="w-1/3 px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="">Course</option>
                                        {courseOptions.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        name="specialization"
                                        value={highEdu.specialization || ''}
                                        onChange={(e) => handleInputChangeHigherEdu(e, index)}
                                        className="w-2/3 px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    >
                                        <option value="">Specialization</option>
                                        {specializationOptions.map((option, i) => (
                                            <option key={i} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <button
                                    onClick={() => handleRemoveHighEdu(index)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-900 transition duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className='flex flex-row justify-center'>
                            {/* Button to add new work experience */}
                            <button 
                                onClick={handleAddHighEdu}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-900 transition duration-200"
                            >
                                Add Higher Education
                            </button>
                        </div>
                        
                    </div>

                    <div className='flex flex-col flex-grow mb-8 md:w-1/3'>
                        <div className="flex flex-row justify-center mb-2">
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">Work Experience</h3>
                        </div>
                        {editedUser.work_exp.map((workExp, index) => (
                            <div key={index} className="mb-4 border border-gray-300 bg-slate-100 bg-opacity-0.8 rounded-md p-4">
                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder="Job Title"
                                    value={workExp.job_title || ''}
                                    onChange={(e) => handleInputChangeWorkExp(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                />
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Company"
                                    value={workExp.company || ''}
                                    onChange={(e) => handleInputChangeWorkExp(e, index)}
                                    className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                />
                                <div className="flex flex-row mb-2 space-x-4">
                                    <input
                                        type="text"
                                        name="startYear"
                                        placeholder='Start Year'
                                        value={workExp.startYear || ''}
                                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                                        className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    />
                                    <input
                                        type="text"
                                        name="endYear"
                                        placeholder='Start Year'
                                        value={workExp.endYear || ''}
                                        onChange={(e) => handleInputChangeWorkExp(e, index)}
                                        className="w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveWorkExp(index)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-900 transition duration-200"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className='flex flex-row justify-center'>
                            {/* Button to add new work experience */}
                            <button 
                                onClick={handleAddWorkExp}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none hover:bg-blue-900 transition duration-200"
                            >
                                Add Work Experience
                            </button>
                        </div>
                    </div>

                </div>
                <div className="mb-4 p-1 flex justify-center">
                    <button
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </>
            
        );
    };

    return (
        <div className="container mx-auto mt-0 p-6 w-full flex items-center min-h-[800px] bg-blue-800"
        style={{
            backgroundImage: `url("/images/car1.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: '0.9'
          }}
        >
            <div className="w-[100%] max-w-[10000px] h-full mx-auto mt-0 p-6 bg-none rounded-md overflow-hidden shadow-md flex flex-col">
                {isEditing ? renderEditProfileForm() : renderProfileDetails()}

                {!isEditing && (
                    <div className="p-2 flex justify-center">
                        <button
                            className="bg-blue-900 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                            onClick={handleEditClick}
                            disabled={isEditing}
                        >
                            Edit Profile
                        </button>
                    </div>
                )}


                {/* <Stack direction="row" spacing={2} className="ml-auto">
                    <Avatar {...stringAvatar(userData.name)} sx={{ width: 80, height: 80 }} />
                </Stack> */}

            </div>
        </div>
    );
}

export default Profile