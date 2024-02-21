import React, { useState, useEffect } from 'react';

const TextSlider = ({ slides, interval = 3000 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, interval);

        return () => {
            clearInterval(timer);
        };
    }, [slides.length, interval]);

    const goToPrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const goToSlide=(i)=>{
        setIndex(i);
    }

    return (
        <div className="text-slider relative border border-gray-300 h-96">
            <button className="prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-l z-10" onClick={goToPrev}>&#10094;</button>
            <div className="slider-container relative flex justify-center items-center h-full">
                {slides.map((slide, i) => (
                    <div key={i} onClick={() => goToSlide(i)} className={`slide relative flex items-center ${i === index ? 'opacity-100' : 'opacity-0'}`}>
                        <img src={slide.image} alt="Slide Image" className="w-50 h-50 rounded-full mr-6" />
                        <div>
                            <h2 className="text-xl font-bold mb-2 ">{slide.heading}</h2>
                            <p className="text-gray-700 mb-2">{slide.body}</p>
                            <p className="text-sm text-gray-500">Author: {slide.author}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="next absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-1 rounded-r z-10" onClick={goToNext}>&#10095;</button>
        </div>




    );
};

export default TextSlider;
