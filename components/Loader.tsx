import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center p-4 mt-8" role="status" aria-live="polite">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            <p className="mr-4 text-lg text-gray-700 font-medium" dir="rtl">يتم التحليل الآن، يرجى الانتظار...</p>
        </div>
    );
};

export default Loader;