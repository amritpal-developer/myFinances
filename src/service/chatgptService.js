import axios from 'axios';

const API_KEY = 'wVxgUNCw3dHdOZnjX1p5fLSvJjK0DwjT'; // Replace with your OpenAI API key
const API_URL = 'https://api.mistral.ai/v1/chat/completions';

export const sendMessageToChatGPT = async (message) => {
  try {
    const response = await axios.post(
     API_URL,
      {
        model: "mistral-small-latest",
        messages: [{ role: "user", content: message}],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Together AI API Error:', error.response?.data || error.message);
    return 'Error: Unable to fetch response. Try again later.';
  }
};
