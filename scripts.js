$('#submit').on('click',function(e){
	e.preventDefault();
	var user = $('#user').val();
	var followl='https://api.github.com/users/'+ user +'/followers?per_page=100';
	var followingl='https://api.github.com/users/'+ user +'/following?per_page=100';
	var followarr = [];
	var followingarr = [];
	var unfollow = [];
	$.when(
		$.getJSON(followl, function(json){
			$.each(json,function(index,value){
				followarr.push(value);
			});
		}),
		$.getJSON(followingl, function(json){
			$.each(json,function(index,value){
				followingarr.push(value);
			});
		})
	).done(function(){
		for (var i=0 ; i<followingarr.length ; i++){
			var f = 0;
			for (var j=0 ; j<followarr.length ; j++){
				if (followingarr[i].login == followarr[j].login){
					f=1;
					break;
				}
			}
			if (f == 0){
				unfollow.push(followingarr[i]);
			}
		}
		console.log(unfollow);
		var html = '';
		for (var i=0 ; i<unfollow.length ; i++){
			html+='<tr><td class="column1">' + unfollow[i].login + '</td><td class="column2"><a href="' + unfollow[i].html_url  +'" target="_blank">' + unfollow[i].html_url + '</a></td></tr>';
		}
		$('#unfollowtable').append(html);
	});
});
