import express from 'express';
import readline from 'readline';
import cors from 'cors';
import keypress from 'keypress';
import { PostMatch, updateMatchScore, updateMatchStatus } from './database/PostMatches.js';
import getAllMatches from './database/GetMatches.js';

let update_graphic_status;
let scoreboard_graphic_status;
let live_graphic_status;
let update_graphic_text;
let logo_graphic_status;
let statsStatus;
let statsText;
let tackle_count = 0;
let scorebug_status;

let clock = false;
let clockSeconds = 2400;

let home_team_score = 0;
let away_team_score = 0;

let statusOfGame = 0;

let selectedMatch = {};

let inputLock = false;
let statsInputLock = false;

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
}));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.input.setRawMode(true);
rl.input.resume();

function getFormattedDate() {
    const now = new Date();

    // Get the day, month, year, hours, minutes, seconds
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are zero-based, so we add 1
    const year = now.getFullYear() % 100; // Get the last two digits of the year
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Determine AM/PM
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours from 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Add leading zero if necessary for day, month, hours, minutes, and seconds
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Return the formatted date
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
}


// NRL team list with the Dolphins
const nrlTeams = [
    'Sydney Roosters', 'Melbourne Storm', 'Canberra Raiders', 'Cronulla Sharks',
    'South Sydney Rabbitohs', 'Penrith Panthers', 'Manly Warringah Sea Eagles',
    'Gold Coast Titans', 'Parramatta Eels', 'Newcastle Knights',
    'North Queensland Cowboys', 'Wests Tigers', 'St George Illawarra Dragons',
    'Dolphins', 'New Zealand Warriors', 'Canterbury-Bankstown Bulldogs', 'Brisbane Broncos',
    "Wigan Warriors", "Warrington Wolves", "Australia Jillaroos", "England Lionesses"
];

const nrlStadiums = [
    "Accor Stadium, Sydney", // Formerly ANZ Stadium
    "AAMI Park, Melbourne",
    "Allianz Stadium, Sydney",
    "CommBank Stadium, Parramatta", // Formerly Bankwest Stadium
    "Coffs Harbour International Stadium, Coffs Harbour",
    "CQU Stadium, Rockhampton",
    "GIO Stadium, Canberra",
    "Henson Park, Sydney",
    "Indigenous Round at Optus Stadium, Perth",
    "Suncorp Stadium, Brisbane",
    "TIO Stadium, Darwin",
    "Leichhardt Oval, Sydney",
    "Brookvale Oval, Sydney",
    "McDonald Jones Stadium, Newcastle",
    "Glen Willow Stadium, Mudgee",
    "Netstrata Jubilee Stadium, Sydney",
    "Scully Park, Tamworth",
    "Stadium Australia, Sydney",
    "Sunshine Coast Stadium, Sunshine Coast",
    "Victoria Park, Mackay",
    "Allegiant Stadium, Las Vegas" // For Las Vegas NRL game
];

let homeTeam, awayTeam;
let matches = []; // Array to store the current matches

let addMinus = false; // Initialize as boolean

rl.on('line', (input) => {
    if (inputLock || statsInputLock) return;

    if (input === '1') {
        update_graphic_status = !update_graphic_status;
        console.log(`${getFormattedDate()}: Update graphic status set to ${update_graphic_status}`);
    } else if (input === '2') {
        scoreboard_graphic_status = !scoreboard_graphic_status;
        console.log(`${getFormattedDate()}: Scoreboard graphic status set to ${scoreboard_graphic_status}`);
        scorebug_status = false;
    } else if (input === '3') {
        live_graphic_status = !live_graphic_status;
        console.log(`${getFormattedDate()}: Live graphic status set to ${live_graphic_status}`);
    } else if (input === '4') {
        inputLock = true;
        rl.question('Please enter your text: ', (answer) => {
            console.log(`${getFormattedDate()} You entered: ${answer}`);
            update_graphic_text = answer;
            inputLock = false;
            rl.prompt();
        });
    } else if (input === '8') {
        statsInputLock = true;
        rl.question(`${getFormattedDate()}: Please enter your text: `, (answer) => {
            console.log(`${getFormattedDate()}: You entered: ${answer}`);
            statsText = answer;
            statsInputLock = false;
            rl.prompt();
        });
    } else if (input === '7') {
        statsStatus = !statsStatus;
        console.log(`${getFormattedDate()}: Stats status set to ${statsStatus}`);
    } else if (input === '5') {
        update_graphic_status = false;
        scoreboard_graphic_status = false;
        logo_graphic_status = false;
        statsStatus = false;
        scorebug_status = false;

        console.log(`${getFormattedDate()}: Update graphic status set to ${update_graphic_status}`);
        console.log(`${getFormattedDate()}: Scoreboard graphic status set to ${scoreboard_graphic_status}`);
        console.log(`${getFormattedDate()}: Logo graphic status set to ${logo_graphic_status}`);
        console.log(`${getFormattedDate()}: Stats status set to ${statsStatus}`);
        console.log(`${getFormattedDate()}: Scorebug status set to ${scorebug_status}`);
    } else if (input === '6') {
        logo_graphic_status = !logo_graphic_status;
        console.log(`${getFormattedDate()}: Logo graphic status set to ${logo_graphic_status}`);
    } else if (input === '9') {
        selectTeams();
    } else if (input === '10') {
        selectGame();
    } else if (input === '12') {
        scoreboard_graphic_status = false;
        scorebug_status = !scorebug_status;
        console.log(`${getFormattedDate()}: Scorebug graphic status set to ${scorebug_status}`);
    } else if (input === '+') {
        statusOfGame += 1;
        if (isNaN(statusOfGame)) {
            statusOfGame = 0 + 1;  // Default to 0 if NaN
        }
        updateMatchStatus(selectedMatch.home_team, selectedMatch.away_team, statusOfGame);
    } else if (input === '-') {
        statusOfGame -= 1;
        if (isNaN(statusOfGame)) {
            statusOfGame = 0;  // Default to 0 if NaN
        }
        updateMatchStatus(selectedMatch.home_team, selectedMatch.away_team, statusOfGame);
    } else if (input === 'a') {
        addMinus = !addMinus; // Toggle the value of addMinus
        console.log(`${getFormattedDate()}: ${addMinus}`); // Log the current value of addMinus
    } else if (input === '}') {
        clock = !clock;
        console.log(`${getFormattedDate()}: Clock toggle is set to ${clock}`);

        // Start the countdown if the clock is enabled
        if (clock) {
            startClockCountdown();
        }
    } else if (input === '{') {
        selectTime()
    } else if (input === "11") {
        selectDataForUpcomingGraphic()
    } else if (input === "1+7") {
        update_graphic_status = !update_graphic_status;
        statsStatus = !statsStatus;
        console.log(`${getFormattedDate()}: Update graphic status set to ${update_graphic_status}`);
        console.log(`${getFormattedDate()}: Stats status set to ${statsStatus}`);
    } else if (input === "?") {
        clockSeconds = 2400;
        console.log(`${getFormattedDate()}: Reset clock to ${clockSeconds}`);
    } else {
        console.log(`${getFormattedDate()}: Invalid option. Please try again.`);
        rl.prompt();
    }
});

function selectDataForUpcomingGraphic() {
    const askHomeTeam = () => {
        console.log('Select home team:');
        nrlTeams.forEach((team, index) => {
            console.log(`${index + 1}. ${team}`);
        });

        rl.question('Enter the number for home team: ', (homeChoice) => {
            const homeIndex = parseInt(homeChoice) - 1;
            if (isNaN(homeIndex) || homeIndex < 0 || homeIndex >= nrlTeams.length) {
                console.log('Invalid home team selection. Please try again.');
                return askHomeTeam(); // Restart if invalid
            }

            const homeTeam = nrlTeams[homeIndex];
            console.log(`Home team selected: ${homeTeam}`);
            askAwayTeam(homeTeam); // Proceed to Away Team selection
        });
    };

    const askAwayTeam = (homeTeam) => {
        console.log('Select away team:');
        nrlTeams.forEach((team, index) => {
            console.log(`${index + 1}. ${team}`);
        });

        rl.question('Enter the number for away team: ', (awayChoice) => {
            const awayIndex = parseInt(awayChoice) - 1;
            if (isNaN(awayIndex) || awayIndex < 0 || awayIndex >= nrlTeams.length || awayIndex === nrlTeams.indexOf(homeTeam)) {
                console.log('Invalid away team selection or same as home team. Please try again.');
                return askAwayTeam(homeTeam); // Restart if invalid
            }

            const awayTeam = nrlTeams[awayIndex];
            console.log(`Away team selected: ${awayTeam}`);
            askStadium(awayTeam); // Proceed to Stadium selection
        });
    };

    const askStadium = (awayTeam) => {
        console.log('Select stadium:');
        nrlStadiums.forEach((stadium, index) => {
            console.log(`${index + 1}. ${stadium}`);
        });

        rl.question('Enter the number for stadium: ', (stadiumChoice) => {
            const stadiumIndex = parseInt(stadiumChoice) - 1;
            if (isNaN(stadiumIndex) || stadiumIndex < 0 || stadiumIndex >= nrlStadiums.length) {
                console.log('Invalid stadium selection. Please try again.');
                return askStadium(awayTeam); // Restart if invalid
            }

            const selectedStadium = nrlStadiums[stadiumIndex];
            console.log(`Stadium selected: ${selectedStadium}`);
            askTime(selectedStadium); // Proceed to Time input
        });
    };

    const askTime = (selectedStadium) => {
        rl.question('Enter the Kickoff/Broadcast Time (24-hour format, e.g., 15:00): ', (inputTime) => {
            const timeParts = inputTime.split(':');
            let hours = parseInt(timeParts[0]);
            let minutes = parseInt(timeParts[1]);

            if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
                console.log('Invalid time format. Please enter a valid time in 24-hour format.');
                return askTime(selectedStadium); // Restart if invalid
            }

            let seconds = timeParts[2] ? parseInt(timeParts[2]) : 0;
            if (isNaN(seconds) || seconds < 0 || seconds > 59) {
                console.log('Invalid seconds format. Seconds should be between 0 and 59.');
                return askTime(selectedStadium); // Restart if invalid
            }

            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            console.log(`Selected Time: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`);

            rl.close(); // All selections complete, close the interface
        });
    };

    askHomeTeam(); // Start the process
}

// Function to start the clock countdown
function startClockCountdown() {
    const intervalId = setInterval(() => {
        if (!clock || clockSeconds <= 0) {
            clearInterval(intervalId);
            return;
        }
        clockSeconds -= 1;
    }, 1000);
}

// Format seconds into mm:ss format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

rl.input.on('keypress', (char, key) => {
    if (inputLock || statsInputLock) return;

    if (tackle_count === 'zero' || isNaN(tackle_count)) {
        tackle_count = 0;
    }

    if (key.name === 'end') {
        tackle_count = 0;
        console.log(tackle_count);
    } else if (key.name === 'up') {
        tackle_count += 1;
        console.log(tackle_count);
    } else if (key.name === 'down') {
        tackle_count -= 1;
        console.log(tackle_count);
    } else if (key.name === 'delete') {
        tackle_count = 'zero';
        console.log(tackle_count);
    } else if (key.name === 'left') {
        if (addMinus === false) {
            home_team_score += 4;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        } else {
            home_team_score -= 4;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        }
    } else if (key.name === 'right') {
        if (addMinus === false) {
            away_team_score += 4;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        } else {
            away_team_score -= 4;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        }
    } else if (key.name === 'p') {
        if (addMinus === false) {
            home_team_score += 2;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        } else {
            home_team_score -= 2;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        }
    } else if (key.name === 'l') {
        if (addMinus === false) {
            away_team_score += 2;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        } else {
            away_team_score -= 2;
            console.log(`${getFormattedDate()}: $${homeTeam} ${home_team_score} : ${away_team_score} ${awayTeam}`);
            updateMatchScore(selectedMatch.home_team, selectedMatch.away_team, home_team_score, away_team_score);
        }
    }
});

function selectTime() {
    rl.question('Enter minutes: ', (minutesInput) => {
        const minutes = parseInt(minutesInput);
        if (isNaN(minutes) || minutes < 0) {
            console.log(`${getFormattedDate()}: Invalid input for minutes. Please enter a valid number.`);
            return selectTime(); // Recurse to re-ask for minutes
        }

        rl.question('Enter seconds: ', (secondsInput) => {
            const seconds = parseInt(secondsInput);
            if (isNaN(seconds) || seconds < 0 || seconds >= 60) {
                console.log(`${getFormattedDate()}: Invalid input for seconds. Please enter a valid number between 0 and 59.`);
                return selectTime(); // Recurse to re-ask for seconds
            }

            const totalSeconds = (minutes * 60) + seconds;
            clockSeconds = totalSeconds
            console.log(`${getFormattedDate()}: Total time in seconds: ${totalSeconds}`);
            rl.prompt();
        });
    });
}

function selectTeams() {
    console.log('Select home team:');
    nrlTeams.forEach((team, index) => {
        console.log(`${getFormattedDate()}: ${index + 1}. ${team}`);
    });

    rl.question('Enter the number for home team: ', (homeChoice) => {
        const homeIndex = parseInt(homeChoice) - 1;
        if (isNaN(homeIndex) || homeIndex < 0 || homeIndex >= nrlTeams.length) {
            console.log(`${getFormattedDate()}: Invalid home team selection. Please try again.`);
            return selectTeams(); // Recurse to re-ask for team selection
        }

        homeTeam = nrlTeams[homeIndex];
        console.log(`Home team selected: ${homeTeam}`);

        console.log('Select away team:');
        nrlTeams.forEach((team, index) => {
            console.log(`${index + 1}. ${team}`);
        });

        rl.question('Enter the number for away team: ', (awayChoice) => {
            const awayIndex = parseInt(awayChoice) - 1;
            if (isNaN(awayIndex) || awayIndex < 0 || awayIndex >= nrlTeams.length || awayIndex === homeIndex) {
                console.log(`${getFormattedDate()}: Invalid away team selection or same as home team. Please try again.`);
                return selectTeams(); // Recurse to re-ask for team selection
            }

            awayTeam = nrlTeams[awayIndex];
            console.log(`${getFormattedDate()}: Away team selected: ${awayTeam}`);

            // Post the match to the database and store in local matches array
            PostMatch(homeTeam, awayTeam);
            rl.prompt();
        });
    });
}

// Function to select a game from previously entered matches
async function selectGame() {
    try {
        // Fetch all matches from the database
        const allMatches = await getAllMatches();

        if (allMatches.length === 0) {
            console.log(`${getFormattedDate()}: No matches found. Please add a match first.`);
            return rl.prompt();
        }

        console.log('Select a game:');
        allMatches.forEach((match, index) => {
            console.log(`${getFormattedDate()}: ${index + 1}. ${match.home_team} vs ${match.away_team}`);
        });

        rl.question('Enter the number for the game: ', (gameChoice) => {
            const gameIndex = parseInt(gameChoice) - 1;
            if (isNaN(gameIndex) || gameIndex < 0 || gameIndex >= allMatches.length) {
                console.log(`${getFormattedDate()}: Invalid game selection. Please try again.`);
                return selectGame();  // Recurse to re-ask for game selection
            }

            const selectedGame = allMatches[gameIndex];
            console.log(`${getFormattedDate()}: Selected game: ${selectedGame.home_team} vs ${selectedGame.away_team}`);

            home_team_score = selectedGame.home_team_score;
            away_team_score = selectedGame.away_team_score;

            statusOfGame = selectedGame.status_of_game;
            selectedMatch = {
                home_team: selectedGame.home_team,
                away_team: selectedGame.away_team,
                home_team_score: selectedGame.home_team_score,
                away_team_score: selectedGame.away_team_score,
                status: 0
            };
            rl.prompt();
        });
    } catch (err) {
        console.log(`${getFormattedDate()}: Error fetching matches:', err`);
        rl.prompt();
    }
}

// Initial prompt
rl.setPrompt('Choose an option (1-10): ');
rl.prompt();

app.get('/toggle', (req, res) => {
    try {
        res.json({
            update_graphic_status,
            scoreboard_graphic_status,
            live_graphic_status,
            update_graphic_text,
            logo_graphic_status,
            selectedMatch,
            tackle_count,
            statusOfGame,
            home_team_score,
            away_team_score,
            statsStatus,
            statsText,
            clockSeconds,
            scorebug_status
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while fetching status.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});