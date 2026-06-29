import AiApis from "../Ai API's/ai.api.service.js";

describe("AI service", () => {
  test("builds a prompt that includes the user query and serialized data", () => {
    const prompt = AiApis.buildPrompt({
      query: "Summarize this",
      data: { id: 1, name: "John" },
    });

    expect(prompt).toContain("Summarize this");
    expect(prompt).toContain("\"id\": 1");
    expect(prompt).toContain("John");
  });

  test("returns a helpful error when the API key is missing", async () => {
    const originalApiKey = process.env.GEMINI_API_KEY;
    const originalGoogleKey = process.env.GOOGLE_API_KEY;
    const originalLegacyKey = process.env.API_KEY;

    delete process.env.GEMINI_API_KEY;
    delete process.env.GOOGLE_API_KEY;
    delete process.env.API_KEY;

    await expect(AiApis.processUserQuery({ query: "Hello", data: {} })).rejects.toThrow(
      "Gemini API key is not configured",
    );

    if (originalApiKey) process.env.GEMINI_API_KEY = originalApiKey;
    if (originalGoogleKey) process.env.GOOGLE_API_KEY = originalGoogleKey;
    if (originalLegacyKey) process.env.API_KEY = originalLegacyKey;
  });
});
