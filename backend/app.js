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

/*app.post('/api/register', async (req, res) => {
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
            console.log(password);
            const result = await db.run(query, [username, password]);
            console.log(`A new row has been inserted with rowid ${result.lastID}`);
            res.send('User registered successfully');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Failed to register the user');
        }
    });
    res.redirect('/login');
});*/

app.post('/api/register', async (req, res) => {
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
        console.log(`A new row has been inserted with rowid ${result.lastID}`);

        // After successful registration, redirect to login page or send a success message
        // res.redirect('/login'); // Use this for redirect OR
        res.send('User registered successfully'); // Use this to send a response back
    } catch (err) {
        console.error(err.message);
        if (err.code === 'SQLITE_CONSTRAINT') {
            res.status(409).send('Username already exists');
        } else {
            res.status(500).send('Failed to register the user');
        }
    }
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const db = await openDB();
    try {
        // Retrieve user by username
        const query = `SELECT * FROM users WHERE username = ?`;
        const user = await db.get(query, [username]);

        if (user) {
            // Compare submitted password with stored hashed password
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                // Passwords match
                return res.redirect('/game');
                //return res.send('Login successful');
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

/*app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    console.log("unsaltedpassword: ", password);
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Failed to login the user');
        }
        console.log("salted: ", password);
        try {
            const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
            const result = await db.get(query, [username, password]);
            if (result) {
                console.log(`User logged in: `, result);
                res.send('User logged in successfully');
                return res.redirect('/game');
            } else {
                res.status(401).send('Username or password is incorrect');
            }
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Failed to login the user');
        }
    });
});
*/

// fix the login route / register route
app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/register.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/index.html'));
});



// Parse the data from the database into JSON
app.get('/api/users/', (req, res) => {
    const query = 'SELECT * FROM users';
    const result = db.run(query);
    res.json(result);
});

app.use(express.static('frontend'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
