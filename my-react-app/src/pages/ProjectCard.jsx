import React from 'react';

function ProjectCard({ imageFile, title, description, onRemove, onCardClick ,index }) {
  const handleClick = () => {
    // event.stopPropagation();
    onRemove(index);
  };
    return (
      // <div onClick={onCardClick}>
      <div className="bg-white  rounded-xl shadow-lg flex flex-col gap-4 w-[320px] h-[350px] relative ml-[51px] cursor-pointer hover:bg-gray-100">
        {imageFile && <img src={imageFile} alt="Uploaded" className="w-[320px]  rounded-t-xl h-[180px]" />}
        <button
          onClick={handleClick}
          className="absolute top-0 right-0 m-2 w-8 h-7 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
        >
          X
        </button>
        <div className='flex flex-col gap-3 ml-3 mt-2 mr-3 overflow-hidden  '>
        <p className='text-[20px]  font-semibold'>{title}</p>
        <p className='text-[15px] overflow-hidden line-clamp-3'>{description}</p>
        </div>
      </div>
    );
  }

export default ProjectCard;
