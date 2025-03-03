import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export function PostMatch(home, away) {
    const pool = mysql2.createPool({
        host: 'localhost',
        user: process.env.VITE_USER,
        password: process.env.VITE_PASSWORD,
        database: 'lachy_league',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: 3308
    });

    const query = `INSERT INTO matches(home_team, away_team, status_of_game) VALUES (?, ?, ?)`;

    pool.query(query, [home, away, 0], (err, results) => {
        if (err) {
            console.error('Error inserting match:', err);
        } else {
            console.log(`Match inserted: ${home} vs ${away}`);
        }
        // Close the pool after query is done
        pool.end();
    });
}

export function updateMatchScore(home, away, homeScore, awayScore) {
    const pool = mysql2.createPool({
        host: 'localhost',
        user: process.env.VITE_USER,
        password: process.env.VITE_PASSWORD,
        database: 'lachy_league',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: 3308
    });

    // Assuming home_team and away_team are strings (team names), 
    // and home_score & away_score are numbers (scores).
    const query = `UPDATE matches SET home_team_score = ?, away_team_score = ? WHERE home_team = ? AND away_team = ?`;

    pool.query(query, [homeScore, awayScore, home, away], (err, results) => {
        if (err) {
            console.error('Error updating match score:', err);
        } else {
            console.log(`Score updated for match: ${home} vs ${away}`);
        }
        pool.end();
    });
}

export function updateMatchStatus(home, away, statusNumber) {
    const pool = mysql2.createPool({
        host: 'localhost',
        user: process.env.VITE_USER,
        password: process.env.VITE_PASSWORD,
        database: 'lachy_league',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: 3308
    });

    const query = `UPDATE matches SET status_of_game = ? WHERE home_team = ? AND away_team = ?`;

    pool.query(query, [statusNumber, home, away], (err, results) => {
        if (err) {
            console.error('Error updating match status:', err);
        } else {
            console.log(`Status updated for match: ${home} vs ${away}`);
        }
        pool.end();
    });
}