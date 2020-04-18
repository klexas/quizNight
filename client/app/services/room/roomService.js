define(['services/data', 'plugins/router'], function (dataService, router) {
    var self = this;
    self.roomExists = async (room_name) => {
        // TODO: Lol - sanitize here
        var roomAvailable = await dataService.room.exists(room_name);
        if(roomAvailable == 404)
        // JS allows on the fly typing(if you can even call it that).
        // Sure why not embrace it. Hedonism at it's finest.
            return (false);
        else return true; // Who cares at this stage, the room cant be created.
    };

    return {
        checkRoom: self.roomExists,
        createRoom: (roomModel) => {
            this.dataService.createRoom(roomModel);
        },
        joinRoom: async (roomModel) => {
            if(await self.roomExists(roomModel.id())) {
                router.navigate('room/' + roomModel.id(), { trigger: true, replace: true });
            }
            else {
                throw 'Room does not exist please try again';
            }
        }
    }
})
