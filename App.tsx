import React, { useState } from 'react';
import Header from './components/Header';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import ResultDisplay from './components/ResultDisplay';
import { analyzeText } from './services/geminiService';
import { AnalysisResult, GroundingChunk } from './types';

const App: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!text.trim()) {
            setError("الرجاء إدخال نص للتحليل.");
            return;
        }
        setLoading(true);
        setError(null);
        setResult(null);
        setSources([]);

        try {
            const { result: analysisResult, sources: analysisSources } = await analyzeText(text);
            setResult(analysisResult);
            setSources(analysisSources);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("حدث خطأ غير متوقع.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col selection:bg-sky-200">
            <Header />
            <main className="container mx-auto px-4 py-12 flex-grow">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200" dir="rtl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-5">أدخل النص للمراجعة والتدقيق</h2>
                        <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-300 text-base text-gray-700 placeholder-gray-400 bg-sky-50"
                            rows={8}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="اكتب أو الصق النص هنا..."
                        ></textarea>
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="mt-5 w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 disabled:bg-sky-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>جاري التحليل...</span>
                                </>
                            ) : (
                                <>
                                    <span>تحليل النص</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>

                    {loading && <Loader />}
                    {error && <div className="mt-8"><ErrorMessage message={error} /></div>}
                    {result && <ResultDisplay result={result} sources={sources} />}
                </div>
            </main>
            <footer className="w-full bg-white border-t border-gray-200">
                <div className="container mx-auto text-center py-5 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} جميع الحقوق محفوظة </p>
                </div>
            </footer>
        </div>
    );
};

export default App;