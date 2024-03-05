import React, { useState, useEffect } from 'react'
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { useAuth } from '../utilities/AuthContext';
import {auth, db} from "../firebase.js"
import {
    createUserWithEmailAndPassword
} from "firebase/auth";
import { addDoc, getDoc, getDocs, collection, doc, updateDoc, query, where } from "firebase/firestore";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL 
  } from "firebase/storage";
import {storage} from "../firebase.js"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from '.././assets/administration-block-iit-ropar-8176406.webp'

const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

const SignUp = () => {
    const location = useLocation();
    const { editedUser, profilePicture } = location.state || {};
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    // const [password, setPassword] = useState("");
    // const [cpassword, setCPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [userRes, setUserRes] = useState(null);
    console.log(editedUser);
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    
        // Validate email format using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(newEmail);
        // const isValid = validator.isEmail(newEmail);
        setIsValidEmail(isValid);
    };

    let errorMessage = "";
    const notifySuccess = (message) => {
        toast.success(message, toastOptions);
    };
    const navigate = useNavigate();

    const {login} = useAuth();

    const signup = async (email, password, username) => {
        try {
            console.log("hello");
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(result);
            const user = result.user;
    
            console.log(user);

            const docRef = await addDoc(collection(db, "Users"), {
                name: username,
                email: email,
                // institute_name: '',
                uid: user.uid,
            });

            const userId = user.uid;
            const userDocRef = doc(db, 'users', userId);
            const colRef = collection(db, 'Users');
            const q = query(colRef, where('uid', '==', userId));

            const querySnapshot = await getDocs(q);

            // Check if any documents match the query
            if (querySnapshot.size > 0) {
                // Get the reference to the first matching document
                const docRef = doc(db, 'Users', querySnapshot.docs[0].id);
            
                if (profilePicture) {
                    const storageRef = ref(storage,`/files/${editedUser['entryNo']}`)
                    console.log("stor ref: ",storageRef);
                    const uploadTask = uploadBytesResumable(storageRef, profilePicture);
                
                    uploadTask.on(
                        "state_changed",
                        (err) => console.log(err),
                        () => {
                            console.log("innnn");
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                console.log("URL: ",url);
                                editedUser['profileURL']=url;
                                // setProfileURL(process.env.PROFILE_BASE_URL + url);
                                // setEditedUser({ ...editedUser, profileURL: url });
                            });
                        }
                    ); 
                    // console.log(profileURL);
                }

                // Update the document with the new data
                await updateDoc(docRef, editedUser);

                console.log('Document successfully updated!');
            } else {
            console.log('No documents found for the given query.');
            }

            console.log("auth.currentuser::   ",auth.currentUser);
            login(user);

        } catch (error) {
            console.log("error: ",error.message);
            const errorCode = error.code;
            // const errorMessage = error.message;

            if(errorCode === "auth/weak-password"){
                errorMessage = "Password is too weak";
            }
            else if(errorCode === "auth/email-already-in-use"){
                errorMessage = "Entered email is already in use. Please log in or use different email id.";
            }
            else if(errorCode === "auth/invalid-email"){
                errorMessage = "Entered email is invalid.";
            }
            else{
                errorMessage = "Error in signing up.";
            }
            toast.error(errorMessage, toastOptions);
        }
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

        if (!editedUser || editedUser['entryNo'] === '') {
            errorMessage = "User is not a Member";
            toast.error(errorMessage, toastOptions);
            navigate("/BecomeAMember");
            return;
        }
        
        const colRef = collection(db, 'Users');
        console.log(colRef);
        const q = query(colRef, where('email', '==', email));

        try {
            console.log("in signup try part")
            const snapshot = await getDocs(q);
          
            if (snapshot.size > 0) {
              // Documents satisfying the query exist
                errorMessage = "Entered email is already in use. Please log in or use different email id.";
                toast.error(errorMessage, toastOptions);
                return;
            } 
        } catch (error) {
            console.error('Error getting documents:', error);
        }

        setIsLoading(true);
        try {
            const data = {
                email: email,
            };

            console.log("calling api")
            const response = await fetch(`http://localhost:3000/email/sendotp`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
            });
            console.log(response)
            // setUserRes(response.data);

            if(response.status !== 200) {
                errorMessage = "Failed to send OTP.";
                toast.error(errorMessage, toastOptions);
                return;
            } else {
                notifySuccess("OTP sent to your email id");
                setIsOtpSent(true);
            }
        } catch {
            errorMessage = "Failed to create an account.";
            toast.error(errorMessage, toastOptions);
        }
        setIsLoading(false);
    }

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = {
                email: email,
                otp: otp,
            };

            const response = await fetch(`http://localhost:3000/email/verifyotp`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log(response.status);

            if(response.status !== 200) {
                errorMessage = "Failed to verify OTP.";
                toast.error(errorMessage, toastOptions);
                navigate("/signup");
                return;
            } else {
                await signup(email, "666666", name);
                console.log("signup done");
                notifySuccess("OTP verified successfully");

                const userId = auth.currentUser.uid;
                // Storing user ID in local storage
                localStorage.setItem("userId", userId);

                navigate("/home");
                setIsOtpSent(false);
            }
        } catch {
            errorMessage = "Failed to create an account.";
            toast.error(errorMessage, toastOptions);
        }
        setIsLoading(false);
    }

  return (
    <>
        {/* <div>SignUp</div> */}
        {!isOtpSent ? (
            <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen " style={{ backgroundImage: `url(${image})`, opacity: '0.7', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='bg-white p-8 rounded-md shadow-md max-w-md w-full bg-transparent opacity-70 brightness-25'>
                    <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

                    <input
                        type="text"
                        name='name'
                        placeholder='UserName'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 mb-4  border-4 border-gray-500 rounded-md focus:outline-none focus:border-indigo-900"
                    />
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        onChange={handleEmailChange}
                        className="w-full px-4 py-2 mb-4 border-4 border-gray-500 rounded-md focus:outline-none focus:border-indigo-900"
                    />
                    {!isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
                    
                    <button 
                        className='w-full px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-900 focus:outline-none'>
                        Sign Up
                    </button>

                    {/* Link to navigate to the login page */}
                    <p className="mt-4 text-gray-600 text-center text-[20px]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-700 hover:underline">
                        Log In
                        </Link>
                    </p>
                    
                </div>
            </form>
        ):(
            <form onSubmit={handleOTPSubmit}>
                <div className='mb-6 flex flex-col items-center justify-center gap-5 mx-auto h-screen w-full bg-gray-200'>
                    {/* <h1 className="text-3xl font-bold">Verify OTP</h1> */}
                    <label
                        htmlFor="otp"
                        className="block text-gray-800 font-medium mb-2"
                    >
                        Enter OTP:
                    </label>

                    <div className="flex items-center">
                        <input
                            type="text"
                            name="otp"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mr-2'
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
                        >
                        Verify OTP
                        </button>
                    </div>

                    {/* <div className="text-indigo-500 mt-2">
                        <FiCheckCircle size={24} />
                        <span className="ml-2">OTP Verified!</span>
                    </div> */}
                </div>
            </form>
        )}
        <ToastContainer />
    </>
  )
}

export default SignUp