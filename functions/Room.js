const { is } = require("express/lib/request");

class Room {
    NB_MAX = 2;
    id_p1;
    id_p2;
    name;
    is_locked = false;
    
    constructor(name, id_p1) {
        this.id_p1 = id_p1;
        this.name = name;
    }

    add_p2 (id_p2) {
        this.id_p2 = id_p2;
        this.is_locked = true;
    }

    get_is_locked() {
        return this.is_locked;
    }

    get_id_room() {
        return this.name;
    }

    get_p1() {
        return this.id_p1;
    }
}

module.exports = Room