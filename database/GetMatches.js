import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export function getAllMatches() {
    return new Promise((resolve, reject) => {
        const pool = mysql2.createPool({
            host: 'localhost',
            user: process.env.VITE_USER,
            password: process.env.VITE_PASSWORD,
            database: 'lachy_league',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            port: 3308,  // Assuming you're using port 3308
        });

        // Query to select all entries from the matches table
        const query = `SELECT * FROM matches`;

        pool.query(query, (err, rows) => {
            if (err) {
                reject('Error fetching matches:', err);
            } else {
                resolve(rows);  // Resolve with the fetched rows
            }

            // Close the pool after the query is done
            pool.end();
        });
    });
}

export function getRounds(title) {
    return new Promise((resolve, reject) => {
        const pool = mysql2.createPool({
            host: 'localhost',
            user: process.env.VITE_USER,
            password: process.env.VITE_PASSWORD,
            database: 'lachy_league',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            port: 3308,  // Assuming you're using port 3308
        });

        // Query to select the rounds for the given competition title
        const query = `SELECT rounds FROM competition WHERE title = ?`;

        pool.query(query, [title], (err, rows) => {
            if (err) {
                reject('Error fetching rounds:', err);
                pool.end();
            } else {
                if (rows.length > 0) {
                    const rounds = rows[0].rounds; // Accessing the 'rounds' value from the first row
                    resolve(rounds);  // Resolve with the rounds value
                } else {
                    reject(`No competition found with title: ${title}`);
                }
                pool.end();
            }
        });
    });
}

export function getCompetitions() {
    return new Promise((resolve, reject) => {
        const pool = mysql2.createPool({
            host: 'localhost',
            user: process.env.VITE_USER,
            password: process.env.VITE_PASSWORD,
            database: 'lachy_league',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            port: 3308,  // Assuming you're using port 3308
        });

        // Query to select all entries from the matches table
        const query = `SELECT * FROM competition`;

        pool.query(query, (err, rows) => {
            if (err) {
                reject('Error fetching competitions:', err);
            } else {
                resolve(rows);  // Resolve with the fetched rows
            }

            // Close the pool after the query is done
            pool.end();
        });
    });
}