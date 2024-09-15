// ErrorComponent.js
import React from 'react';

const ErrorComponent = () => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded relative">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">Try again later, we have reached the API limit</span>
    </div>
  );
};

export default ErrorComponent;
