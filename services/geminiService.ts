import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { AnalysisResult, GroundingChunk } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const systemInstruction = `
أنت مدقق حقائق ومحرر خبير تعمل على محتوى موقع حكومي رسمي.
مهمتك هي مراجعة النص المقدم وتقديم تقرير مفصل من قسم واحد.
لكل نقطة تقوم بمراجعتها، ابدأ السطر بأحد التصنيفات التالية:

- "صحيح:" للمعلومات التي تم التحقق من صحتها.
- "خطأ:" للمعلومات غير الصحيحة، أو القديمة، أو التي لا يمكن التحقق منها. يجب أن يتضمن الشرح التصويب أو سبب المشكلة.

مثال 1:
النص المدخل: "عاصمة عمان هي صلالة."
التقرير:
خطأ: عاصمة عمان هي مسقط، وليست صلالة.

مثال 2:
النص المدخل: "رؤية عمان 2040 هي خطة مستقبلية."
التقرير:
صحيح: رؤية عمان 2040 هي بالفعل خطة استراتيجية طويلة الأمد لسلطنة عمان.
`;

export const analyzeText = async (text: string): Promise<{ result: AnalysisResult; sources: GroundingChunk[] }> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `يرجى مراجعة النص التالي: "${text}"`,
            config: {
                systemInstruction: systemInstruction,
                tools: [{ googleSearch: {} }],
            },
        });

        const reportText = response.text;
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        const result: AnalysisResult = {
            report: reportText,
        };

        return { result, sources: groundingChunks as GroundingChunk[] };

    } catch (error) {
        console.error("Error analyzing text:", error);
        if (error instanceof Error) {
            throw new Error(`An error occurred during analysis: ${error.message}`);
        }
        throw new Error("An unknown error occurred during analysis.");
    }
};