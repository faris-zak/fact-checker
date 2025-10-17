import React from 'react';

const Header = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4">
                 <div className="flex items-center justify-center gap-3">
                    <svg className="w-8 h-8 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
                    </svg>
                     <h1 className="text-3xl font-bold text-gray-800">مدقق الحقائق</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;