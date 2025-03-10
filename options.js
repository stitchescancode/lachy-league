export function calculatePossessionRates(teamA, TeamB, totalSets) {
    const teamAPossessionRate = totalSets === 0 ? 0 : Math.round((teamA / totalSets) * 100);
    const teamBPossessionRate = totalSets === 0 ? 0 : Math.round((TeamB / totalSets) * 100);

    return {
        teamA: teamAPossessionRate,
        teamB: teamBPossessionRate
    };

}

export function calculateWinVis(totalSets, teamATotalSets, teamBTotalSets, teamAScore, teamBScore, teamACompletedSets, teamBCompletedSets) {
    const teamAPossessionRate = teamACompletedSets / totalSets;
    const teamBPossessionRate = teamBCompletedSets / totalSets;

    // Using score instead of tries
    const teamAAverageTimeBetweenScores = teamATotalSets / teamAScore;
    const teamBAverageTimeBetweenScores = teamBTotalSets / teamBScore;

    // No need to adjust by secondsLeft anymore
    const teamAWinVis = teamAPossessionRate / teamAAverageTimeBetweenScores;
    const teamBWinVis = teamBPossessionRate / teamBAverageTimeBetweenScores;

    const totalWinVis = teamAWinVis + teamBWinVis;

    const teamAChanceOfWinning = (teamAWinVis / totalWinVis) * 100;
    const teamBChanceOfWinning = (teamBWinVis / totalWinVis) * 100;

    return {
        teamA: Math.round(teamAChanceOfWinning),
        teamB: Math.round(teamBChanceOfWinning)
    };
}