define(['plugins/http', 'durandal/app', 'knockout', 'socket'], 
    function (http, app, ko, io) {
    // TODO: we will use the local storage for this as we don't want to store sessions on server
    // And we dont want to ask users/players to sign up 
    var self = this;
    self.currentAdmin = 'Adam';
    return {
        getTeam: () =>{
            let team = JSON.parse(localStorage.getItem('team'));
            if(team)
                return team;

            throw new Error('Team not found.');
        },
        setTeamName: (teamName)=>{
            let teamDetails = {
                name: teamName
            };
            if(teamDetails.name)
                localStorage.setItem('team', JSON.stringify(teamDetails));
        },
        isTeamSet: ()=>{
            return (JSON.parse(localStorage.getItem('team')) != undefined);
        },
        isAdmin: (channel)=>{
            // TODO: Obviously fix soon
            let team = JSON.parse(localStorage.getItem('team'));
            // Here we can see who the admin is 
            // return(team.admin === self.currentAdmin)
            return true;
        }
    }
});
