define(['durandal/app'], function (app) {
    var ctor = function () {
        this.displayName = 'Welcome to the QuizNight!';
        this.description = 'You can create a room, setup questions, invite your group and participate in Video conference all in once place.';
        this.features = [
            'Chatrooms',
            'Questionnaire building',
            'Video & Voice within rooms',
            'Scoreboards'
        ];
    };

    return ctor;
});