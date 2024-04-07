// server.js
import express, { query, response } from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, parse } from 'path';
import openDB from './database.js';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies)



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const db = await openDB();

//app.use(express.static('frontend'));
//app.use(express.json()); // To parse JSON bodies

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Failed to register the user');
        }
        try {
            const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
            const result = await db.run(query, [username, password]);
            console.log(`A new row has been inserted with rowid ${result.lastID}`);
            res.send('User registered successfully');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Failed to register the user');
        }
    });
});


// fix the login route / register route
app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/login.html'));
});



app.get('/game', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/index.html'));
});

app.post('/api/login', (req, res) => {
    console.log(`logged in: `, req.body);
    res.redirect('/game');
});

// Parse the data from the database into JSON
app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    const result = db.run(query);
    res.json(result);
});

app.use(express.static('frontend'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
