class Room {
    NB_MAX = 2;
    sort_stack;
    stack;
    p1; 
    p2;
    name;
    is_locked = false;
    board;
    
    constructor(name, p1, perso_stack) {
        this.p1 = p1;
        this.name = name;
        this.sort_stack = perso_stack;
        this.board = new Array();
        this.stack = new Array();
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

    get_sort_stack() {
        return this.sort_stack;
    }

    set_stack(stack) {
        this.stack = Array.from(stack);
    }

    get_stack() {
        return this.stack;
    }
}

module.exports = Room