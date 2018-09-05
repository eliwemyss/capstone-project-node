var MOCK_SCORE_DATA = {
	"scores": [
		{
			"id": "111111",
			"home": "Tennessee",
			"away": "ETSU",
			"home_score": "63",
			"away_score": "7"
		},
		{
			"id": "222222",
			"home": "South Carolina",
			"away": "Georgia",
			"home_score": "34",
			"away_score": "27"
		},
		{
			"id": "333333",
			"home": "Florida",
			"away": "Kentucky",
			"home_score": "41",
			"away_score": "20"
		}
	]
};

function getScoreUpdates(callback) {
	setTimeout(function() {callback(MOCK_SCORE_DATA)}, 1);
}

function displayScores(data) {
	for (index in data.scores) {
		$('body').append(
			`<p>${data}</p>`);
		console.log(data.scores[index])
	}
}

function getAndDisplayScores() {
	getScoreUpdates(displayScores);
}

$(function() {
	getAndDisplayScores();
})