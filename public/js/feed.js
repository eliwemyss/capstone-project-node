function getToken() {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
        return window.location.href = '/login.html';
    } return token;
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
			$('.scores-feed').html(feedData)


		}
		})
	})
}

			
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

$(getFeed);
$(logout);