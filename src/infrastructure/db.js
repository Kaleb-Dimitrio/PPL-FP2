const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, '../../data/database.sqlite');
console.log('Database path:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS admins (
        username TEXT PRIMARY KEY,
        password TEXT NOT NULL
    )`);

    // Hashing password for default admin
    const saltRounds = 10;
    const defaultPassword = 'password';
    bcrypt.hash(defaultPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
        } else {
            db.run(`INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)`, ['admin', hashedPassword]);
        }
    });
});

module.exports = db;
