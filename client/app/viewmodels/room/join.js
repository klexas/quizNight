define([
  "plugins/http",
  "durandal/app",
  "knockout",
  "plugins/router",
  "services/room",
], function (http, app, ko, router, roomService) {
    var self = this;
    self.room = { id: ko.observable(), secret: ko.observable() };
  return {
    displayName: "Join a QuizNight Room",
    room: self.room,
    activate: function () {},
    canDeactivate: function () {
      //the router's activator calls this function to see if it can leave the screen
      return true;
    },
    join: async () => {
      try {
        await roomService.joinRoom(self.room);
      } catch (error) {
        app.showMessage(error, 'Room Error', ['Okay']);
      }

    },
  };
});
