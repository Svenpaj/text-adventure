import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open a database connection
async function openDB() {
    return open({
        filename: './backend/database/myDB.sqlite',
        driver: sqlite3.Database
    });
}

async function setup() {
    const db = await openDB();
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await db.exec(`CREATE TABLE IF NOT EXISTS game_data (
        user_id INTEGER PRIMARY KEY,
        state TEXT NOT NULL,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Connected to the SQLite database.');
}

setup();

export default openDB;
