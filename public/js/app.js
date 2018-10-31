const user = sessionStorage.getItem('user');
const username = sessionStorage.getItem('username')

console.log(username)

let editId = ''

function getToken() {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
        return window.location.href = '/login.html';
    } return token;
}

function getUsername() {
	const username = sessionStorage.getItem('username')
	console.log(username)
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
		console.log(data)
			let gameData = weekDropdown(data)
			$('#matchup').html(gameData)
		}
		})
	})
}


function weekDropdown(data) {
	let results = '<option value selected="selected">Choose Matchup</option>';
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
	const token = getToken();
	$.ajax({
		type: 'GET',
		url: '/api/predictions',
		headers: {
			Authorization: `Bearer ${token}`
		},
		success: function(data) {
			// const payloadData = parseJwt(token);
			let userData = displayUserFeed(data);
			$('tbody').html(userData)
		}
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

  		const newPredction = {
  			AwayTeamName: `${awayTeam}`,
  			AwayTeamScore: `${away}`,
  			HomeTeamName: `${homeTeam}`,
  			HomeTeamScore: `${home}`,
  			Week: $('#week').val(),
  			user: user,
  			username: username

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
  				$('.user-post').append(`
					<tr>
				      <td>${data.AwayTeamName}</td>
				      <td>${data.HomeTeamName}</td>
      				  <td>${data.AwayTeamScore} - ${data.HomeTeamScore}</td>
      				  <td>${data.Week}</td>
      				  <td><a href="#" class="edit" data-id="${data.id}"><i class="fas fa-edit"></i></a> <a href="#" class="delete" data-id="${data.id}"><i class="fas fa-trash"></a></td>
    				</tr>
				`)
  			}

  		})
});
}




function displayUserFeed(data) {
	let userFeed = '';
	for(let i = 0; i < data.scores.length; i++) {
				userFeed +=`
					<tr>
				      <td>${data.scores[i].AwayTeamName}</td>
				      <td>${data.scores[i].HomeTeamName}</td>
      				  <td>${data.scores[i].AwayTeamScore} - ${data.scores[i].HomeTeamScore}</td>
      				  <td>${data.scores[i].Week}</td>
      				  <td><a href="#" class="edit" data-id="${data.scores[i].id}"><i class="fas fa-edit"></i></a> <a href="#" class="delete" data-id="${data.scores[i].id}"><i class="fas fa-trash"></i></a></td>
    				</tr>
				`
			}
			return userFeed
}

function deletePrediction() {
	$('.user-post').on('click', '.delete', function() {
		const token = getToken();
		const teamid = $(this).attr('data-id');
		console.log(teamid)
		$.ajax({
			url: `/api/predictions/${teamid}`,
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
			success: function(response) {
				window.location.href = '/main.html';
			},
			error: (err) => {
				console.log(err);
			}
		})
	})
}


function edit() {
	const editButton = $(this);
	const editId = $(this).attr('data-id');
	$('#dialog-form').dialog({
		width:600,
		open: function dialogOpened() {
			const formContext = $(this);
			const tr = editButton.closest('tr');
			const id = editId;
			$('.data').val(editId)
			const away = tr.find('td:nth-child(1)');
			const home = tr.find('td:nth-child(2)');
			const awayValue = away.text();
			const homeValue = home.text();
			formContext.find('.away').text(awayValue)
			formContext.find('.home').text(homeValue);
			
		},
		close: function () {
			$('#dialog-form form').off();
		}
	});
}


$('.score-table').on('click', '.edit', edit)

function logout() {
    $('.logout').on('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    });
}


function updateScore() {
	$('.dialog-form').on('click', '.update', function() {
 	})
	let token = getToken();
	let updateId = $('.data').val()
	console.log(updateId)
	let updatedScore = {
		AwayTeamName: $('.away').val(),
		HomeTeamName: $('.home').val(),
		AwayTeamScore: $('.newAway').val(),
		HomeTeamScore: $('.newHome').val()
	}
	$.ajax({
		type:'PUT',
		data: JSON.stringify(updatedScore),
		url: `/api/predictions/${updateId}`,
		headers: {
			'Content-Type': 'application/json',
  			'Authorization': `Bearer ${token}`
  		},
  		success: function() {

  		}

	})
}

$(getToken);
$(postPrediction);
$(getUserPredictions);
$(deletePrediction);
$(updateScore)
$(logout);
$(getWeeklyMatchups);
$(selectedMatchup);