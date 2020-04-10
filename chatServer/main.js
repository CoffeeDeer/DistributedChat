var app = require('express')();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var redis = require('socket.io-redis');

io.adapter(redis({ host: 'redis', port: 6379 }));

server.listen(80, function () {
    console.log('Socket IO server listening on port 80');
});

io.on('connection', function (socket) {
    console.log("conneted");

    socket.on('join', function (data) {
        socket.join('room' + data.roomId);
    });

    socket.on('message', function (data) {
        socket.in('room'+data.roomId).emit(data.text);
    });

    socket.on('check', function (data) {
        io.of('/').adapter.allRooms((err, rooms) => {
            console.log(rooms); // an array containing all rooms (accross every node)
        });
    })

    socket.on('check2', function (data) {
        io.of('/').adapter.clients((err, clients) => {
            console.log(clients); // an array containing all connected socket ids
        });
    })
});