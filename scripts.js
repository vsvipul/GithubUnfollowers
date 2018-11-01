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
		console.log(followingarr);
		for (var i=0 ; i<followingarr.length ; i++){
			var f = 0;
			console.log(followingarr[i].login);
			for (var j=0 ; j<followarr.length ; j++){
				if (followingarr[i].login == followarr[j].login){
					f=1;
					break;
				}
			}
			if (f == 0){
				unfollow.push(followingarr[i].login);
			}
		}
		console.log(unfollow);
	});
});
