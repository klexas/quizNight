define(['plugins/http', 'durandal/app', 'knockout', 'plugins/router', 'services/data', 'services/room'], 
    function (http, app, ko, router, dataService, roomService) {
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
        create: function(roomModel){
            // TODO: sanitize and see if valid
            if (!dataService.room.exists(this.createModel.name)) {
                // Let the user know 
                app.showMessage('Room already exists. Please choose another name.', 'Room Error', ['M\'kay']);
                return;
            }
            else{
                // TODO: cosa
                console.log('lucky guy/girl, you got a room. ');
                router.navigate('room/' + this.createModel.name, { trigger: true, replace: true }); 
            }
            // Nagivate and set admin
        }
    };
});