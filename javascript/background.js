var currentSong = null;

function showLyrics(lyricsBody){
	alert(lyricsBody);		
}

  chrome.extension.onConnect.addListener(function(port) {
    var tab = port.sender.tab;

    // This will get called by the content script we execute in
    // the tab as a result of the user pressing the browser action.
    port.onMessage.addListener(function(info) {
      if(info.song!= null && (info.status == "paused"  || info.status == "playing")){
	   currentSong = info.song.songName;
	   alert(currentSong);
	   getLyrics(info.song);
	}
      else {
	console.log("no song playing");
	}
    });
  });


function checkForValidUrl(tabId, changeInfo, tab) {
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('grooveshark') > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
	
  }
};



/**
	Initializes everything
*/

function init(){
	
	chrome.tabs.onUpdated.addListener(checkForValidUrl);
	chrome.pageAction.onClicked.addListener(function(){
		chrome.tabs.executeScript(null, {file: "javascript/contentscripts.js"})
	})
}



//Adding listener when body is loaded to call init function.
window.addEventListener('load', init, false);
