import React from 'react';

const PresentationStart: React.FC = () => {
  const handleStart = () => {
    // Logic to start the presentation
    console.log('Presentation started');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">Start Presentation</h2>
      <button onClick={handleStart} className="bg-blue-500 text-white p-2">Start</button>
    </div>
  );
};

export default PresentationStart;
