import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4" role="alert" dir="rtl">
            <p className="font-bold">حدث خطأ</p>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;