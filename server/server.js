import express from 'express';
import path from 'node:path';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


// Serve static files from the 'client' directory
app.use(express.static(path.resolve('client/')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/index.html'));
});

// app.get('/api', ...);
//create middleware function to get functionality from app.js file
app.post('/api/openai', async (req, res) => {
    console.log('Received request body: ', req.body); // More descriptive log
    const { model, messages } = req.body;
    if (!model || !messages) {
        console.error('Missing model or messages in the request');
        return res.status(400).json({ error: 'Missing model or messages in the request' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: model,
            messages: messages
        });
        console.log('OpenAI API Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
