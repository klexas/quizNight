define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router'], function (http, app, ko, router) {
    return {
        displayName: 'Create a QuizNight Room',
        createModel: {
            name: '',
            adminpass: '',
            roompass: ''
        },
        activate: function () {

        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return true;
        },
        create: function(){
            // TODO: sanitize and see if valid
            console.log(this.createModel);
            // Nagivate and set admin
            router.navigate('room/' + this.createModel.name, { trigger: true, replace: true }); 
        }
    };
});