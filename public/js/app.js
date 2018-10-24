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
	let week = '';
	let selected = '';
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
	let results = '';
	for(let i = 0; data.scores.length > i; i++) {
		results += `
		<option value="${[i]}">${data.scores[i].AwayTeamName} vs ${data.scores[i].HomeTeamName}</option>
		`
	
	}
	return results

}

function selectedMatchup() {
	let matchup;
	let selected;
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
};

function getUserPredictions() {

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

  		const newPredction = {
  			AwayTeamName: `${awayTeam}`,
  			AwayTeamScore: `${away}`,
  			HomeTeamName: `${homeTeam}`,
  			HomeTeamScore: `${home}`,
  			Week: $('#week').val()
  		};

  		$('.away-table').append(`${awayTeam}`)
  		$('.home-table').append(`${homeTeam}`)
  		$('.predicted-table').append(`${away} - ${home}`)
  		const token = getToken();
  		$.ajax({
  			type: 'POST',
  			data: JSON.stringify(newPredction),
  			url: '/api/predictions/',
  			headers: {
  				'Content-Type': 'application/json',
  				'Authorization': `Bearer ${token}`
  			},
  			success: function(data) {
  				console.log(data.AwayTeamName)
  				$('.user-post').append(`
					<tr>
				      <td>${data.AwayTeamName}</td>
				      <td>${data.HomeTeamName}</td>
      				  <td>${data.AwayTeamScore} - ${data.HomeTeamScore}</td>
    				</tr>
				`)
  			}

  		})
});
}


function getFeed() {
	let week = '';
	let selected = '';
	const token = getToken();
	$('#week-feed').change(function() {
		 selected = $(this).find('option:selected');
		 week = selected.val();
		const WEEK_URL = `api/predictions/week/${week}`;
		console.log(WEEK_URL)

		$.ajax({
		type: 'GET',
		url: WEEK_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		success: function(data) {
			console.log(data.scores[0].AwayTeamName)
			let feedData = displayFeed(data);
			$('tbody').html(feedData)


		}
		})
	})
}

// function displayPost(predictions) {

// 	console.log(predictions.scores[0])
// 	let userPost =`
// 					<tr>
// 				      <td>${predictions[0].AwayTeamName}</td>
// 				      <td>${predictions.scores[0].HomeTeamName}</td>
//       				  <td>${predictions.scores[0].AwayTeamScore} - ${predictions.scores[i].HomeTeamScore}</td>
//     				</tr>
// 				`
// 				return userPost
// 			}
			


function displayFeed(data) {
	let feed = '';
	for(let i = 0; i < data.scores.length; i++) {
				feed +=`
					<tr>
				      <td>${data.scores[i].AwayTeamName}</td>
				      <td>${data.scores[i].HomeTeamName}</td>
      				  <td>${data.scores[i].AwayTeamScore} - ${data.scores[i].HomeTeamScore}</td>
    				</tr>
				`
			}
			return feed
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