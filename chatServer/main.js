var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var redis = require('socket.io-redis');


io.adapter(redis({host:'redis',port:6379}));


server.listen(80, function () {
    console.log('Socket IO server listening on port 80');
});


io.on('connection', function (socket) {
    console.log("conneted")
    socket.on('message', function(data){
        console.log('MessageArrive',data)
        //socket.broadcast.emit('message', data);
    });
});
