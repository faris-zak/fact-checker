export interface AnalysisResult {
    report: string; // The full markdown report from the AI
}

export interface GroundingChunk {
    web: {
        uri: string;
        title: string;
    };
}
