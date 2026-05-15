export interface DetectionResult {
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High' | 'Emergency';
  symptoms: string[];
  treatment: string[];
  prevention: string[];
  error?: string;
}

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/linkandzel/plant-disease-classification";

export async function detectDisease(image: File): Promise<DetectionResult> {
  const HF_TOKEN = process.env.NEXT_PUBLIC_HF_TOKEN;

  if (!HF_TOKEN || HF_TOKEN === 'your_token_here') {
    // Demo Mode for presentation
    await new Promise(r => setTimeout(r, 2000));
    return {
      diseaseName: "Tomato Early Blight",
      confidence: 94,
      ...getDiseaseInsights("Tomato Early Blight")
    };
  }

  const bytes = await image.arrayBuffer();

  const response = await fetch(HUGGING_FACE_API_URL, {
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/octet-stream",
    },
    method: "POST",
    body: bytes,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to detect disease');
  }

  const result = await response.json();
  const topResult = result[0];
  const diseaseName = topResult.label.replace(/_/g, ' ');
  const confidence = Math.round(topResult.score * 100);

  return {
    diseaseName,
    confidence,
    ...getDiseaseInsights(diseaseName)
  };
}

function getDiseaseInsights(disease: string) {
  const data: Record<string, any> = {
    "Tomato Early Blight": {
      severity: "High",
      symptoms: ["Small brown spots on older leaves", "Target-like concentric rings"],
      treatment: ["Apply Mancozeb fungicide", "Remove infected lower leaves"],
      prevention: ["Crop rotation", "Drip irrigation"]
    },
    "Healthy": {
      severity: "Low",
      symptoms: ["Green foliage", "No lesions"],
      treatment: ["Regular NPK fertilization"],
      prevention: ["Consistent watering"]
    }
  };

  return data[disease] || {
    severity: "Medium",
    symptoms: ["Discoloration detected"],
    treatment: ["Apply organic fungicide"],
    prevention: ["Ensure proper spacing"]
  };
}
