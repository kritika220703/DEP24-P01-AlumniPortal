import React, { useState, useEffect } from "react";
import image from "../assets/fund1.png";
import image1 from "../assets/fund4.jpg";
import image2 from "../assets/fund3.jpg";
import image3 from "../assets/fund5.jpg";
import image4 from "../assets/fund9.jpg";
import image5 from "../assets/fund8.jpg";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";
import {db} from "../firebase.js";
import { 
  addDoc,  
  getDocs, 
  collection, 
  query, 
  where } from 'firebase/firestore';
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {storage} from "../firebase.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL 
} from "firebase/storage";

const Fund = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
  });
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("fundraiser_cards");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  let errorMessage = "";
  const notifySuccess = (message) => {
      toast.success(message, toastOptions);
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const colRef = collection(db, 'Fundraising');
        const querySnapshot = await getDocs(colRef);
        const fetchedCards = [];
  
        querySnapshot.forEach((doc) => {
          const cardData = doc.data();
          fetchedCards.push({
            title: cardData.title,
            shortDescription: cardData.shortDescription,
            longDescription: cardData.longDescription,
            imageFile: cardData.imageURL, // Assuming imageFile is stored in Firestore
            // Add other properties if available in your Firestore documents
          });
        });
  
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
        // Handle error, show error message, etc.
      }
    };

    localStorage.setItem("fundraiser_cards", JSON.stringify(cards));
  }, [cards]);

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const addCard = () => {
    if (formData.title && formData.shortDescription && formData.longDescription) {
      const newCard = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        imageFile: imageFile,
      };
      setCards([...cards, newCard]);
      setFormData({ title: "", shortDescription: "", longDescription: "" });
      setImageFile(null);
      // navigate(`/card/${cards.length}`); // Navigate to the newly created card's details page
    }
  };
  const isAdmin = localStorage.getItem("isAdmin");
  // const [cards, setCards] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.title === ""){
      errorMessage  = "Please provide title";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if (formData.shortDescription === "") {
      errorMessage = "Please provide a short description";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if (formData.longDescription === "") {
      errorMessage = "Please provide a long description";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if(imageFile === ""){
      errorMessage  = "Please add Image";
      toast.error(errorMessage, toastOptions);
      return;
    }

    if (formData.title && formData.shortDescription && formData.longDescription) {
      const newCard = {
        title: formData.title,
        shortDescription: formData.shortDescription,
        longDescription: formData.longDescription,
        imageFile: imageFile,
      };

      try {
        // Fetch user document from Firestore
        const colRef = collection(db, 'Users');
        const q = query(colRef, where('uid', '==', userId));
        const snapshot = await getDocs(q);

        // Check if user document exists
        if (snapshot.empty) {
            errorMessage = "User not found.";
            toast.error(errorMessage, toastOptions);
            return;
        }

        // Extract user data from document
        snapshot.forEach(async(doc) => {
          const userData = doc.data();
          const { name, email, phone } = userData;

          // Do something with the user data (e.g., display it, store it, etc.)
          console.log('User Name:', name);
          console.log('User Email:', email);
          console.log('User Phone:', phone);

          // Now that the state has been updated, you can proceed with the API call
          const data = {
            email: email, 
            name: name,
            phone: phone,
            title: formData.title,
            shortDescription: formData.shortDescription,
            longDescription: formData.longDescription,
            imageURL: imageFile
          };

          // const response = await fetch(`http://localhost:3000/email/events/talks`, {
          //     method: "POST",
          //     headers: {
          //     "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify(data),
          // });
          // console.log(response.status);

          // if(response.status !== 200) {
          //     errorMessage = "Failed to send mail.";
          //     toast.error(errorMessage, toastOptions);
          //     return;
          // } 

          const storageRef = ref(storage,`/fundraising/${imageFile.name}`)
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
          uploadTask.on(
            "state_changed",
            (snapshot) => {

            },
            (error) => {
              console.log("error uploading image file:", error);
              toast.error("Error in image upload!");
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                console.log("image url:", url);
                // setImageURL(url);

                const docRef = await addDoc(collection(db, "Fundraising"), {
                  uid: userId,
                  email: email, 
                  name: name,
                  phone: phone,
                  title: formData.title,
                  shortDescription: formData.shortDescription,
                  longDescription: formData.longDescription,
                  imageURL: url
                });

                // Update state with the new card information
                const newCard = {
                  title: formData.title,
                  shortDescription: formData.shortDescription,
                  longDescription: formData.longDescription,
                  imageFile: imageFile,
                };
                setCards([...cards, newCard]);
                setFormData({ title: "", shortDescription: "", longDescription: "" });
                setImageFile(null);
                closeForm();
                notifySuccess("Card added successfully!");
              }
              catch(error) {
                console.log("Error getting download URL or saving data:", error)
                errorMessage = "Error uploading image file!";
                toast.error(errorMessage, toastOptions);
                return;
              }
            }
          );
      
        });

      } catch(error) {
        errorMessage = "Error submitting form!";
        toast.error(errorMessage, toastOptions);
      }
    }
  };

  const handleRemoveCard = (index,) => {
    // event.stopPropagation(); // Prevent the click event from propagating
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    localStorage.setItem("fundraiser_cards", JSON.stringify(updatedCards));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center bg-gray-200 w-full h-[120px] gap-2 ">
        <p className="text-black font-bold font-serif text-[28px]">
          Fundraising
        </p>
        <p className="text-[22px] font-normal font-serif text-gray-500">
          Select one of the initiatives below that you would like to Donate to
        </p>
      </div>

      <div className="flex flex-row  items-center justify-center gap-[50px]">
        <div
          className="shadow-lg w-[320px] h-[350px]  flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100"
          onClick={() => {
            navigate("/special-projects");
          }}
        >
          <div className="w-[320px] h-[150px]">
            <img src={`${image}`} className="object-cover rounded-t-lg" />
          </div>

          <div className="flex flex-col gap-3 ml-3 mt-2 mr-3  ">
            <p className="text-[20px]  font-semibold">Special Projects</p>
            <p className="text-[15px]">
              Projects that are critical today and urgently need your
              support!...
            </p>
          </div>
        </div>

        <div
          className="shadow-lg w-[320px] h-[350px]  flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100"
          onClick={() => {
            navigate("/general-purpose");
          }}
        >
          <div className="w-[320px] h-[150px]">
            <img src={`${image1}`} className="object-cover rounded-t-lg" />
          </div>

          <div className="flex flex-col gap-3 ml-3 mt-2 mr-3 ">
            <p className="text-[20px]  font-semibold">
              Unrestricted and Greatest Need
            </p>
            <p className="text-[15px]">
              Help IITBHF to support the Greatest Needs at IITB and to stay
              alive - do fund-raising, pay financial charges, ...
            </p>
          </div>
        </div>

        <div
          className="shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100"
          onClick={() => {
            navigate("/financial-aid-program");
          }}
        >
          <div className="w-[320px] h-[150px]">
            <img src={`${image2}`} className="object-cover rounded-t-lg" />
          </div>

          <div className="flex flex-col gap-3 ml-3 mr-3  mt-2">
            <p className="text-[20px]  font-semibold">
              Scholarships/Student Programs
            </p>
            <p className="text-[15px]">
              "Let no admitted student be denied an IIT education due to a lack
              of funds!"...
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row  items-center justify-center gap-[50px] ">
        <div
          className="shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100"
          onClick={() => {
            navigate("/legacy-projects");
          }}
        >
          <div className="w-[320px] h-[150px]">
            <img src={`${image4}`} className="object-cover rounded-t-lg" />
          </div>

          <div className="flex flex-col gap-3 ml-3 mr-3  mt-2">
            <p className="text-[20px]  font-semibold">Undergraduate Labs</p>
            <p className="text-[15px]">
              The funds will be used to provide new and upgraded technology for
              the labs as well as maintain lab space and e...
            </p>
          </div>
        </div>

        <div
          className="shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100"
          onClick={() => {
            navigate("/faculty-program");
          }}
        >
          <div className="w-[320px] h-[150px]">
            <img src={`${image3}`} className="object-cover rounded-t-lg" />
          </div>

          <div className="flex flex-col gap-3 ml-3 mr-3  mt-2">
            <p className="text-[20px]  font-semibold">
              Faculty/Memorial Programs
            </p>
            <p className="text-[15px]">
              IIT Ropar faculty is at the heart of what distinguishes IIT Ropar
              from others. Help support faculty excellence programs....
            </p>
          </div>
        </div>
        <div
          className="shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100"
          onClick={() => {
            navigate("/hostel-project");
          }}
        >
          <div className="w-[320px] h-[150px]">
            <img src={`${image5}`} className="object-cover rounded-t-lg" />
          </div>

          <div className="flex flex-col gap-3 ml-3 mr-3  mt-2">
            <p className="text-[20px]  font-semibold">Hostel Projects</p>
            <p className="text-[15px]">
              Our 'homes away from homes' need urgent support - enhancements,
              mess workers, maintenance, etc....
            </p>
          </div>
        </div>
      </div>

      {cards.map(
        (card, index) =>
          index % 3 === 0 && (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="flex flex-wrap justify-between mt-8 gap-[33px] mr-5"
            >
              {[index, index + 1, index + 2].map(
                (cardIndex) =>
                  cards[cardIndex] && (
                    <div key={cardIndex} className="w-[30%]">
                      <ProjectCard
                        index={cardIndex}
                        title={cards[cardIndex].title}
                        shortDescription={card.shortDescription}
                        longDescription={card.longDescription}
                        imageFile={cards[cardIndex].imageFile}
                        onRemove={() => handleRemoveCard(index)}
                        onClick={() => {
                          navigate(`/project/${index}`);
                        }}
                      />
                    </div>
                  )
              )}
            </div>
          )
      )}

      {isAdmin === "false" ? (
        <>
          <div
            className="w-[200px] h-[60px] bg-indigo-700 text-white rounded-xl shadow-lg flex items-center justify-center text-[22px] hover:bg-indigo-500 ml-[50px] mb-8 cursor-pointer mt-8"
            onClick={openForm}
          >
            Add Fundraising
          </div>

          {isFormOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              <div className="bg-white p-4 rounded-lg shadow-lg z-50 flex flex-col w-[600px] h-[600px] relative overflow-auto">
                <button
                  onClick={closeForm}
                  className="absolute top-0 right-0 m-2 w-7 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
                >
                  X
                </button>
                <h1 className="text-[28px] ml-[140px] font-bold mb-4 w-[300px] flex items-center justify-center border border-gray-900 p-1">
                  Fundraising Form
                </h1>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="text-semibold text-[18px]">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="h-10 w-full border border-gray-500 hover:border-indigo-900 cursor-pointer"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div>
                    <label className="text-semibold text-[18px] mt-3">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="h-[45px] w-full border overflow-x-auto border-gray-500 hover:border-indigo-900"
                    />
                  </div>
                  <div>
                  <label className="block mt-3 text-[18px]">Short Description</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="w-full h-[100px] max-h-[200px] overflow-auto bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
                  ></textarea>
                </div>

                <div>
                  <label className="block mt-3 text-[18px]">Long Description</label>
                  <textarea
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    className="w-full h-[100px] max-h-[200px] overflow-auto bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
                  ></textarea>
                </div>

                  <button
                    type="submit"
                    className="text-[20px]  text-gray-200 ml-[230px] w-[120px] h-[50px] mt-3 flex items-center justify-center bg-indigo-700 rounded-xl"
                  >
                    Add Card
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <div></div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Fund;
