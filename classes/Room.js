class Room {
    NB_MAX = 2;
    stack;
    p1; 
    p2;
    name;
    is_locked = false;
    board;
    
    constructor(name, p1, stack) {
        this.p1 = p1;
        this.name = name;
        this.stack = stack;
        this.board = new Array();
    }

    add_p2 (p2) {
        this.p2 = p2;
        this.is_locked = true;
    }

    get_is_locked() {
        return this.is_locked;
    }

    get_id_room() {
        return this.name;
    }

    get_p1() {
        return this.p1;
    }

    get_p2() {
        return this.p2;
    }

    get_board() {
        return this.board;
    }

    get_stack() {
        return this.stack;
    }
}

module.exports = Room