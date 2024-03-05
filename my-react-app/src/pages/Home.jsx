import React from 'react'
import NewsUpdate from "../components/NewsUpdate";
import BecomeMember from '../components/BecomeMember';
import TextSlider from '../components/TextSlider';
import { useNavigate  } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); 

    const handleNewsClick = () => {
        navigate('/news');
    };
    const slides = [
        {
            image: '/images/director.jpeg',
            heading: 'Message from Prof. Rajeev Ahuja',
            body: 'The Institute is committed to create an ambience for nurturing innovation, creativity and excellence within its students. We, at IIT Ropar, strongly support interdisciplinary research and development for the benefit of Industry and Society.\n\nWe emphasise on developing all round leadership skills. We are proud to say that the Institute is ideally placed to exploit the synergy within the engineering and science departments at the Institute. In doing so, we believe the Institute will continue to create unique and novel programmes to make significant contributions to Science and Technology as a domain. We are confident that all our efforts will grow into significant epitomes of achievements in the larger academic parlance. Hopefully, our labors in all the major areas of science and technology will produce fruitful results in academic innovation, top-tier journal publications, citations and technology developments.',
            author: 'Author 1',
        },
        {
            image: '/images/puneet_sir.jpeg',
            heading: 'Message from Dr. Puneet Goyal',
            body: 'The Institute is committed to create an ambience for nurturing innovation, creativity and excellence within its students. We, at IIT Ropar, strongly support interdisciplinary research and development for the benefit of Industry and Society.\n\nWe emphasise on developing all round leadership skills. We are proud to say that the Institute is ideally placed to exploit the synergy within the engineering and science departments at the Institute. In doing so, we believe the Institute will continue to create unique and novel programmes to make significant contributions to Science and Technology as a domain. We are confident that all our efforts will grow into significant epitomes of achievements in the larger academic parlance. Hopefully, our labors in all the major areas of science and technology will produce fruitful results in academic innovation, top-tier journal publications, citations and technology developments.',
            author: 'Author 2',
        },
        {
            image: '/images/Sudarshan_sir.jpg',
            heading: 'Message from Dr. Sudarshan Iyenger',
            body: 'The Institute is committed to create an ambience for nurturing innovation, creativity and excellence within its students. We, at IIT Ropar, strongly support interdisciplinary research and development for the benefit of Industry and Society.\n\nWe emphasise on developing all round leadership skills. We are proud to say that the Institute is ideally placed to exploit the synergy within the engineering and science departments at the Institute. In doing so, we believe the Institute will continue to create unique and novel programmes to make significant contributions to Science and Technology as a domain. We are confident that all our efforts will grow into significant epitomes of achievements in the larger academic parlance. Hopefully, our labors in all the major areas of science and technology will produce fruitful results in academic innovation, top-tier journal publications, citations and technology developments.',
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
                        title="IIT-Ropar researchers discover rare metal in Sutlej" 
                        description="A team of researchers from the Indian Institute of Technology (IIT), Ropar has detected the presence of tantalum, a rare metal used in manufacturing of electronic components, in the Sutlej river sand in Punjab."
                        date="February 10, 2024"
                        />
                        <NewsUpdate 
                        title="IIT Ropar director Rajeev Ahuja gets additional charge of IIT-G" 
                        description="Amid controversy of illegal appointment of acting (officiating) director in IIT Guwahati and following Gauhati high court’s recent directive to remove acting director PK Iyer from the post."
                        date="February 9, 2024"
                        />
                    </div>
                    <div className="mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewsClick}>
                            Read More News
                        </button>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 md:pl-4 mb-8 flex-grow">
                <div className="bg-white border-2 rounded-lg text-left p-4 h-full">
                    <h1 className="text-2xl font-bold mb-4 animate-bounce mt-2" >Monthly Newsletters</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
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
                    <div className="mt-[60px]">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNewsClick}>
                            Newsletter Archive
                        </button>
                    </div>
                </div>
            </div>
        </div>
        {/* <hr className="border-gray-300 my-8" /> */}
        {/* <Gallery/> */}
        {/* <hr className="border-gray-300 my-8" /> */}
        <div className='container mx-auto py-8 '>
            <TextSlider slides={slides} interval={5000} />
        </div>

        
    </div>
  )
}

export default Home