// server.js
import express from 'express';
import path from 'path';

const app = express();
const port = 3000;


app.use(express.static('frontend'));
app.use(express.json()); // To parse JSON bodies

app.post('/api/command', (req, res) => {
    const { command } = req.body;
    res.json({ message: `Command received: ${command}` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

