define(['services/data'], function (dataService) {
    return {
        checkRoom: async (room_name) => {
            // TODO: Lol - sanitize here
            var roomAvailable = await dataService.room.exists(room_name);
            if(roomAvailable == 404)
            // JS allows on the fly typing(if you can even call it that).
            // Sure why not embrace it. Hedonism at it's finest.
                return (true);
            else return false; // Who cares at this stage, the room cant be created.
        },
        addRoom: (room_model) => {
            console.log('lol some more ? If this works it will be cool');
        }
    }
})
