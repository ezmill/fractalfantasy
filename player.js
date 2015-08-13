		var music = document.getElementById('music'); // id for audio element
		var duration; // Duration of audio clip
		var pButton = document.getElementById('pButton'); // play button

		var playhead = document.getElementById('playhead'); // playhead

		var timeline = document.getElementById('timeline'); // timeline

		var volume = document.getElementById('volume'); // timeline
		var volumeBar = document.getElementById('volumeBar'); // timeline
		var innerVolume = document.getElementById('innerVolume'); // timeline
		// timeline width adjusted for playhead
		var timelineWidth = window.innerWidth/* - playhead.offsetWidth;*/;
		var timelineHeight = 60/* - playhead.offsetWidth;*/;
		var counter = 0;
		var volumeBarHeight = 120;
		var volumeAmt = 1.0;

		volume.addEventListener("click", function(event){
			// volumeBar.style.display = "block";
			if(counter%2==0){
				volumeBar.className = "animateUp";
				innerVolume.className = "animateUp";				
			} else {
				volumeBar.className = "animateDown";
				innerVolume.className = "animateDown";	
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
