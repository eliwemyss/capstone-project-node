// var schedule = {
//   "url": "https://api.fantasydata.net/v3/cfb/stats/json/Games/2018?key=80dbc7beb0db44ad829b53b0193a5bf2",
//   "method": "GET",
// }



// $.ajax(schedule).done(function (response) {
//   console.log(response);
// });

// var teamInfo = {
// 	'url': 'https://api.fantasydata.net/v3/cfb/scores/JSON/LeagueHierarchy?key=80dbc7beb0db44ad829b53b0193a5bf2',
// 	'method': 'GET'
// }

// function getTeamInfo(data) {
// 	$.ajax({
// 		type: 'GET',
// 		'url': 'https://api.fantasydata.net/v3/cfb/scores/JSON/LeagueHierarchy?key=80dbc7beb0db44ad829b53b0193a5bf2',
// 		success: function(teams) {
// 			console.log(teams)
// 		} 
// 	})
// }


function getWeeklyMatchups(data) {
	var week = '';
	var selected = '';
	$('#week').change(function() {
		 selected = $(this).find('option:selected');
		 week = selected.val();
		console.log('changing value to: ', week)

		const WEEK_URL = `api/scores/week/${week}`;
		console.log(WEEK_URL)

		$.ajax({
		type: 'GET',
		url: WEEK_URL,
		success: function(data) {
		console.log(data)
			let gameData = displayMatchups(data)
			$('.score-form').html(gameData)	
		}
		})
	})
}


function displayMatchups(data) {
	var results = ''

	for(var i = 0; i < data.scores.length; i++) {
		results += `
		<span>${data.scores[i].AwayTeamName} </span><input type="text" name="score away" class="score-away">
		<span>${data.scores[i].HomeTeamName}</span><input type="text" name="score home" class="score-home">
		<button class="submit">Submit</button>
		`
		$('.score-form').submit(function(event) {
  event.preventDefault();
  const away = $('.score-away').val();
  $('.score-away').val('')
  const home = $('.score-home').val()
  $('.score-home').val('')

  $('.scores').append(
`<p>${data.scores[i].AwayTeamName} ${away} ${data.scores[i].HomeTeamName} ${home}</p>`)
});
	return results
	}
}



// function getGameData(data) {
// 	$.ajax({
// 		type: 'GET',
// 		url: '/api/scores',
// 		success: function(data) {
// 			console.log(data.scores)
		
// 		}
// 	});
// }


$(getWeeklyMatchups)