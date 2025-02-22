const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Node.js backend is working!');
});

// Sample API endpoint
app.post('/send-data', (req, res) => {
  const { message } = req.body;
  console.log('Received from React Native:', message);
  res.json({ response: `Backend received: ${message}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
