import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// These variables are populated by your vite.config.ts
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeSiteImage = async (base64Image: string) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.1 }
    });

    const base64Data = base64Image.split(',')[1] || base64Image;

    const prompt = `Act as a senior lead for OLIK Demolishers. Provide a plain-text report.
            REPORT SECTIONS:
            SALVAGE VALUE: List materials.
            SAFETY HAZARDS: Note risks.
            PERSONNEL NEEDED: Estimate workers.
            ESTIMATED TIMELINE: Duration.
            FINAL VERDICT: Manual or mechanical.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    return response.text() || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Connection error. Contact Oliver.";
  }
};

export const autoTagImage = async (base64Image: string) => {
  try {
    const schema = {
      description: "Site analysis tags",
      type: SchemaType.OBJECT,
      properties: {
        title: { type: SchemaType.STRING },
        tag: { 
          type: SchemaType.STRING,
          description: "Must be exactly 'Demolition', 'Salvage', or 'Clearance'"
        }
      },
      required: ["title", "tag"]
    };

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const base64Data = base64Image.split(',')[1] || base64Image;

    const result = await model.generateContent([
      "Analyze this demolition site image. Suggest a short, professional title (max 5 words) and categorize it.",
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      }
    ]);

    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Auto-tagging error:", error);
    return { title: "New Project Entry", tag: "Demolition" };
  }
};