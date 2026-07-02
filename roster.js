// 1. getActivePlayers(players) — returns only the players where active is true. (Which method? Predict how many come back.)
// 2. getNames(players) — returns an array of just the names. (Predict the shape: array of strings, not objects.)
// 3. findPlayer(players, targetName) — returns the single player object whose name matches targetName. Takes two parameters. Call it with findPlayer(roster, "Gill"). (What comes back if the name doesn't exist? Predict, then test it with a fake name.)
// 4. addPlayer(players, newPlayer) — returns a new array with newPlayer added to the end, without mutating the original.
// 5. levelUp(players, targetName) — returns a new array where the matching player's level is increased by 1, everyone else unchanged, and nothing mutated.
// 6. getTopScorer(players) — returns the single player object with the highest score.

const roster = [
	{ name: "Lovish", level: 10, score: 50, active: true },
	{ name: "Abhi", level: 3, score: 20, active: false },
	{ name: "Gill", level: 7, score: 35, active: true },
	{ name: "Ada", level: 5, score: 60, active: true },
];

function getActivePlayers(players) {
	return players.filter((player) => player.active);
}

function getNames(players) {
	return players.map((player) => player.name);
}

function findPlayer(players, targetName) {
	return players.find((player) => player.name === targetName);
}

function addPlayer(players, newPlayer) {
	return [...players, newPlayer];
}

function levelUp(players, targetName) {
	return players.map((player) =>
		player.name === targetName
			? { ...player, level: player.level + 1 }
			: player,
	);
}

function getTopScorer(players) {
	if (players.length === 0) return null;
	// return [...players].sort((a,b)=>b.score-a.score)[0];
	return players.reduce((top, player) =>
		player.score > top.score ? player : top,
	);
}

console.log("getActivePlayers", getActivePlayers(roster));
console.log("getNames", getNames(roster));

const targetName = "Gill";
console.log("findPlayer", findPlayer(roster, targetName));

const newPlayer = {
	name: "Arjan",
	level: 6,
	score: 40,
	active: true,
};
console.log("addPlayer", addPlayer(roster, newPlayer));
console.log("originalAfterAddPlayer", roster);

console.log("levelUp", levelUp(roster, targetName));
console.log("getTopScorer", getTopScorer(roster));
