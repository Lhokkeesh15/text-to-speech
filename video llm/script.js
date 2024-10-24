document.addEventListener("DOMContentLoaded", () => {
  const textInput = document.getElementById("textInput");

  const generateBtn = document.getElementById("generateBtn");

  const loadingIndicator = document.getElementById("loadingIndicator");

  const audioContainer = document.getElementById("audioContainer");

  const outputAudio = document.getElementById("outputAudio");

  generateBtn.addEventListener("click", async () => {
    const text = textInput.value.trim();

    if (text === "") {
      alert("Please enter some text.");

      return;
    }

    loadingIndicator.classList.remove("hidden");

    generateBtn.disabled = true;

    try {
      const audioBlob = await textToSpeech(text);

      const audioUrl = URL.createObjectURL(audioBlob);

      outputAudio.src = audioUrl;

      loadingIndicator.classList.add("hidden");

      audioContainer.classList.remove("hidden");

      generateBtn.disabled = false;

      outputAudio.play();
    } catch (error) {
      console.error("Error generating audio:", error);

      alert("An error occurred while generating the audio. Please try again.");

      loadingIndicator.classList.add("hidden");

      generateBtn.disabled = false;
    }
  });

  async function textToSpeech(text) {
    console.log("Starting text-to-speech conversion");

    const url = `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`; // Changed back to the default voice

    const apiKey = "sk_1964030c3eade71ef43614a7ef71602568579fd8b068957c";

    try {
      const response = await fetch(url, {
        method: "POST",

        headers: {
          Accept: "audio/mpeg",

          "Content-Type": "application/json",

          "xi-api-key": apiKey,
        },

        body: JSON.stringify({
          text: text,

          model_id: "eleven_monolingual_v1",

          voice_settings: {
            stability: 0.5,

            similarity_boost: 0.5,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      console.log("Text-to-speech conversion successful");

      return await response.blob();
    } catch (error) {
      console.error("Error in text-to-speech conversion:", error);

      throw error;
    }
  }
});
