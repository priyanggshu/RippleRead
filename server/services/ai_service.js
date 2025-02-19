import axios from "axios";

export const generateSummary = async (content) => {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            { inputs: content },
            { headers: {Authorization: `Bearer process.env.HUGGINGFACE_API_KEY`} },
        );
        return response.data[0]?.summary_text || "Summary generation failed.";
    } catch (error) {
        console.error("Error generating summary:", error.message);
        return "Summary unavailable.";   
    }
};