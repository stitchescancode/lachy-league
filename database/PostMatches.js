import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export function PostMatch(home, away, stadium) {
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

    const query = `INSERT INTO matches(home_team, away_team, status_of_game, stats, stadium) VALUES (?, ?, ?, ?, ?)`;

    const stats = JSON.stringify({
        'game_sets': 0,
        'team_a_total_sets': 0,
        'team_b_total_sets': 0,
        'team_a_completions': 0,
        'team_b_completions': 0,
        'team_a_errors': 0,
        'team_b_errors': 0,
        'team_a_penalties': 0,
        'team_b_penalties': 0
    });

    pool.query(query, [home, away, 0, stats, stadium], (err, results) => {
        if (err) {
            console.error('Error inserting match:', err);
        } else {
            console.log(`Match inserted: ${home} vs ${away} at ${stadium}`);
        }
        // Close the pool after query is done
        pool.end();
    });
}

export function AddCompetition(title) {
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

    const query = `INSERT INTO competition(title, rounds) VALUES (?, ?)`;

    pool.query(query, [title, 0], (err, results) => {
        if (err) {
            console.error('Error inserting match:', err);
        } else {
            console.log(`Competition inserted: ${title}`);
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

export function updateStats(stats, home, away) {
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
    const query = `UPDATE matches SET stats = ? WHERE home_team = ? AND away_team = ?`;

    const statsJSON = JSON.stringify(stats)

    pool.query(query, [statsJSON, home, away], (err, results) => {
        if (err) {
            console.error('Error updating match score:', err);
        } else {
            console.log(`Score updated for match: ${home} vs ${away}`);
        }
        pool.end();
    });
}

export function postAddRound(compName, data) {
    const pool = mysql2.createPool({
        host: 'localhost',
        user: process.env.VITE_USER,
        password: process.env.VITE_PASSWORD,
        database: 'lachy_league',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        port: 3308,
        multipleStatements: true
    });

    const query = `
        UPDATE competition SET rounds = rounds + 1 WHERE title = ?;
        SELECT rounds FROM competition WHERE title = ?;
        SELECT comp_id FROM competition WHERE title = ?;
    `;

    pool.query(query, [compName, compName, compName], (err, results) => {
        if (err) {
            console.error('Error updating match status:', err);
            pool.end();
            return;
        }

        // Process the results from the update and select queries
        const updatedRounds = results[1][0].rounds;
        const updatedCompetitionId = results[2][0].comp_id;

        console.log(`Rounds value updated for competition: ${compName}`);
        console.log(`Updated rounds: ${updatedRounds}, Competition ID: ${updatedCompetitionId}`);

        // JSON.stringify the data before inserting
        const jsonData = JSON.stringify(data); // Convert data object to JSON string

        // Now execute the insert query after the update is complete
        const storeQuery = `INSERT INTO round(competition_id, round_id, data) VALUES (?, ?, ?)`;
        pool.query(storeQuery, [updatedCompetitionId, updatedRounds, jsonData], (err, results) => {
            if (err) {
                console.error('Error inserting round: ', err);
            } else {
                console.log('Successfully inserted game.');
            }

            pool.end(); // Close the pool after the operation is complete
        });
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