var config = require('./common/config');
var fileService = require('./services/fileService');
var express = require('express');
var cors = require('cors');
// Socket.io config
var io = require('socket.io')(6970, {'transports': ['websocket', 'polling']});
var socketConnectionPool = []; // Sure there is a better way to do this 

//TODO: Add in a dat service layer for storage.
// For the moment lets store the document in the FS 
console.warn("NB : This is DEBUG mode only, files will be stored in play JSON.");
var dataStoreLocation =  __dirname + '/data';

io.on('connection', function(socket) {
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    socket.on('next_message', () => {
        var question = {
            number: 1,
            question: 'What day is it ? '
        };
        io.emit('new_question', JSON.stringify(question));
    });

    socket.on('force_message', (question)=>{
        console.log('forcing question');
        console.log(question);
        io.emit('new_question', question);
    });

    socket.on('subscribe', function(room) {
        if (socketConnectionPool.indexOf(room) < 0) {
            socketConnectionPool.push(room);
            socket.join(room);
            socket.send('joined', room);
            console.log(room);
        }
    });

    socket.on('unsubscribe', function(room) {
        console.log('leaving Quiz Room', room);
        socketConnectionPool.splice(socketConnectionPool.indexOf(room), 1);
        console.log("ROOMS OPEN : " + socketConnectionPool.length);
        socket.leave(room);
    });

    socket.on('disconnect', function(socket) {
        console.log('diconnected Quiz Room : ' + socket);
        socketConnectionPool.splice(socketConnectionPool.indexOf(socket), 1);
        console.log("ROOMS OPEN : " + socketConnectionPool.length);
    });

    socket.on('message', (text)=>{
        console.log('Message in. Somone joining test :  ' + text);
        socket.send('message', 'hey' + text);
    });
});

// TODO: create bootstrap to clean this up
var app = express();
app.use(cors());

app.use(express.static(__dirname + '/client'));

app.get('/api/room/exists/:room_id', (async (req, res) => {
    // Don't do this method for anything sensitive
    // TODO: Sanitize req 
    let room_id = req.params['room_id'];
    console.log(room_id);
    var result = await fileService.exists(room_id);
    console.log(result);
    if (result)
        res.status(200).send('Exists'); 
    else
        res.status(200).send('Okay boomer.');
}));


// Start
app.listen(config.connections.entry.port, (() => {
    console.log('Listening on port: ' + config.connections.entry.port);
}));
