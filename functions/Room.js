const { is } = require("express/lib/request");

class Room {
    NB_MAX = 2;
    id_p1;
    id_p2;
    name;
    is_locked;
    constructor(name, id_p1) {
        this.id_p1 = id_p1;
        this.name = name;
        this.is_locked = false;
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

}