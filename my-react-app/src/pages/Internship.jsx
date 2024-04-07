import React, { useState} from 'react';
import image from '../assets/fund1.png'
import image1 from '../assets/fund4.jpg'
import image2 from '../assets/fund3.jpg'
import image3 from '../assets/fund5.jpg'
import image4 from '../assets/fund9.jpg'
import image5 from '../assets/fund8.jpg'
import ProjectCard from './ProjectCard'; 


const Fund = () => {

       const addCard = () => {
        if (formData.title && formData.description) {
          const newCard = { title: formData.title, description: formData.description, imageFile: imageFile };
          setCards([...cards, newCard]);
          setFormData({ title: "", description: "" });
          setImageFile(null);
        }
      };
    const isAdmin = localStorage.getItem("isAdmin");
    const [cards, setCards] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(URL.createObjectURL(file));
      };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description) {
      const newCard = { title: formData.title, description: formData.description, imageFile: imageFile };
      setCards([...cards, newCard]);
      setFormData({ title: "", description: "" });
      setImageFile(null);
      closeForm();
    }
  };

const handleRemoveCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };
  
  return (
    <div className='flex flex-col items-center justify-center'>

        <div className='flex flex-col items-center justify-center bg-gray-200 w-full h-[120px] gap-2 '>
            <p className='text-black font-bold font-serif text-[28px]'>Internship Opportunities</p>
        </div>

<div className='flex flex-row  items-center justify-center gap-[50px]'>
        <div className='shadow-lg w-[320px] h-[350px]  flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100'>
              <div className='w-[320px] h-[150px]'>
                <img src={`${image}`} className='object-cover rounded-t-lg'/>
              </div>

              <div className='flex flex-col gap-3 ml-3 mt-2 mr-3  '>
                <p className='text-[20px]  font-semibold'>Special Projects</p>
                <p className='text-[15px]'>Projects that are critical today and urgently need your support!...</p>
              </div>
        </div>

        <div className='shadow-lg w-[320px] h-[350px]  flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100'>
              <div className='w-[320px] h-[150px]'>
                <img src={`${image1}`} className='object-cover rounded-t-lg'/>
              </div>

              <div className='flex flex-col gap-3 ml-3 mt-2 mr-3 '>
                <p className='text-[20px]  font-semibold'>Unrestricted and Greatest Need</p>
                <p  className='text-[15px]'>Help IITBHF to support the Greatest Needs at IITB and to stay alive - do fund-raising, pay financial charges, ...</p>
              </div>
        </div>

        <div className='shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100'>
              <div className='w-[320px] h-[150px]'>
                <img src={`${image2}`} className='object-cover rounded-t-lg'/>
              </div>

              <div className='flex flex-col gap-3 ml-3 mr-3  mt-2'>
                <p className='text-[20px]  font-semibold'>Scholarships/Student Programs</p>
                <p className='text-[15px]'>"Let no admitted student be denied an IIT education due to a lack of funds!"...</p>
              </div>
        </div>

</div>

<div className='flex flex-row  items-center justify-center gap-[50px] '>
        <div className='shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100'>
              <div className='w-[320px] h-[150px]'>
                <img src={`${image4}`} className='object-cover rounded-t-lg'/>
              </div>

              <div className='flex flex-col gap-3 ml-3 mr-3  mt-2'>
                <p className='text-[20px]  font-semibold'>Class Legacy Projects</p>
                <p className='text-[15px]'>Join your batchmates in funding significant, meaningful projects at IIT Ropar that have lasting impact!...</p>
              </div>
        </div>
        
        <div className='shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100'>
              <div className='w-[320px] h-[150px]'>
                <img src={`${image3}`} className='object-cover rounded-t-lg'/>
              </div>

              <div className='flex flex-col gap-3 ml-3 mr-3  mt-2'>
                <p className='text-[20px]  font-semibold'>
Faculty/Memorial Programs</p>
                <p className='text-[15px]'>IIT Ropar faculty is at the heart of what distinguishes IIT Ropar from others. Help support faculty excellence programs....</p>
              </div>
        </div>
        <div className='shadow-lg w-[320px] h-[350px] flex flex-col gap-8 mb-8 mt-8 ml-10 rounded-xl cursor-pointer hover:bg-gray-100'>
              <div className='w-[320px] h-[150px]'>
                <img src={`${image5}`} className='object-cover rounded-t-lg'/>
              </div>

              <div className='flex flex-col gap-3 ml-3 mr-3  mt-2'>
                <p className='text-[20px]  font-semibold'>Hostel Projects</p>
                <p className='text-[15px]'>Our 'homes away from homes' need urgent support - enhancements, mess workers, maintenance, etc....</p>
              </div>
        </div>
        </div>

       
{cards.map((card, index) => (
  index % 3 === 0 && (
    <div key={index} className="flex flex-wrap justify-between mt-8 gap-[33px] mr-5">
      {[index, index + 1, index + 2].map((cardIndex) => (
        cards[cardIndex] && (
          <div key={cardIndex} className="w-[30%]">
            <ProjectCard title={cards[cardIndex].title} description={cards[cardIndex].description} imageFile={cards[cardIndex].imageFile} onRemove={() => handleRemoveCard(index)} />
          </div>
        )
      ))}
    </div>
  )
))}

{isAdmin==="false" ? (
                    <>
                   
                        <div className='w-[200px] h-[60px] bg-indigo-700 text-white rounded-xl shadow-lg flex items-center justify-center text-[22px] hover:bg-indigo-500 ml-[50px] mb-8 cursor-pointer mt-8' onClick={openForm}>
                           Add Fundraising
                        </div>
                        {/* {isFormOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                            <div className="bg-white p-4 rounded-lg shadow-lg z-50 flex flex-col  w-[600px] h-[600px]">
                            <h1 className="text-[28px] ml-[140px] font-bold mb-4 w-[300px] flex items-center justify-center border border-gray-900 p-1">Fundraising Form</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                <label className='text-semibold text-[18px]'>Upload Image</label>
                                <input type="file" className='h-10 w-full border border-gray-500 hover:border-indigo-900 cursor-pointer' onChange={handleImageUpload} />
                                </div>
                                <div>
                                <label className="text-semibold text-[18px] mt-3">Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className='h-[45px] w-full border overflow-x-auto border-gray-500 hover:border-indigo-900' />
                                </div>
                                <div>
                                <label className="block mt-3 text-[18px]">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full h-[100px] max-h-[200px] overflow-auto bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
                                ></textarea>
                                </div>
                                <button type="submit" className="text-[20px]  text-gray-200 ml-[230px] w-[120px] h-[50px] mt-3 flex items-center justify-center bg-indigo-700 rounded-xl" >
                                Add Card
                                </button>
                                
                            </form>
                            </div>
                        </div>
                        )}                         */}
                        {isFormOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg shadow-lg z-50 flex flex-col w-[600px] h-[600px] relative">
            <button
              onClick={closeForm}
              className="absolute top-0 right-0 m-2 w-7 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            <h1 className="text-[28px] ml-[140px] font-bold mb-4 w-[300px] flex items-center justify-center border border-gray-900 p-1">Fundraising Form</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label className='text-semibold text-[18px]'>Upload Image</label>
                <input type="file" className='h-10 w-full border border-gray-500 hover:border-indigo-900 cursor-pointer' onChange={handleImageUpload} />
              </div>
              <div>
                <label className="text-semibold text-[18px] mt-3">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className='h-[45px] w-full border overflow-x-auto border-gray-500 hover:border-indigo-900' />
              </div>
              <div>
                <label className="block mt-3 text-[18px]">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-[100px] max-h-[200px] overflow-auto bg-gray-200 rounded-lg px-4 py-2 focus:bg-white transition-colors duration-300"
                ></textarea>
              </div>
              <button type="submit" className="text-[20px]  text-gray-200 ml-[230px] w-[120px] h-[50px] mt-3 flex items-center justify-center bg-indigo-700 rounded-xl" >
                Add Card
              </button>
            </form>
          </div>
        </div>
      )}
                    </>
                ) : (<div></div>)}



    </div>
  );
};

export default Fund;
