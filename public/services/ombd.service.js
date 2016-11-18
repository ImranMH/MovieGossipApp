(function(){
	'use strict'
	angular
			.module('expariment')
			.factory('OmdbService', omdbService)

			//omdbService.$inject['$http'];
			
			function omdbService($http) {
				/*//var n1 = "http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json"
				 var token = '964c1664-abf7-4e67-91aa-4f0254da22aa';
			    //var searchByTitle ="http://www.myapifilms.com/imdb/idIMDB?title="+title+"&token="+token+"&format=json&language=en-us&filter=2&exactFilter=0&limit=3";
			    var detail_url ="http://www.myapifilms.com/imdb/idIMDB?title=TITLE&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=1&awards=0&moviePhotos=0&movieVideos=0&actors=2&biography=0&uniqueName=0&filmography=1&bornAndDead=0&starSign=0&actorActress=1&actorTrivia=0&similarMovies=1&adultSearch=0&goofs=0&quotes=0&fullSize=1";
			    var omUrl ="http://www.omdbapi.com/?s=TITLE&page=2";
			    var omdbID="http://www.omdbapi.com/?i=idIMDB&plot=short&r=json";
			    var DETAILS_URL = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";
			    http://www.myapifilms.com/imdb/idIMDB?title=avatar&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=1&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=1;
*/
				var service = {
					getMovieById: getMovieById,
					getMovieByTitle: getMovieByTitle,
					getMovieByImdbTitle: getMovieByImdbTitle,
					getMovieByImdbId: getMovieByImdbId,
				}
				return service;

				function getMovieById(id) {
					return $http.get("https://www.omdbapi.com/?i="+id+"&plot=short&r=json")
				}

				function getMovieByTitle(title) {					
					return $http.get("https://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json")
				}
				function getMovieByImdbTitle(title) {					
					return $http.get(" https://www.myapifilms.com/imdb/idIMDB?title="+title+"&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=1&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=1")
				}
				function getMovieByImdbId(id) {					
					return $http.get("http://www.myapifilms.com/imdb/idIMDB?idIMDB="+id+"&token=964c1664-abf7-4e67-91aa-4f0254da22aa&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=1&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=1")
				}

			}
			
}())