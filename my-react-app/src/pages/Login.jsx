import React, { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import {auth, db} from "../firebase.js"
import { useAuth } from '../utilities/AuthContext.js';
import { getDocs, collection, query, where, addDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword
} from "firebase/auth";
import image from '.././assets/administration-block-iit-ropar-8176406.webp'

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Login = () => {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [userRes, setUserRes] = useState(null);

  let errorMessage = "";
  const notifySuccess = (message) => {
      toast.success(message, toastOptions);
  };
  const navigate = useNavigate();

  const {login} = useAuth();
  // console.log("user:", auth);

  const handleLogin = async (email, password) => {
    try {
      console.log("hello");
      const user = await signInWithEmailAndPassword(
          auth,
          email,
          password
      );

      // console.log("user: ", user);

      login(user);
    } catch (error) {
        console.log("error: ",error.message);
        const errorCode = error.code;
    
        if(errorCode === "auth/user-not-found"){
            errorMessage = "Entered user is not found. Please use different email id.";
        }
        else if(errorCode === "auth/invalid-email"){
            errorMessage = "Entered email is invalid.";
        } 
        else if (errorCode === "auth/invalid-login-credentials") {
            errorMessage = "Email or Password is incorrect";
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

    const colRef = collection(db, 'Users');
    console.log(colRef);
    const q = query(colRef, where('email', '==', email));

    try {
      const snapshot = await getDocs(q);
    
      if (snapshot.size == 0) {
        // Documents satisfying the query exist
          errorMessage = "Entered email is not in use. Please sign up or use different email id.";
          toast.error(errorMessage, toastOptions);
          return;
        }

        console.log("snap:  ", snapshot);
  
      } catch (error) {
        console.error('Error getting documents:', error);
    }

    setIsLoading(true);
    try {
        const data = {
            email: email,
        };

        const response = await fetch(`http://localhost:3000/email/sendotp`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
          },
        });

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

        if(response.status !== 200) {
            errorMessage = "Failed to verify OTP.";
            toast.error(errorMessage, toastOptions);
            navigate("/login");
            return;
        } else {
            await handleLogin(email, "666666");
            console.log("login done");
            notifySuccess("OTP verified successfully");
            setIsOtpVerified(true);

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
      {!isOtpSent ? (
        <form
          className="flex justify-center items-center h-screen"
          style={{ backgroundImage: `url(${image})`, opacity: '0.8', backgroundSize: 'cover', backgroundPosition: 'center' }}
          onSubmit={handleSubmit}
        >
          <div className='bg-white p-8 rounded-md shadow-md max-w-md w-full'>
            <h1 className="text-3xl font-bold mb-6">Login</h1>

            <input
              type="email"
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-900"
            />
      
            <button
              type="submit"
              className='w-full px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-900 focus:outline-none'
            >
              Login
            </button>

            {/* Link to navigate to the login page */}
            <p className="mt-4 text-gray-600 text-center">
                Don not have an account?{" "}
                <Link to="/" className="text-indigo-700 hover:underline">
                Sign Up
                </Link>
            </p>
          </div>
        </form>
      ) : (
        <form onSubmit={handleOTPSubmit}>
          <div className='mb-6 flex flex-col items-center justify-center gap-5 mx-auto h-screen w-full bg-gray-200'>
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

            {isOtpVerified && (
              <div className="text-indigo-500 mt-2">
                <FiCheckCircle size={24} />
                <span className="ml-2">OTP Verified!</span>
              </div>
            )}
          </div>
        </form>
      )}
      <ToastContainer/>
    </>
  );
};

export default Login;
