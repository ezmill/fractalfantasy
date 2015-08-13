		
			var music = document.getElementById('music'); // id for audio element
			var duration; // Duration of audio clip
			var pButton = document.getElementById('pButton'); // play button

			var playhead = document.getElementById('playhead'); // playhead

			var timeline = document.getElementById('timeline'); // timeline
			var icons = document.getElementById('icons'); // timeline

			var volume = document.getElementById('volume'); // timeline
			var muteIcon = document.getElementById('mute'); // timeline
			var halfIcon = document.getElementById('half'); // timeline

			var volumeBar = document.getElementById('volumeBar'); // timeline
			var innerVolume = document.getElementById('innerVolume'); // timeline
			// timeline width adjusted for playhead
			var timelineWidth = window.innerWidth/* - playhead.offsetWidth;*/;
			var timelineHeight = 60/* - playhead.offsetWidth;*/;
			var volumeBarHeight = 120;
			var volumeAmt = 1.0;
			var volMult = 1.0;
			var muted = false;
		function initPlayer(data){


			if(data.showPlayPause == false){
				pButton.style.display = "none"
			} 
			// document.getElementById("title").innerHTML = data.artist + " &#8211; <span style='font-weight: normal;'>"+data.name+"</span>"
		}
		var counter = 0;
		// volume.addEventListener("click", function(event){

		// 		muteIcon.style.display = "block";	

		// 		volume.style.display = "none";	
		// 		console.log("volume icon")

		// 		muted = true;	
		// })	
		// muteIcon.addEventListener("click", function(event){
		// 		muteIcon.style.display = "none";	
		// 		volume.style.display = "block";	
		// 		console.log("mute icon")
		// 		muted = false;	
		// })	
		icons.addEventListener("click", function(event){
			if(counter%3 == 0){
				halfIcon.style.display = "block";	
				volume.style.display = "none";	
				muteIcon.style.display = "none";	
				volMult = 0.5;
			} else if (counter%3==1){
				halfIcon.style.display = "none";	
				volume.style.display = "none";	
				muteIcon.style.display = "block";	
				volMult = 0.0;
			} else if (counter%3 == 2){
				halfIcon.style.display = "none";	
				volume.style.display = "block";	
				muteIcon.style.display = "none";	
				volMult = 1.0;
			}
			counter++;
		})
		var onvolume = false;
		volumeBar.addEventListener("click", function(event){
			movevolumehead(event);
			music.volume = volumeAmt * volumeClickPercent(event);
		})	
		volumeBar.addEventListener("mousedown", function(event){
			onvolume = true;
			volumeBar.addEventListener('mousemove', movevolumehead, true);

		})	
		// timeupdate event listener
		music.addEventListener("timeupdate", timeUpdate, false);

		//Makes timeline clickable
		timeline.addEventListener("click", function (event) {
			moveplayhead(event);
			music.currentTime = duration * clickPercent(event);
		}, false);

		// returns click as decimal (.77) of the total timelineWidth
		function clickPercent(e) {
			return (e.pageX - timeline.offsetLeft) / timelineWidth;
		}

		function volumeClickPercent(e) {
			// console.log(e.pageY/window.innerHeight);
			// console.log(innerVolume.offsetTop);
			console.log("percent");
			return (((window.innerHeight - e.pageY) - timelineHeight)/volumeBarHeight);
		}

		// Makes playhead draggable 
		playhead.addEventListener('mousedown', mouseDown, false);
		window.addEventListener('mouseup', mouseUp, false);

		// Boolean value so that mouse is moved on mouseUp only when the playhead is released 
		var onplayhead = false;
		// mouseDown EventListener
		function mouseDown() {
			onplayhead = true;
			window.addEventListener('mousemove', moveplayhead, true);
			music.removeEventListener('timeupdate', timeUpdate, false);
		}
		// mouseUp EventListener
		// getting input from all mouse clicks
		function mouseUp(e) {
			if (onplayhead == true) {
				moveplayhead(e);
				window.removeEventListener('mousemove', moveplayhead, true);
				// change current time
				music.currentTime = duration * clickPercent(e);
				music.addEventListener('timeupdate', timeUpdate, false);
			}
			onplayhead = false;
			if(onvolume){
				movevolumehead(e);
				volumeBar.removeEventListener('mousemove', movevolumehead, true);
				music.volume = volumeAmt * volumeClickPercent(e);
			}
			onvolume = false;
		}
		// mousemove EventListener
		// Moves playhead as user drags
		function moveplayhead(e) {
			var newMargLeft = e.pageX - timeline.offsetLeft;
			if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
				playhead.style.marginLeft = newMargLeft + "px";
			}
			if (newMargLeft < 0) {
				playhead.style.marginLeft = "0px";
			}
			if (newMargLeft > timelineWidth) {
				playhead.style.marginLeft = timelineWidth + "px";
			}
		}

		function movevolumehead(e) {
			console.log("moving");
			var newMargTop = ((window.innerHeight - e.pageY) - timelineHeight);
			// var newMargLeft = e.pageX - timeline.offsetLeft;
			if (newMargTop >= 0 && newMargTop <= window.innerHeight) {
				innerVolume.style.marginTop = (120 - newMargTop) + "px";
			}
			if (newMargTop < 0) {
				innerVolume.style.marginTop = "120px";
			}
			if (newMargTop > timelineWidth) {
				innerVolume.style.marginTop = "0px";
			}
		}

		// timeUpdate 
		// Synchronizes playhead position with current point in audio 
		function timeUpdate() {
			var playPercent = timelineWidth * (music.currentTime / duration);
			playhead.style.marginLeft = playPercent + "px";
			if (music.currentTime == duration) {
				pButton.className = "";
				pButton.className = "play";
			}
		}

		//Play and Pause
		function play() {
			// start music
			if (music.paused) {
				music.play();
				// remove play, add pause
				pButton.className = "";
				pButton.className = "pause";
			} else { // pause music
				music.pause();
				// remove pause, add play
				pButton.className = "";
				pButton.className = "play";
			}
		}

		// Gets audio file duration
		music.addEventListener("canplaythrough", function () {
			duration = music.duration;  
		}, false);
