import React from 'react';

function BecomeMember() {
  return (
    <div className="relative border-2 rounded-lg text-left p-4">
      <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/images/1675875729432.jfif')" , backgroundPosition: 'top'}}>
        {/* <div className="bg-black opacity-50 absolute inset-0"></div> */}
      </div>
      <div className="relative z-10 p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">How To Become A Member</h2>
        <p className="text-lg text-gray-200">Anyone who has completed one academic year as a student at IIT Ropar is eligible for life membership.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default BecomeMember;
