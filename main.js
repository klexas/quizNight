var config = require('./common/config');
var express = require('express');
var cors = require('cors');
// Socket.io config
var io = require('socket.io')(6970, {'transports': ['websocket', 'polling']});
var socketConnectionPool = []; // Sure there is a better way to do this 

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

// app.get('/', ((req, res)=> {
//     res.status(500).send('Okay boomer.');
// }));

// Start
app.listen(config.connections.entry.port, (() => {
    console.log('Listening on port: ' + config.connections.entry.port);
}));
