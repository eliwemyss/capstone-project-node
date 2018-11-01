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
			if (data.scores.length != 0){
			let feedData = displayFeed(data);
			$('.scores-feed').html(feedData)
			$('.message').css('visibility', 'hidden')

		}
			else{
				$('.message').html('<p>No predictions for this week</p>')
				$('.table-results').css('visibility', 'hidden')
			}

		}
		})
	})
}

			
function displayFeed(data) {
	let feed = '';
	for(let i = 0; i < data.scores.length; i++) {
				feed +=`
					<tr class="table-results">
				      <td>${data.scores[i].AwayTeamName}</td>
				      <td>${data.scores[i].HomeTeamName}</td>
      				  <td>${data.scores[i].AwayTeamScore} - ${data.scores[i].HomeTeamScore}</td>
      				  <td>${data.scores[i].Week}</td>
      				  <td>${data.scores[i].username}</td>
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