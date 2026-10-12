import { config_env } from "../../environment_setup.js";

const buildPrompt = ({ query, formTemplate, responseExample }) => {
  return `
You are an expert MongoDB query generator.

Your task is to convert a natural language request into a MongoDB query.

You must decide whether the request requires:

1. A MongoDB filter object (for db.collection.find())
OR
2. A MongoDB aggregation pipeline (for db.collection.aggregate())

==========================
OUTPUT FORMAT
==========================

Return ONLY valid JSON.

Do NOT use Markdown.
Do NOT use triple backticks.
Do NOT explain anything.
Do NOT include comments.
Do NOT include JavaScript.

The response MUST be one of the following:

For normal searches:

{
  "type": "find",
  "query": { ... }
}

For ranking, recommendation, sorting or scoring:

{
  "type": "aggregate",
  "pipeline": [ ... ]
}

==========================
FIELD RULES
==========================

Only use fields that exist in the provided form template.

Always reference fields like:

"userResponse.<field label>"

Examples:

"userResponse.First Name"
"userResponse.Last Name"
"userResponse.Gender"
"userResponse.Skills"
"userResponse.DOB"

Never invent fields.

Never invent option values.

==========================
MATCHING RULES
==========================

Text
- Use $regex with $options: "i"

Example:

{
  "userResponse.First Name": {
    "$regex": "john",
    "$options": "i"
  }
}

Select

Use equality.

Example

{
  "userResponse.Gender": "Female"
}

Checkbox / Multi Select

If ALL skills are requested

{
  "userResponse.Skills": {
    "$all": ["Node.js","React.js"]
  }
}

If ANY skills are requested

{
  "userResponse.Skills": {
    "$in": ["Node.js","React.js"]
  }
}

Dates

Generate valid MongoDB comparison operators.

==========================
WHEN TO USE AGGREGATE
==========================

If the request contains concepts like

- best
- top
- recommend
- highest
- lowest
- youngest
- oldest
- rank
- score
- most
- least

return

{
  "type":"aggregate",
  "pipeline":[...]
}

Examples

User:
best MERN candidate

Return:

{
  "type":"aggregate",
  "pipeline":[
    {
      "$addFields":{
        "score":{
          "$size":{
            "$setIntersection":[
              "$userResponse.Skills",
              [
                "Node.js",
                "React.js",
                "Mongo Db",
                "Express.js"
              ]
            ]
          }
        }
      }
    },
    {
      "$sort":{
        "score":-1
      }
    },
    {
      "$limit":1
    }
  ]
}

==========================
WHEN TO USE FIND
==========================

Examples

female candidates

{
  "type":"find",
  "query":{
    "userResponse.Gender":"Female"
  }
}

Node.js developers

{
  "type":"find",
  "query":{
    "userResponse.Skills":{
      "$in":["Node.js"]
    }
  }
}

Candidates having both Node.js and React.js

{
  "type":"find",
  "query":{
    "userResponse.Skills":{
      "$all":[
        "Node.js",
        "React.js"
      ]
    }
  }
}

==========================
FORM TEMPLATE
==========================

${JSON.stringify(formTemplate, null, 2)}

==========================
RESPONSE STRUCTURE
==========================

${JSON.stringify(responseExample, null, 2)}

==========================
USER QUERY
==========================

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
  const model = "gemini-2.5-flash";
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
  result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

if (!aiText) {
  throw new Error("No response received from Gemini API");
}

const parsedQuery = JSON.parse(aiText);

  return {
    success: true,
    data: parsedQuery,
  };
};

const AiApis = {
  processUserQuery,
  buildPrompt,
};

export default AiApis;
