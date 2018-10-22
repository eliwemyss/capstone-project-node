
// function parseJwt(token) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace('-', '+').replace('_', '/');
//     return JSON.parse(window.atob(base64));
// }


function getToken() {
    const token = sessionStorage.getItem('token');
    if (!token) {
        return window.location.href = '/login.html';
    } return token;
}


function getWeeklyMatchups(data) {
	var week = '';
	var selected = '';
	const token = getToken();
	$('#week').change(function() {
		selected = $(this).find('option:selected');
		week = selected.val();
		console.log('changing value to: ', week)

		const WEEK_URL = `api/scores/week/${week}`;
		console.log(WEEK_URL)

		$.ajax({
		type: 'GET',
		url: WEEK_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		success: function(data) {
			// const payloadData = parseJwt(token);
			$('.username').html()
		console.log(data)
			let gameData = weekDropdown(data)
			$('#matchup').html(gameData)
		}
		})
	})
}


function weekDropdown(data) {
	var results = '';
	for(var i = 0; data.scores.length > i; i++) {
		results += `
		<option value="${[i]}">${data.scores[i].AwayTeamName} vs ${data.scores[i].HomeTeamName}</option>
		`
	
	}
	return results

}

function selectedMatchup() {
	var matchup;
	var selected;
	const token = getToken();
	$('#matchup').on('change', function() {
		selected = $(this).find('option:selected');
		matchup = selected.text();
		teams = matchup.split('vs')

		let predictions = `	
		<div class="input-container">
		<form class="score-form">	
			<label>${teams[0]}</label><input type="text" name="score away" class="score-away">
			<label>${teams[1]}</label><input type="text" name="score home" class="score-home">

			<input type="hidden" name="away-team" class="away-team" value="${teams[0]}">
			<input type="hidden" name="home-team" class="home-team" value="${teams[1]}">
			<button class="submit">Submit</button>
		</form>
		</div>`

		$('.selected-scores').html(predictions)
		
	})
}

function postPrediction() {
	$('.selected-scores').on('submit', '.score-form', function(event) {
		event.preventDefault();
 		const away = $('.score-away').val();
  		$('.score-away').val('')
  		const home = $('.score-home').val()
  		$('.score-home').val('')

  		const awayTeam = $('.away-team').val();
  		const homeTeam = $('.home-team').val();

  		console.log(away)
  		$('.posted-scores').append(`<p>${awayTeam} ${away} ${homeTeam} ${home}`)

  		$.ajax({
  			type: 'POST',
  			data: {'AwayTeamName': '${awayTeam}', 'HomeTeamName': '${homeTeam}'},
  			url: '/api/scores',
  			success: function(predictions) {
  				console.log(predictions)
  			}

  		})
});
}

function getFeed() {
	var week = '';
	var selected = '';
	const token = getToken();
	$('#week-feed').change(function() {
		 selected = $(this).find('option:selected');
		 week = selected.val();
		const WEEK_URL = `api/scores/week/${week}`;
		console.log(WEEK_URL)

		$.ajax({
		type: 'GET',
		url: WEEK_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		success: function(data) {
			// const payloadData = parseJwt(token);
			$('.username').html()
		console.log(data)
			let gameData = weekDropdown(data)
			$('.feed-results').html(gameData)	
		}
		})
	})
}


function logout() {
    $('.logout').on('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    });
}



$(getToken);
$(postPrediction);
$(getFeed);
$(logout);
$(getWeeklyMatchups);
$(selectedMatchup);
