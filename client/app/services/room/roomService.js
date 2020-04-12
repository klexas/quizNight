define(['plugins/http', 'durandal/app', 'knockout', 'socket'], function (http, app, ko, io) {
    return {
        checkRoom: (room_name)=>{
            // TODO: sbagliato - API
            return (room_name === 'test');
        }
    }
})
