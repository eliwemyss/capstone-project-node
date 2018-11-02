const user = sessionStorage.getItem('user');
const username = sessionStorage.getItem('username')


let editId = ''

function getToken() {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
        return window.location.href = '/login.html';
    } return token;
}

function getUsername() {
	const username = sessionStorage.getItem('username')

}

function getWeeklyMatchups(data) {
	let week = '';
	let selected = '';
	const token = getToken();
	$('#week').change(function() {
		selected = $(this).find('option:selected');
		week = selected.val();

		const WEEK_URL = `api/scores/week/${week}`;


		$.ajax({
		type: 'GET',
		url: WEEK_URL,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		success: function(data) {
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
		<form class="score-form">	
			<label>${teams[0]}</label><input type="number" name="score away" class="score-away">
			<label>${teams[1]}</label><input type="number" name="score home" class="score-home">
			<input type="hidden" name="away-team" class="away-team" value="${teams[0]}">
			<input type="hidden" name="home-team" class="home-team" value="${teams[1]}">
			<button class="submit">Submit</button>
		</form>`

		$('.selected-container').html(predictions)
		
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
			let userData = displayUserFeed(data);
			$('tbody').html(userData)
		}
	})
}


function postPrediction() {
	$('.selected-container').on('submit', '.score-form', function(event) {
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
				alert('There was an error deleting your prediction...')
			}
		})
	})
}


function edit() {
	const editButton = $(this);
	const editId = $(this).attr('data-id');
	$('#dialog-form').dialog({
		width: 'auto',
		maxWidth: 600,
		fluid: true,

		open: function dialogOpened() {
			const formContext = $(this);
			const tr = editButton.closest('tr');
			const id = $('input[name=edit]').val(editId)
			const away = tr.find('td:nth-child(1)');
			const home = tr.find('td:nth-child(2)');
			const awayValue = away.text();
			const homeValue = home.text();
			formContext.find('.uAway').text(awayValue)
			formContext.find('.uHome').text(homeValue);
			
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
	let token = getToken();
	let updateId = $('input[name=edit]').val();
	let scoreAway = $('.newAway').val();
	let scoreHome = $('.newHome').val();

	const updatedScore = {
		AwayTeamScore: `${scoreAway}`,
		HomeTeamScore: `${scoreHome}`
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
  			window.location.href = '/main.html'
  		}
  	})
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