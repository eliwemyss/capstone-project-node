
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
			"home_score": "31",
			"away_score": "34"
		},
		{
			"id": "333333",
			"home": "Florida",
			"away": "Kentucky",
			"home_score": "41",
			"away_score": "20"
		},
		{
			"id": "444444",
			"home": "Vanderbilt",
			"away": "Nevada",
			"home_score": "49",
			"away_score": "6"
		},
		{
			"id": "555555",
			"home": "Missouri",
			"away": "Wyoming",
			"home_score": "45",
			"away_score": "14"
		}
	]
};

function getScoreUpdates(callback) {
  setTimeout(function() {
    callback(MOCK_SCORE_DATA)
  }, 100)
}

function displayScores(data) {
	for (var i = 0; i < data.scores.length; i++) {
		$('.scores').append(
			`<p>${data.scores[i].away} ${data.scores[i].away_score} ${data.scores[i].home} ${data.scores[i].home_score}</p>
			`);
		console.log(data.scores[i])
	}
}

function getAndDisplayScores() {
	getScoreUpdates(displayScores);
}

$(function() {
$('.score-form').submit(function(event) {
  event.preventDefault();
  const away = $('.score-away').val();
  $('.score-away').val('')
  const home = $('.score-home').val()
  $('.score-home').val('')

  $('.scores').append(
`<p>Away ${away} Home ${home}</p>`)
  console.log(home)
});

	getAndDisplayScores();
})


