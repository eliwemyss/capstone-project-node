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
			let gameData = displayMatchups(data)
			$('#matchup').html(gameData)	
		}
		})
	})
}


function displayMatchups(data) {
	var results = '';
	for(var i = 0; data.scores.length > i; i++) {
		results += `
		<option value ${[i]}><span>${data.scores[i].AwayTeamName} </span> vs <span>${data.scores[i].HomeTeamName}</span></option>
		`
	
	}
	return results
}

function selectedMatchup() {
	var matchup;
	var matchupSelected;
		$('#matchup').change(function() {
		 matchupSelected = $(this).find('option:selected');
		 matchup = matchupSelected.val();
		 console.log(matchup.text)

});
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

function logout() {
    $('.logout').on('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    });
}


// 		$('.score-form').submit(function(event) {
//   event.preventDefault();
//   const away = $('.score-away').val();
//   $('.score-away').val('')
//   const home = $('.score-home').val()
//   $('.score-home').val('')

//   $('.scores').append(
// `<p>${data.scores[i].AwayTeamName} ${away} ${data.scores[i].HomeTeamName} ${home}</p>`)
// });


$(getToken);
$(logout);
$(getWeeklyMatchups);
$(selectedMatchup)