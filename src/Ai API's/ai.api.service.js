import { config_env } from "../../environment_setup.js";

config_env();

const buildPrompt = ({ query, data }) => {
  const serializedData =
    typeof data === "string" ? data : JSON.stringify(data, null, 2);

  return [
    "You are a helpful assistant.",
    "Use the provided data when it helps answer the user's request.",
    "",
    "User query:",
    query,
    "",
    "Data:",
    serializedData,
  ].join("\n");
};

const getApiKey = () => {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API key is not configured");
  }

  return apiKey;
};

const processUserQuery = async ({ query, data }) => {
  if (!query || typeof query !== "string") {
    throw new Error("A non-empty query string is required");
  }

  const prompt = buildPrompt({ query, data });
  const apiKey = getApiKey();
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Gemini API request failed (${response.status}): ${errorBody}`);
  }

  const result = await response.json();
  const aiText =
    result?.candidates?.[0]?.content?.parts?.[0]?.text ||
    result?.text ||
    result?.candidates
      ?.map((candidate) => candidate?.content?.parts?.map((part) => part?.text).join(""))
      .join("") ||
    "";

  if (!aiText) {
    throw new Error("No response received from Gemini API");
  }

  return {
    success: true,
    data: aiText,
  };
};

const AiApis = {
  processUserQuery,
  buildPrompt,
};

export default AiApis;