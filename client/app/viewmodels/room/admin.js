define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'socket'], function (http, app, ko, router, socket) {
    var self = this;
    self.websocket = socket("http://localhost:6970");
    self.questionList = ko.observableArray([]);
    self.currentRound = ko.observable(1);
    self.question = ko.observable({
        question: '',
        answer: ''
    });
    return {
        displayName: 'Admin',
        createModel: {
            adminpass: '',
            roompass: ''
        },
        activate: function (room) {
            console.log('Entering Admin for room : ' + room);
        },
        compositionComplete: function() {
            self.websocket.on('chat message', function(msg) {
                $('#messages').append($('<li>').text(msg));
            });
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return true;
        },
        addQuestion: function() {
            self.websocket.emit('chat message', $('#m').val());
            $('#m').val('');
            // TODO: sanitize and see if valid
            self.questionList.push(self.question());
            return false;
        },
        nextQuestion: function(){
            self.websocket.emit('next_message');
        }
    };
});