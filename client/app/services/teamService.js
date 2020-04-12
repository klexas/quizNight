define(['plugins/http', 'durandal/app', 'knockout', 'socket'], function (http, app, ko, io) {
    // TODO: we will use the local storage for this as we don't want to store sessions on server
    // And we dont want to ask users/players to sign up 
    return {
        getTeam: () =>{
            let team = JSON.parse(localStorage.getItem('team'));
            if(team)
                return (team);

            throw new Error('Team not found.');
        },
        setTeamName: (teamName)=>{
            let teamDetails = {
                name: teamName
            };

            localStorage.setItem('team', JSON.stringify(teamDetails));
        },
        isTeamSet: ()=>{
            return (localStorage.getItem('team') != undefined);
        }
    }
});
