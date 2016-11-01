$(function(){
	$('.details').on('click', showDetails)
	$('.update').on('click', doUpdate)
	
	$('.likes').on('click', ShowLikes)
	$('.watch').on('click', watched)
	$('.movie_details').on('click', movieDetails)
	$('.logout').on('click', logout)
	$('.show_change_p').on('click', showCP)
	$('#deactivate').on('click', deactivate)

	$('.delete').on('click', function(){
		var url = $(this).attr('rel');
			function DecideDel() {
			var conDelete = confirm("do You realy want to delete this item?");
			if (conDelete) {
				doDelete(url)
			}
		}
		DecideDel()
	})

	function showDetails(e) {
		/*e.preventDefault()
		console.log(this);
		console.log($(this).attr('href'));
		$.ajax({
			url: 'movie/'+ $(this).attr('rel'),
			type:'GET'
		}).then(function(id){
			console.log(id);
		})*/
	}

	function doUpdate() {
		var url = $(this).attr('rel')
		var url3      = window.location.href;
		
		//console.log('jq put start'+url3);
		var data ={
			name: $('.ename').val(),
			plot: $('.eplot').val(),
			genere: $('.egenere').val(),
			year: $('.eyear').val()
		}
		console.log(data);
		$.ajax({
			url: url3,
			type:'put',
			data: data
		}).then(function(id){
			//console.log(id+ "successfully edited");
			window.location.replace("/movie");
			window.location.reload('')
		})
		return false;
	}



	function doDelete(url) {
		//var url = url
		console.log(url);
		$.ajax({
			url: url,
			type:'delete'
		}).then(function(id){
			//console.log(id+ "successfully edited");
			window.location.replace("/movie");
		})
		//return false;
	};
	function movieDetails(url) {
		var imdbID = $(this).attr('rel')
		console.log(imdbID);
		$.ajax({
			url: "https://www.omdbapi.com/?i="+imdbID+"&plot=short&r=json",
			type:'get'
		}).then(function(id){
			console.log(id);
			window.location.replace("/#/home/details");
		})
		//return false;
	};



	function ShowLikes() {
		var self = $(this)
		var url = $(this).attr('rel')
		//console.log(url);
		var data = {
			user: true
		}
		$.ajax({	
			data: data,	
			url: url,	
			type:'POST'
		}).then(function(id){
			//console.log(id);
			//
			self.css("background", 'red')
			//console.log(self);
			$(this).css('backrground', 'red')
			//window.location.replace("http://localhost:3000/movie");
		})
	}

	function watched() {

		var url = $(this).attr('rel')
		url = '/'+url
		console.log(url);
		var self = $(this)
		var data = {
			user: true
		}
		$.ajax({
			data: data,	
			url: url,	
			type:'POST'
		}).then(function(id){
			//console.log(id);
			//
			self.css("background", 'red')
			//console.log(self);
			$(this).css('backrground', 'red')
			//window.location.replace("http://localhost:3000/movie");
		})
	}


	function logout() {
		console.log('clickrd');
		$.ajax({
			url: '/user/logout',
			type: 'POST'
		}).then(function(data) {
			window.location.replace('/user/login')
		})
	}


	/*profile page*/
	$('.edit').on('click', taggleEdit);

	function taggleEdit() {
		$('#showEdit').toggleClass('hidden')
	}
	$('.updateUser').on('click', function() {
		var url = $(this).attr('rel');
		var name = $('.ename').val();
		var age = $('.eage').val();
		var position = $('.eposition').val();
		var avater = $('.avater').val();
		var data = {
			name:name,
			age: age,
			position: position,
			avater: avater
		}
		console.log(url);
		$.ajax({
			url: '/'+url,
			type: 'put',
			data: data
		}).then(function(data) {
			console.log(data);
			$('#showEdit').addClass('hidden');
			window.location.reload()
		},function(err) {
			console.log(err);
		})
		return false
	});

	function deactivate() {
		var self = $(this)
		var url = $(this).attr('rel')
		console.log(url);

		$.ajax({	
			url: '/'+url,	
			type:'delete'
		}).then(function(id){
			//console.log(id);
			
			window.location.replace("/user/login");
		})
	}

/* show chanege password dialog*/
	function showCP() {
		$('.cp').toggleClass('hidden')
	}

	$('.change_password').on('click', changePassword)

	function changePassword() {
		var oldP = $("input[name='old_password']").val()
		var newPassword = $("input[name='new_password']").val()
		var matchP = $("input[name='new_password2']").val()
		if (newPassword === matchP) {
			var data= {
				oldPassword: oldP,
				newPassword: newPassword
			}
			$.ajax({
				url: '/user/profile/changePassword',
				data: data,
				type: 'post'
			}).then(function(res) {
				console.log("getting response"+ res);
			})
		} else {
			console.log("password dont match");
		}
	}
})