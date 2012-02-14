var songJson =  null;
var songOn = false;
init();
function init(){

	GroovesharkProxy.setSongStatusCallback(function(){
		var songJson = this.getCurrentSongStatus();
		chrome.extension.connect().postMessage(songJson);	
	});


}





