import React from 'react';
import { AnalysisResult, GroundingChunk } from '../types';

interface ResultDisplayProps {
    result: AnalysisResult;
    sources: GroundingChunk[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, sources }) => {

    const renderReport = (report: string) => {
        return report.split('\n').map((line, index) => {
            const trimmedLine = line.trim();
            if (trimmedLine.startsWith('صحيح:')) {
                return (
                    <div key={index} className="flex items-start py-4 border-r-4 border-green-500 pr-4 bg-green-50/50 rounded-r-lg">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">{trimmedLine.substring('صحيح:'.length).trim()}</p>
                    </div>
                );
            } else if (trimmedLine.startsWith('خطأ:')) {
                return (
                     <div key={index} className="flex items-start py-4 border-r-4 border-red-500 pr-4 bg-red-50/50 rounded-r-lg">
                         <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center mr-3">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">{trimmedLine.substring('خطأ:'.length).trim()}</p>
                    </div>
                );
            }
            return null; // تجاهل الأسطر الفارغة أو التي لا تحتوي على التصنيف المطلوب
        }).filter(Boolean); // إزالة العناصر الفارغة من المصفوفة
    };

    return (
        <div className="mt-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-200 text-right transition-opacity duration-500 ease-in-out" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-4">تقرير التحليل المفصل</h2>
            
            <div className="font-sans space-y-4">
                {renderReport(result.report)}
            </div>

            {sources && sources.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">المصادر المستخدمة</h3>
                    <ul className="space-y-3">
                        {sources.map((source, index) => (
                            <li key={index}>
                                <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="block p-4 border border-gray-200 rounded-lg hover:bg-sky-50 hover:border-sky-200 transition-colors duration-200 group">
                                    <p className="font-semibold text-gray-700 group-hover:text-gray-900">
                                        {source.web.title || "مصدر بدون عنوان"}
                                    </p>
                                    <p className="text-sm text-sky-600 truncate group-hover:underline">
                                        {source.web.uri}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ResultDisplay;