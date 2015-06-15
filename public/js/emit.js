(function(){

	var logger = document.querySelector('logger');
	var video = document.querySelector('video');
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.width = 120;
	context.height = 120;


	function log(message) {
	   logger.innerHTML = logger.innerHTML + message + "<br/>";
	};

		navigator.getMedia = ( navigator.getUserMedia ||
	           navigator.webkitGetUserMedia ||
	           navigator.mozGetUserMedia ||
	           navigator.msGetUserMedia);
		

	navigator.getMedia (
	   {
	      video: true,
	      audio: false
	   },
	   function(stream) {
	      video.src = window.URL.createObjectURL(stream);
	   },
	   function(err) {
	    console.log("Ocurrió el siguiente error: " + err);
	   }

	);

	var socket = io.connect(window.document.location.host);


	socket.on('connect', function () {
		log('connected');
	});

	socket.on('disconnect', function () {
		log('disconnected');
	});

	function emit(message) {
		console.log(message);
		socket.emit('data', message);
	}

	function sendFrame(video, context) {
	    context.drawImage(video, 0, 0, context.width, context.height);
	    emit(canvas.toDataURL('image/webp'));
	}

	setInterval(function() { sendFrame(video, context); }, 100);
})();