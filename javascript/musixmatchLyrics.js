var apiKey = "e8cacff505b86ec442f99cc37079770e";
var baseUrl = "http://api.musixmatch.com/ws/1.1/"
var songJson = null;

function getLyricBody(trackId){
	var xhr = new XMLHttpRequest();
	var url = baseUrl + "track.lyrics.get?apikey=" + apiKey + "&track_id=" + trackId;
	try {
		xhr.onreadystatechange = function(xhr){
						if(this.readyState != 4){
							return;
						}
						var response = JSON.parse(this.response);
						if(response.message.header.status_code == "200"){
							showLyrics(response.message.body.lyrics.lyrics_body);
						}	
					}
		xhr.onerror = function(error) {
			console.log('error: ' + error);
			};
	xhr.open('GET', url);
	xhr.setRequestHeader("Content-Type","text/plain")
	xhr.withCredentials = "false";
	xhr.send(null);
	}
	catch (e){
		console.log('ex: ' + e);		
	}	
}

function extractLyrics(xhr){
	return function(){
		if(xhr.readyState != 4){
			return;
		}
		var response = JSON.parse(xhr.response);
		if(response.message.header.status_code == "200" && response.message.header.available > 0){	
			var tracklist = response.message.body.track_list;
			var track = tracklist[0]; 
			var trackId = track.track.track_id;
			getLyricBody(trackId);
		}
		
	};	
}

function getSong(){
	var songName = songJson.songName;
	var songArtist = songJson.artistName;
	var songAlbum = songJson.albumName;
	var xhr = new XMLHttpRequest();
	var url = baseUrl + "track.search?apikey=" + apiKey + "&q_track=" + songName + "&q_artist=" + songArtist + "&f_has_lyrics=1";
	try {
		xhr.onreadystatechange = extractLyrics(xhr);
		xhr.onerror = function(error) {
			console.log('error: ' + error);
			};
	xhr.open('GET', url);
	xhr.setRequestHeader("Content-Type","text/plain")
	xhr.withCredentials = "false";
	xhr.send(null);
	}
	catch (e){
		console.log('ex: ' + e);		
	}
}



function getLyrics(songObject){
	songJson = songObject
	getSong();
}
