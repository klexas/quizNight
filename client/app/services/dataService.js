// DAta service
define(['plugins/http', 'durandal/app', ''], 
    function (http, app) {
        return {
            room: {
                exists: async (roomName) => {
                    // TODO: Goes to data service.
                    // Let the API sanitize
                    // Test only
                    let result = await http.get('/api/room/exists/' + roomName); // Not a fan of this way
                    if(result === 'okay boomer')
                        console.log(result);
                    return true;
                }
            }
        }


})