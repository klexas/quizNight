define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'socket', 'services/team'], 
function (http, app, ko, router, socket, teamService) {
    var self = this;
    self.websocket = socket("http://localhost:6970");
    self.questionList = ko.observableArray([]);
    self.currentRound = ko.observable(1);
    self.question = {
        question: ko.observable(),
        answer: ko.observable()
    };
    return {
        displayName: 'Admin',
        createModel: {
            adminpass: '',
            roompass: ''
        },
        activate: function (room) {
            if(room && teamService.isAdmin(room))
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
            // TODO: sanitize and see if valid
            // With Question & answer - store to FS
            self.questionList.push({
                question: self.question.question(),
                answer: self.question.answer()
            });
            return false;
        },
        nextQuestion: function(){
            self.websocket.emit('next_message');
        },
        saveQuestion: function(){
            // TODO: DataService Layer
        }
    };
});