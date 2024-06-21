import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';

// Open a database connection
async function openDB() {
    return open({
        filename: './backend/database/myDB.sqlite',
        driver: sqlite3.Database
    });
}

async function setup() {
    dotenv.config();
    let adminPassword = process.env.ADMIN_PASSWORD;
    const db = await openDB();
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await db.exec(`CREATE TABLE IF NOT EXISTS game_data (
        user_id INTEGER PRIMARY KEY,
        state TEXT NOT NULL,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await db.exec(`INSERT OR IGNORE INTO users (username, password, role) VALUES ('admin', '${adminPassword}', 'admin')`);

    console.log('Connected to the SQLite database.');
}

setup();

export default openDB;
