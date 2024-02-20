import React from 'react'
import NewsUpdate from "../components/NewsUpdate";
import BecomeMember from '../components/BecomeMember';
import TextSlider from '../components/TextSlider';
import { CarouselWithContent } from '../components/TextCarousel';
// import TextCarousel from '../components/TextCarousel';

const Home = () => {
    const slides = [
        {
            image: '/images/download.jfif',
            heading: 'Slide 1 Heading',
            body: 'Slide 1 Body Text',
            author: 'Author 1',
        },
        {
            image: '/images/download.jfif',
            heading: 'Slide 2 Heading',
            body: 'Slide 2 Body Text',
            author: 'Author 2',
        },
        {
            image: '/images/download.jfif',
            heading: 'Slide 3 Heading',
            body: 'Slide 3 Body Text',
            author: 'Author 3',
        },
        // Add more slide objects as needed
    ];
    
  return (
    <div className='ml-8 mr-8 mt-4'>
        <div className="">
            <BecomeMember /> {/* Rendering the BecomeMember component */}
        </div>
        <hr className="border-gray-300 my-8" />
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-4 mb-8 flex-grow">
                <div className="bg-white border-2 rounded-lg text-left p-4 h-full">
                    <h1 className="text-2xl font-bold mb-4 animate-bounce">Latest News Updates</h1>
                    <div className="space-y-4">
                        <NewsUpdate 
                        title="New Feature Release" 
                        description="We've just released an exciting new feature to improve user experience."
                        date="February 10, 2024"
                        />
                        <NewsUpdate 
                        title="Company Announcement" 
                        description="We're thrilled to announce our partnership with XYZ Corporation."
                        date="February 9, 2024"
                        />
                    </div>
                    <div className="mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Read More News
                        </button>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 md:pl-4 mb-8 flex-grow">
                <div className="bg-white border-2 rounded-lg text-left p-4 h-full">
                    <h1 className="text-2xl font-bold mb-4 animate-bounce">Monthly Newsletters</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                            <img src="/images/download.jfif" alt="January 2024" className="object-cover w-full h-48" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <h2 className="text-white font-bold text-lg">January 2024</h2>
                            </div>
                        </div>
                        <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                            <img src="/images/download (1).jfif" alt="January 2024" className="object-cover w-full h-48" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <h2 className="text-white font-bold text-lg">December 2023</h2>
                            </div>
                        </div>
                        <div className="relative bg-gray-200 rounded-lg overflow-hidden">
                            <img src="/images/download (2).jfif" alt="January 2024" className="object-cover w-full h-48" />
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <h2 className="text-white font-bold text-lg">November 2023</h2>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Newsletter Archive
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {/* <hr className="border-gray-300 my-8" /> */}
        {/* <hr className="border-gray-300 my-8" /> */}
        <div className='container mx-auto py-8 '>
            <TextSlider slides={slides} interval={5000} />
        </div>

        
    </div>
  )
}

export default Home