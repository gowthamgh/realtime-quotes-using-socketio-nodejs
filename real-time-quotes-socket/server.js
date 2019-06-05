var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

server.listen(3000);
console.log('Server is listening on 3000');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/admin.html');
});

io.on('connection', function(socket) {
    socket.emit('welcome', { data: 'welcome'});

    socket.on('new', function(data) {
        console.log('About to upload Quote');
        io.sockets.emit('next', { data : data})
    });
});

