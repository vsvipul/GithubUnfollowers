$('#submit').on('click', function(e) {
	e.preventDefault();
	var user = $('#user').val();
	var requirel = 'https://api.github.com/users/' + user + '?access_token=ce6611d0531cedd5abb648ee06f447cc609d9700';
	var followl = 'https://api.github.com/users/' + user + '/followers?access_token=ce6611d0531cedd5abb648ee06f447cc609d9700&per_page=100';
	var followingl = 'https://api.github.com/users/' + user + '/following?access_token=ce6611d0531cedd5abb648ee06f447cc609d9700&per_page=100';
	var followarr = [];
	var followingarr = [];
	var unfollow = [];
	var followers = 0;
	var	following = 0;
	$.when(
		$.getJSON(requirel, function(json) {
			followers = json.followers;
			following = json.following;
		})
	).done(function() {
		var promises = [];
		for (let i = 1; i <= Math.ceil(followers / 100); i++) {
			promises.push($.getJSON(followl + '&page=' + i, function(json) {
				$.each(json, function(index, value) {
					followarr.push(value);
				});
			}));
		}
		for (let i = 1; i <= Math.ceil(following / 100); i++) {
			promises.push($.getJSON(followingl + '&page=' + i, function(json) {
				$.each(json, function(index, value) {
					followingarr.push(value);
				});
			}));
		}
		$.when.apply($, promises).then(function() {
			for (var i = 0; i < followingarr.length; i++) {
				var f = 0;
				for (var j = 0; j < followarr.length; j++) {
					if (followingarr[i].login == followarr[j].login) {
						f = 1;
						break;
					}
				}
				if (f == 0) {
					unfollow.push(followingarr[i]);
				}
			}
			$('#unfollowtable').empty();
			var html = '';
			for (var i = 0; i < unfollow.length; i++) {
				html += '<tr><td class="column1">' + unfollow[i].login + '</td><td class="column2"><a href="' + unfollow[i].html_url + '" target="_blank">' + unfollow[i].html_url + '</a></td></tr>';
			}
			$('#unfollowtable').append(html);
		});
	});
});
