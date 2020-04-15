// DAta service
define(['plugins/http', 'durandal/app', ''], 
    function (http, app) {
        return {
            room: {
                exists: async (roomName) => {
                    // TODO: Goes to data service.
                    // Let the API sanitize
                    // Test only
                    try {
                        let result = await http.get('/api/room/exists/' + roomName); // Not a fan of this way
                        if(result[0] !== 200)
                            console.log(result);
                        else
                            return true; 
                    } catch (error) { 
                        // TODO: Stupid use of REST for client to rely on errors.
                        // Think its a  framework thing. So wrapping.
                        if(error.status == 404) // TODO: Probably want to send back errors from server from here.
                            return error.status;
                        else // Who knows what happens here
                            throw Error(error);
                    }
                }
            }
        }


})