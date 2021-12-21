class Player {
    // static rooms = new Array();
    id;
    his_room_id;
    constructor(id) {
        this.id = id;
    }

    get_id() {
        return this.id;
    }

    get_his_room() {
        return this.his_room_id;
    }

    go_to_room(id_room) {
        this.his_room_id = id_room;
    }
}

module.exports = Player