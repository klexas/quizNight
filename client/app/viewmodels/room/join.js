define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router'], function (http, app, ko, router) {
    return {
        displayName: 'Join a QuizNight Room',
        room: {id: ko.observable(), secret: ko.observable()},
        activate: function () {

        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return true;
        },
        join: function () {
            console.log(this.room);
            router.navigate('room/' + this.room.id(), { trigger: true, replace: true }); 
        }
    };
});