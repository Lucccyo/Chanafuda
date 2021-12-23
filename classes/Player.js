class Player {
    id;
    hand;
    depository;
    constructor(id) {
        this.id = id;
        this.hand = new Array();
        this.depository = new Array();
    }

    get_id() {
        return this.id;
    }

    get_his_room() {
        return this.his_room;
    }

    go_to_room(room) {
        this.his_room = room;
    }

    get_hand() {
        return this.hand;
    }

    get_depository() {
        return this.depository;
    }

    static display_tab(tab) {
        for(var i = 0 ; i < tab.length ; i++) {
            console.log(tab[i]);
        }
    }

    get_his_mate_id() {
        let his_room = this.get_his_room();
        if(this.get_id() == his_room.get_p1()) {
        target_id = his_room.get_p2();
        } else {
        target_id = his_room.get_p1();
        }

        return target_id;
    }
}

module.exports = Player