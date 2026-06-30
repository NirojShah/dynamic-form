import { config_env } from "../../environment_setup.js";

config_env();

const buildPrompt = ({ query, formTemplate, responseExample }) => {
  return `
You are a MongoDB query generator.

Your task:
- Analyze the form template and understand the available fields.
- Analyze how responses are stored.
- Convert the user's request into a MongoDB filter object.

Rules:
- Return ONLY a valid JSON MongoDB query.
- Do NOT explain anything.
- Do NOT include collection name.
- Use "userResponse.<fieldName>" for matching fields.
- If the field is an array, use $in or $all when appropriate.
- Infer intent from the user query.

Form Template:
${JSON.stringify(formTemplate, null, 2)}

Response Structure Example:
${JSON.stringify(responseExample, null, 2)}

User Query:
${query}
`;
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

const processUserQuery = async ({ query, formTemplate, responseExample }) => {
  if (!query || typeof query !== "string") {
    throw new Error("A non-empty query string is required");
  }

  const prompt = buildPrompt({ query, formTemplate, responseExample });

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
    throw new Error(
      `Gemini API request failed (${response.status}): ${errorBody}`,
    );
  }

  const result = await response.json();
  const aiText =
    result?.candidates?.[0]?.content?.parts?.[0]?.text ||
    result?.text ||
    result?.candidates
      ?.map((candidate) =>
        candidate?.content?.parts?.map((part) => part?.text).join(""),
      )
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
