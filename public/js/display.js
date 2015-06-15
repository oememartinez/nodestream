(function(){

	var img = document.getElementById("frame");	
	var logger = document.getElementById('logger');

    /* SOCKET.IO */

    var socket = io.connect("http://172.10.9.55:5000");

    socket.on('connect', function () {
    	log('Conectado');
    });

    socket.on('disconnect', function () {
    	log('Desconectado');
    });

    socket.on('data', function(data) {
    	console.log(data);
    	img.src = data;
    });


    /* END SOCKET.IO */

	function log(message) {
       logger.innerHTML = logger.innerHTML + message + "<br/>";
    };
})();
