// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies)


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//app.use(express.static('frontend'));
//app.use(express.json()); // To parse JSON bodies

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/login.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/index.html'));
});

app.post('/api/login', (req, res) => {
    console.log(req.body);
    res.redirect('/game');
});

app.use(express.static('frontend'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

