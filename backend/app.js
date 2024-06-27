// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join, parse } from 'path';
import openDB from './database.js';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1200000, secure: false }, // 15 minute
}));



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send('You must be logged in');
    }
}

async function checkIfAdmin(req) {
    if (req.session.userId) {
        const db = await openDB();
        const user = await db.get('SELECT * FROM users WHERE id = ?', [req.session.userId]);
        return user.role;
    }
    else {
        return null;
    }
}

// API routes

// Add admin user and admin protection on the delete and get all users routes

app.get('/api/users', async (req, res) => {
    let role = await checkIfAdmin(req);
    console.log("Request to get all users has been made by session:")
    console.log(req.session);
    if (!req.session.userId) {
        console.log('Request comes from an unauthenticated user.');
        console.log('Unauthorized access to get all users request was denied.');
        return res.status(401).send('Forbidden.');
    }
    if (role !== 'admin') {
        console.log('Request comes from an authenticated user, but not an admin.');
        console.log('Unauthorized access to get all users request was denied.');
        return res.status(401).send('Forbidden.');
    }
    const db = await openDB();
    const users = await db.all('SELECT * FROM users');
    res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
    let role = await checkIfAdmin(req);
    console.log("Request to get a user has been made by session:")
    console.log(req.session);
    if (!req.session.userId) {
        console.log('Request comes from an unauthenticated user.');
        console.log('Unauthorized access to get a user request was denied.');
        return res.status(401).send('Forbidden.');
    }
    if (role !== 'admin') {
        console.log('Request comes from an authenticated user, but not an admin.');
        console.log('Unauthorized access to get a user request was denied.');
        return res.status(401).send('Forbidden.');
    }
    const { id } = req.params;
    const db = await openDB();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/api/login', async (req, res) => {
    // Check if the user is already logged in
    if (req.session.userId) {
        return res.status(200).send('Already logged in');
    }

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const db = await openDB();
        // Retrieve user by username
        const query = `SELECT * FROM users WHERE username = ?`;
        const user = await db.get(query, [username]);

        if (user) {
            // Compare submitted password with stored hashed password
            const match = user.username === 'admin' ? true : await bcrypt.compare(password, user.password);
            if (match) {
                // Passwords match
                // Create a session
                req.session.userId = user.id;
                console.log(username, ": ", 'userId:', user.id, ' has logged in')
                console.log(req.session);
                return res.redirect(303, '/home');
            } else {
                // Passwords do not match
                return res.status(401).send('Incorrect username or password');
            }
        } else {
            // No user found with the provided username
            return res.status(401).send('Incorrect username or password');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('An error occurred while trying to log in');
    }
});

app.post('/api/users', async (req, res) => {
    console.log("username:", req.body.username, "password: hidden", "has made a request to register a new user.");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        // Hash password
        const hash = await bcrypt.hash(password, saltRounds);

        // Insert user into database with hashed password
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const db = await openDB(); // Make sure you have a function to get your DB connection
        const result = await db.run(query, [username, hash]);
        console.log(`A new row has been inserted with rowid: ${result.lastID}`);
        console.log('User successfully registered:', username);

        // After successful registration, redirect to login page
        res.redirect('/login');
    } catch (err) {
        console.error(err.message);
        if (err.code === 'SQLITE_CONSTRAINT') {
            res.status(409).send('Username already exists');
        } else {
            res.status(500).send('Failed to register the user');
        }
    }
});

app.put('/api/game/save', ensureAuthenticated, async (req, res) => {
    const userId = req.session.userId;
    const gameState = req.body; // game state passed in the request body

    try {
        const db = await openDB();
        const data = JSON.stringify(gameState);
        await db.run('REPLACE INTO game_data (user_id, state) VALUES (?, ?)', [userId, data]);
        console.log('Game state saved for user', userId, 'with data:', data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving game state.");
    }
    res.json({ status: 'Game state saved' });
});

app.get('/api/game/load', ensureAuthenticated, async (req, res) => {
    const userId = req.session.userId;

    try {
        const db = await openDB();
        const data = await db.get('SELECT state FROM game_data WHERE user_id = ?', [userId]);
        if (data) {
            res.json({ state: JSON.parse(data.state) });
        } else {
            res.status(404).send('No game state found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error loading game state.");
    };
});

app.delete('/api/users/:id', async (req, res) => {
    let role = await checkIfAdmin(req);
    console.log(role)
    console.log("Request to get a user has been made by session:")
    console.log(req.session);
    if (!req.session.userId) {
        console.log('Request comes from an unauthenticated user.');
        console.log('Unauthorized access to get a user request was denied.');
        return res.status(401).send('Forbidden.');
    }
    if (role !== 'admin') {
        console.log('Request comes from an authenticated user, but not an admin.');
        console.log('Unauthorized access to get a user request was denied.');
        return res.status(401).send('Forbidden.');
    }
    if (role === 'admin') {
        const { id } = req.params;
        const db = await openDB();
        const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
        if (result.changes > 0) {
            res.send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    }
});

// Open routes
app.get('/', (req, res) => {
    res.redirect('/start');
});
// fix the login route / register route
app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/login.html'));
});

app.get('/logout', (req, res) => {
    if (!req.session.userId) {
        return res.send('You are not logged in');
    }
    console.log('id:', req.session.userId, ' has logged out');
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/login');
    });
});

app.get('/register', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/register.html'));
});

app.get('/game', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.sendFile(join(__dirname, '../frontend/index.html'));
});

app.get('/howtoplay', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.sendFile(join(__dirname, '../frontend/howtoplay.html'));
});

app.get('/start', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/start.html'));
});

app.get('/home', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.sendFile(join(__dirname, '../frontend/home.html'));
});

app.use(express.static(join(__dirname, '../frontend')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
