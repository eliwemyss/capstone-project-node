
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
		console.log('chosen matchup: ', matchup)
})
}




function logout() {
    $('.logout').on('click', () => {
        sessionStorage.removeItem('token');
        window.location.href = '/';
    });
}



$(getToken);
$(logout);
$(getWeeklyMatchups);
$(selectedMatchup);
