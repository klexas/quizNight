define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        roomid: '',
        join: function() {
            app.showMessage('Joining quiz room...');
            router.navigate('room/' + this.roomid, { trigger: true, replace: true }); 
        },
        activate: function () {
            router.map([
                { route: '', title:'Welcome to QuizNight', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'create', moduleId: 'viewmodels/room/create', nav: true },
                { route: 'join', moduleId: 'viewmodels/room/join', nav: true },
                { route: 'room/:id', moduleId: 'viewmodels/room/index', nav: false },
                { route: 'room/admin/:id', moduleId: 'viewmodels/room/admin', nav: false }
            ]).buildNavigationModel();
            return router.activate();
        }
    };
});