import express from 'express';
import readline from 'readline';
import cors from 'cors';
import keypress from 'keypress';
import { PostMatch, updateMatchScore, updateMatchStatus, updateStats, AddCompetition, postAddRound } from './database/PostMatches.js';
import { getAllMatches, getCompetitions, getRounds } from './database/GetMatches.js';

let update_graphic_status;
let scoreboard_graphic_status;
let live_graphic_status;
let update_graphic_text;
let logo_graphic_status;
let statsStatus;
let statsText;
let tackle_count = 0;
let scorebug_status;
let fixtures_status;
let ultra_hd;
let statsTableStatus;
let bottomNextGameStatus;
let commentatorStatus;
let scoreboardStats;

let clock = false;
let clockSeconds = 2400;

let home_team_score = 0;
let away_team_score = 0;

let statusOfGame = 0;

let selectedMatch = {};
let fixturesTable = [];
let stats = {};

let commentatorTable = []

let bottomNextGameData = {};

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
    output: process.stdout,
    prompt: '> '
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
    "Accor Stadium", // Formerly ANZ Stadium & Stadium Australia
    "AAMI Park",
    "Allianz Stadium",
    "CommBank Stadium", // Formerly Bankwest Stadium
    "Coffs Harbour International Stadium",
    "CQU Stadium",
    "GIO Stadium",
    "Henson Park",
    "Suncorp Stadium",
    "TIO Stadium",
    "Leichhardt Oval",
    "Brookvale Oval",
    "McDonald Jones",
    "Glen Willow Stadium",
    "Netstrata Jubilee Stadium",
    "Scully Park",
    "Sunshine Coast Stadium",
    "Victoria Park",
    "Allegiant Stadium",
    "McDonalds Jones",
    "Go Media Stadium",
    "WIN Stadium",
    "QCB Stadium",
    "GIO Stadium",
    "Belmore Sports Ground"
];

const commentators = [
    { 'person': 'Yvonne Sampson', 'titles': ['Lachy League', 'Lachy League host', 'Lachy League presenter', 'Sports presenter', 'Commentator', 'NRL Host', 'NRL Presenter', 'Sports Commentator', 'Television Presenter', 'Sports Journalist', 'NRL Expert', 'Panelist', 'Television Persionality', 'Lachy Sports Presenter', 'Sportscaster'] },
    { 'person': 'Jake Duke', 'titles': ['Lachy League', 'Lachy League host', 'Lachy League presenter', 'Sports presenter', 'Commentator', 'NRL host', 'NRL presenter', 'Sports commentator', 'Television presenter', 'Sports journalist', 'Panelist', 'Lachy Sports presenter', 'Sportscaster'] },
    { 'person': 'Braith Anasta', 'titles': ['Lachy League', 'Lachy League host', 'Lachy League presenter', 'Sports presenter', 'Commentator', 'NRL host', 'NRL presenter', 'Sports commentator', 'Television presenter', 'Sports journalist', 'Panelist', 'Lachy Sports presenter', 'Sportscaster', '304 NRL Appearances', '2005 NRL Premiership Winner', '2008 Dally M Captain of the Year', 'NSW State of Origin Player', 'Australia International Representative'] },
    { 'person': 'Gordon Tallis', 'titles': ['Lachy League', 'Lachy League host', 'Lachy League presenter', 'Sports presenter', 'Commentator', 'NRL host', 'NRL presenter', 'Sports commentator', 'Television presenter', 'Sports journalist', 'Panelist', 'Lachy Sports presenter', 'Sportscaster', '227 NRL Appearances', '2000 NRL Premiership Winner', 'Queensland State of Origin Captain', 'Australia International Representative', '2001 Dally M Lock of the Year'] },
    { 'person': 'Matty Johns', 'titles': ['Lachy League', 'Lachy League host', 'Lachy League presenter', 'Sports presenter', 'Commentator', 'NRL host', 'NRL presenter', 'Sports commentator', 'Television presenter', 'Sports journalist', 'Panelist', 'Lachy Sports presenter', 'Sportscaster', '255 NRL Appearances', '1997 NRL Premiership Winner', 'NSW State of Origin Player', 'Australia International Representative', '2001 Dally M Five-Eighth of the Year'] },
    { 'person': 'Warren Smith', 'titles': ['Lachy League', 'Lachy League host', 'Lachy League presenter', 'Sports presenter', 'Commentator', 'NRL host', 'NRL presenter', 'Sports commentator', 'Television presenter', 'Sports journalist', 'Panelist', 'Lachy Sports presenter', 'Sportscaster'] }

]

let homeTeam, awayTeam;
let matches = []; // Array to store the current matches

let addMinus = false; // Initialize as boolean

rl.on('line', (input) => {
    if (inputLock || statsInputLock) return;

    if (input === '1') {
        update_graphic_status = !update_graphic_status;
        fixtures_status = false;
        console.log(`${getFormattedDate()}: Update graphic status set to ${update_graphic_status}`);
        console.log(`${getFormattedDate()}: Fixtures table status set to ${fixtures_status}`);
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
        fixtures_status = false;

        console.log(`${getFormattedDate()}: Update graphic status set to ${update_graphic_status}`);
        console.log(`${getFormattedDate()}: Scoreboard graphic status set to ${scoreboard_graphic_status}`);
        console.log(`${getFormattedDate()}: Logo graphic status set to ${logo_graphic_status}`);
        console.log(`${getFormattedDate()}: Stats status set to ${statsStatus}`);
        console.log(`${getFormattedDate()}: Scorebug status set to ${scorebug_status}`);
        console.log(`${getFormattedDate()}: Fixtures table status set to ${fixtures_status}`);
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
    } else if (input === 'y') {
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
    } else if (input === "14") {
        fixturesTableSelect()
    } else if (input === "13") {
        update_graphic_status = false;
        statsStatus = false;
        bottomNextGameStatus = false;
        fixtures_status = !fixtures_status;
        console.log(`${getFormattedDate()}: Fixtures table status set to ${fixtures_status}`);
    } else if (input === "16") {
        update_graphic_status = false;
        statsStatus = false;
        statsTableStatus = !statsTableStatus;
        console.log(`${getFormattedDate()}: Status table status set to ${statsTableStatus}`);
    } else if (input === '15') {
        ultra_hd = !ultra_hd;
        console.log(`${getFormattedDate()}: Ultra hd status set to ${ultra_hd}`);
    } else if (input === "17") {
        bottomGraphicSelect()
    } else if (input === "18") {
        bottomNextGameStatus = !bottomNextGameStatus
        fixtures_status = false;
        console.log(`${getFormattedDate()}: Bottom next game set to ${bottomNextGameStatus}`);
    } else if (input === "19") {
        update_graphic_status = false;
        statsStatus = false;
        bottomNextGameStatus = false;
        statsTableStatus = false;
        fixtures_status = false;
        commentatorStatus = !commentatorStatus;
        console.log(`${getFormattedDate()}: Commentator status set to ${commentatorStatus}`);
    } else if (input === "20") {
        commentatorTableFunction()
    } else if (input === "21") {
        createNewCompetition()
    } else if (input === "22") {
        addRound()
    } else if (input === "23") {
        scoreboardStats = !scoreboardStats
        console.log(`${getFormattedDate()}: Scoreboard stats set to ${scoreboardStats}`);
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
        if (tackle_count === 5) {
            rl.question('Enter gain or loss: ', (gain) => {
                let result = '';
                if (gain < 0) {
                    result = `${Math.abs(gain)}M LOSS`; // Ensure the loss is positive and displayed correctly
                } else {
                    result = `${gain}M GAIN`; // Show gain with "GAIN"
                }

                // Reset tackle count after 1.5 seconds
                setTimeout(() => {
                    tackle_count = 5; // Reset to 0, not 5, to start counting again
                }, 1500);
            });
        }
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
    } else if (key.name === 'a') {
        stats.team_a_total_sets += 1;
        stats.game_sets += 1;
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 'z') {
        stats.team_b_total_sets += 1;
        stats.game_sets += 1;
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 's') {
        stats.team_a_total_sets += 1;
        stats.team_a_completions += 1;
        stats.game_sets += 1;
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 'x') {
        stats.team_b_total_sets += 1;
        stats.team_b_completions += 1;
        stats.game_sets += 1;
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 'd') {
        stats.team_a_penalties += 1
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 'c') {
        stats.team_b_penalties += 1
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 'f') {
        stats.team_a_errors += 1
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === 'v') {
        stats.team_b_errors += 1
        updateStats(stats, selectedMatch.home_team, selectedMatch.away_team)
        console.log(stats)
    } else if (key.name === "o") {
        console.clear()
    }
});

async function commentatorTableFunction() {
    inputLock = true;
    console.log("1. Delete commentator | 2. Add commentator | 3. View commentators");

    rl.question('Choose an option: ', (option) => {
        inputLock = false;

        if (option === '1') {
            commentatorTable = [];
            console.log("Commentator table cleared.");
            rl.prompt();
        }

        if (option === '2') {
            commentators.map((commentator, index) => {
                console.log(`${index + 1}. ${commentator.person}`);
            });

            rl.question('Which commentator to add? (Enter index): ', (index) => {
                console.log(`You selected: ${commentators[parseInt(index) - 1].person}`);
                commentators[parseInt(index) - 1].titles.map((title, index) => {
                    console.log(`${index + 1}. ${title}`)
                })
                rl.question("Enter status: ", (status) => {
                    if (status === 0) {
                        commentatorTable.push({
                            'name': commentators[parseInt(index) - 1].person,
                            'title': '',
                            'showLabel': false
                        });
                        rl.prompt();
                    } else {
                        console.log(commentators[parseInt(index) - 1].titles[parseInt(status) - 1])
                        console.log('1. True | 2. False')
                        rl.question('Show title: ', (value) => {
                            if (value === '1') {
                                commentatorTable.push({
                                    'name': commentators[parseInt(index) - 1].person,
                                    'title': commentators[parseInt(index) - 1].titles[parseInt(status) - 1],
                                    'showLabel': true
                                });
                                rl.prompt();
                            } else {
                                commentatorTable.push({
                                    'name': commentators[parseInt(index) - 1].person,
                                    'title': commentators[parseInt(index) - 1].titles[parseInt(status) - 1],
                                    'showLabel': false
                                });
                                rl.prompt();
                            }
                        })
                    }
                })
            });
        }

        if (option === '3') {
            console.log("Current commentators:");
            commentatorTable.forEach(commentator => {
                console.log(commentator.name, '|', commentator.title);
            });
            rl.prompt();
        }
    });
}

async function createNewCompetition() {
    inputLock = true;
    rl.question('Enter the name of this competition: ', (name) => {
        inputLock = false;
        if (!name) {
            console.log('All options in this function are required.')
            return createNewCompetition()
        }

        AddCompetition(name)
    })
}

// Wrap rl.question in a Promise to allow using await
// Wrap rl.question in a Promise to allow using await
function questionPromise(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}

async function addRound() {
    const competitionsTable = await getCompetitions();
    const allMatches = await getAllMatches();
    let addGames = [];

    // Show all competitions
    competitionsTable.forEach((competition, index) => {
        console.log(`${getFormattedDate()}: ${index + 1}. ${competition.title}`);
    });

    // Get the competition selection from the user
    const indexValue = await questionPromise('What competition would you like to add a round to: ');

    const game = competitionsTable[indexValue - 1];

    if (!indexValue) {
        return addRound();
    }

    // Ask whether to add or view a round
    const viewIndex = await questionPromise("Add or view a round: ");

    if (!viewIndex) {
        return addRound();
    }

    if (viewIndex === '0') {
        console.log(`Name: ${game.title}`);
        allMatches.forEach((match, index) => {
            console.log(`${index + 1}. ${match.home_team} vs ${match.away_team}`);
        });

        // Function to ask for a game and add it
        async function askForGame(allMatches) {
            const gameIndex = await questionPromise('Add game index: ');
            const selectedGame = allMatches[parseInt(gameIndex - 1)];

            if (gameIndex === '') {
                postAddRound(game.title, addGames);
                rl.prompt();
                return;
            }

            addGames.push({ 'match_id': selectedGame.match_no });
            console.log(addGames);
            return askForGame(allMatches);
        }

        askForGame(allMatches);
    }

    // Find and display rounds if the user selects a round
    if (viewIndex === '1') {
        console.log("Finding rounds:");

        // Here we call the getRounds function directly to fetch the rounds
        try {
            const rounds = await getRounds(game.title); // Call getRounds directly here
            for (let i = 0; i < rounds; i++) {
                console.log(`[${i + 1}] Round ${i + 1}`);
            }
            rl.question('What round do you want to edit: ', (roundIndex) => {
                const index = parseInt(roundIndex - 1)
            })
        } catch (err) {
            console.error('Error fetching rounds:', err);
        }

        rl.prompt();
    }

    if (viewIndex > 1) {
        console.log('Invalid option. Please try again.')
        return addRound()
    }
}

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

            nrlStadiums.map((stadium, index) => {
                console.log(`${index + 1}. ${stadium}`)
            })
            rl.question('What stadium: ', (stadiumIndex) => {
                const stadium = nrlStadiums[parseInt(stadiumIndex - 1)]
                PostMatch(homeTeam, awayTeam, stadium);
                rl.prompt();
            })
        });
    });
}

async function bottomGraphicSelect() {
    const allMatches = await getAllMatches();
    allMatches.forEach((match, index) => {
        console.log(`${getFormattedDate()}: ${index + 1}. ${match.home_team} vs ${match.away_team}`);
    });

    rl.question('What game do you want to display: ', (input) => {
        const match = allMatches[input - 1]

        inputLock = true;
        rl.question("Enter kickoff time: ", (kickoff) => {
            inputLock = false;
            bottomNextGameData = {}
            bottomNextGameData = {
                'home_team': match.home_team.toLowerCase().replace(/\s+/g, '-'),
                'away_team': match.away_team.toLowerCase().replace(/\s+/g, '-'),
                'kickoff': kickoff
            }
            console.log(bottomNextGameData)
        })
        rl.prompt()
    })
}

async function fixturesTableSelect() {
    console.log("Select option: Remove matches | add match | view matches")
    const allMatches = await getAllMatches();
    rl.question('Remove or select game: ', (choice) => {
        const index = parseInt(choice)
        if (isNaN(index) || index < 1 || index > 3) {
            console.log(`${getFormattedDate()}: Invalid selection.`)
            return fixturesTableSelect()
        }

        if (index === 1) {
            fixturesTable = [];
            console.log("Reset fixture table data.")
            rl.prompt()
        }

        if (index === 2) {
            if (allMatches.length === 0) {
                console.log(`${getFormattedDate()}: No matches found. Please add a match first.`);
                return rl.prompt();
            }

            console.log('Select a game:');
            allMatches.forEach((match, index) => {
                console.log(`${getFormattedDate()}: ${index + 1}. ${match.home_team} vs ${match.away_team}`);
            });

            rl.question("Select match for table: ", (indexChoice) => {
                const gameIndex = parseInt(indexChoice) - 1;
                const selectedGame = allMatches[gameIndex];
                let status;

                nrlStadiums.forEach((stadium, index) => {
                    console.log(`${index}. ${stadium}`);
                });
                rl.question('Select game stadium: ', (stadiumIndex) => {
                    const stadiumIndexValue = parseInt(stadiumIndex)
                    const stadium = nrlStadiums[stadiumIndexValue]

                    if (selectedGame.stadium != '') { } else {
                        selectedGame.stadium = stadium;
                    }
                    inputLock = true
                    rl.question('What is the kickoff time for this selected match: ', (kickoff) => {
                        inputLock = false
                        selectedGame.kickoff = kickoff;

                        if (selectedGame.status_of_game === 0) {
                            status = `${kickoff} AEST - Live on Lachy League (CH ${process.env.VITE_CHANNEL_NUMBER})`
                        } else if (selectedGame.status_of_game === 1) {
                            status = '1st half'
                        } else if (selectedGame.status_of_game === 2) {
                            status = 'Half time'
                        } else if (selectedGame.status_of_game === 3) {
                            status = '2nd half'
                        } else if (selectedGame.status_of_game === 4) {
                            status = 'Full time'
                        }

                        selectedGame.status = status;

                        fixturesTable.push(selectedGame);
                        console.log(fixturesTable)
                        rl.prompt()
                    })
                })
            })
        }

        if (index === 3) {
            console.log(fixturesTable)
            rl.prompt()
        }
    })
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

            console.log(selectedGame)

            let statsData = {};

            try {
                statsData = JSON.parse(selectedGame.stats);
            } catch (error) {
                console.error("Error parsing stats string:", error);
            }

            stats.game_sets = statsData.game_sets || 0;
            stats.team_a_total_sets = statsData.team_a_total_sets || 0;
            stats.team_b_total_sets = statsData.team_b_total_sets || 0;
            stats.team_a_completions = statsData.team_a_completions || 0;
            stats.team_b_completions = statsData.team_b_completions || 0;
            stats.team_a_errors = statsData.team_a_errors || 0;
            stats.team_b_errors = statsData.team_b_errors || 0;
            stats.team_a_penalties = statsData.team_a_penalties || 0;
            stats.team_b_penalties = statsData.team_b_penalties || 0;

            console.log(stats)

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
            scorebug_status,
            fixturesTable,
            fixtures_status,
            ultra_hd,
            stats,
            statsTableStatus,
            bottomNextGameData,
            bottomNextGameStatus,
            commentatorStatus,
            commentatorTable,
            scoreboardStats
        });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while fetching status.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});