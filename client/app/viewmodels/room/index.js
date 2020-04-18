define(['services/room', 'durandal/app', 'knockout', 'socket', 'plugins/router', 'services/team'], 
  function (roomService, app, ko, io, router, teamService) {
    var self = this;
    self.teamName = ko.observable();
    self.socket = {};
    self.answer = ko.observable();
    self.players = ko.observableArray([]);
    // Domain Config & add SSL 
    self.socket = io("http://localhost:6970/", {'transports': ['websocket', 'polling'], 'secure': false});
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
        teamName: ko.observable(''),
        room_id: 0,
        teams: ko.observableArray([]),
        people: ko.observableArray([{ team: '', name: ''}]),
        pass: 'admin',
        currentRound: ko.observable(1),
        round: {
            number: ko.observable(0),
            questions: ko.observableArray([])
        },
        previousQuestions: self.previousQuestions,
        canActivate: function() {
          //TODO: Not sure if we will need this, but good event to know of
          return true;
        },
        activate: function (id) {
          // TODO: Sanitize id
          if(!roomService.checkRoom(id)) {
            router.navigate('join');
            app.showMessage('Room does not exist, please check details or create a new one.', 'Room Error', ['M\'kay']);
            return false;
          }

          // check if there is a team name already created
          this.displayName += ' ' + id;
          self.room_id = id;
          this.registerSocket();
        },
        compositionComplete: function(){
             // Create Teams
             // TODO: Move this socket work to a service. 
          self.socket.on("connect", function(socket){
            console.log('Quiz room connected!' + self.room_id, "Ready to Play!");
            socket.emit('subscribe', self.room_id);
          });

          // TODO: Replace all this with WebRTC video conference
          self.socket.on('chat message', function(msg) {
            $('#messages').append($('<li>').text(msg));
          });

          self.socket.on('new_question', function(question) {
            // TODO: Sanitize 
            var q_obj = JSON.parse(question);
            self.previousQuestions.push(q_obj);
            self.currentQuestion.number(q_obj.number);
            self.currentQuestion.question(q_obj.question);
          });

          self.socket.on("joined", function(room){
            console.log('Someone is in!', "LETS PLAY!!");
          });

          // Check team after DOM loaded because we need the modal loaded
          // check is the team set
          if(!teamService.isTeamSet()) {
            // Show team input name diag
            console.log('No team set. ');
            $('#addTeam').modal('show');

            app.showMessage('Please select a team name', 'Set Team', ['Ok']);
          }
          else{
            this.teamName(teamService.getTeam().name);
          }
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            // return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
            // TODO: We might want to warn if a game is still on.
            return true;
        },
        setTeam() {
          teamService.setTeamName(this.teamName());
          // this.teamName(teamService.getTeam().name);
          
          $('#addTeam').modal('hide');
        },
        populateQuestions() {
            // TODO: Smelly Weirdness - Change all this
            // Just give 10 mins attention to clean up when DB introduced 
            this.currentRound(this.round.number() + 1);
            this.round.number(this.round.number() + 1);
        },
        nextQuestion(){
          self.currentQuestion.number(self.currentQuestion.number()+1);
        },
        sendAnswer() {
          app.showMessage('Answer has been sent! <br /> Your answer : ' + self.answer(), 'Answer', ['Ok']);
          self.answer('');
        },
        showQuestion(question) {
          app.showMessage(question.question, 'Question :  ' + question.number, ['Ok']);

        },
        registerSocket(){
         
          // TODO: Load Questions
          return true;
        }
    };
});