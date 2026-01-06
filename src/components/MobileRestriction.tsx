import React from 'react';

const MobileRestriction = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center p-4 text-center md:hidden">
      <h1 className="text-3xl font-bold mb-4">Go to desktop.</h1>
      <p className="text-2xl">
        I don't have time for mobile <br /> responsiveness. I have a life.
      </p>
    </div>
  );
};

export default MobileRestriction;
