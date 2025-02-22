import axios from 'axios';

const API_KEY = '37c1618cf371c8685a355a17f42b1f806e9e60e07404de341a4ffa0d6bccabc3'; // Replace with your OpenAI API key
const API_URL = 'https://api.together.xyz/v1/chat/completions';

export const sendMessageToChatGPT = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'mistralai/Mistral-7B-Instruct',  // Free LLM model
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Together AI API Error:', error.response?.data || error.message);
    return 'Error: Unable to fetch response. Try again later.';
  }
};
