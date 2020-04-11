define(['plugins/http', 'durandal/app', 'knockout', 'socket',], function (http, app, ko, io) {
    var self = this;
    self.socket = {};
    self.answer = ko.observable();
    // Domain Config & add SSL 
    self.socket = io("http://localhost:6970/" , {'transports': ['websocket', 'polling'], 'secure': false});
    self.currentQuestion = {
      number: ko.observable(-1),
      question: ko.observable("")
    };
    self.previousQuestions = ko.observableArray([{
        number: 1,
        question: 'Who are you ?'
    },
    {
        number: 2,
        question: 'Where do you live ?'
    }]);
    return {
        displayName: 'Room',
        room_id: 0,
        teams: [{id:0, name: ''}],
        people: [{ team: '', name: ''}],
        pass: 'admin',
        currentRound: ko.observable(1),
        round: {
            number: ko.observable(0),
            questions: ko.observableArray([])
        },
        previousQuestions: previousQuestions,
        activate: function (id) {
          // TODO: Sanitize id
          this.displayName += ' ' + id;
          self.room_id = id;
          this.registerSocket();
        },
        compositionComplete: function(){
             // Create Teams
          self.socket.on("connect", function(socket){
            console.log('Quiz room connected!' + self.room_id, "Ready to Play!");
            socket.emit('subscribe', self.room_id);
          });

          self.socket.on('chat message', function(msg) {
            $('#messages').append($('<li>').text(msg));
          });

          self.socket.on('new_question', function(question) {
            var q_obj = JSON.parse(question);
            self.previousQuestions.push(q_obj);
            self.currentQuestion.number(q_obj.number);
            self.currentQuestion.question(q_obj.question);
          });

          self.socket.on("joined", function(room){
            console.log('Someone is in!', "LETS PLAY!!");
          });
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        },
        populateQuestions() {
            // TODO: Smelly Weirdness
            // Just give 10 mins attention to clean up when DB introduced 
            this.currentRound(this.round.number() + 1);
            this.round.number(this.round.number() + 1);
            console.log('Questions populated - ish')
        },
        nextQuestion(){
          self.currentQuestion.number(self.currentQuestion.number()+1);
        },
        sendAnswer(){
          app.showMessage('Answer has been sent! <br /> Your answer : ' + self.answer(), 'Answer', ['Ok']);
          self.answer('');
        },
        showQuestion(question){
          app.showMessage(question.question, 'Question :  ' + question.number, ['Ok']);

        },
        registerSocket(){
         
          // TODO: Load Questions
         
         
          return true;
        }
    };
});