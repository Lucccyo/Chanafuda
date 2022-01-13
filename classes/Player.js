class Player {
    id;
    is_p1;
    hand;
    depository;
    his_room;
    constructor(id) {
        this.id = id;
        this.hand = new Array();
        this.depository = new Array();
    }

    set_p1(bool) {
        this.is_p1 = bool;
    }

    get_is_p1() {
        return this.is_p1;
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

    get_his_mate() {
        let his_room = this.get_his_room();
        let mate;
        if(this.get_his_room()) {
            
            if(this.get_id() == his_room.get_p1().get_id()) {
            mate = his_room.get_p2();
            } else {
            mate = his_room.get_p1();
            }
            return mate;
        } else {
            return 0;
        }
    }

    get_his_mate_id() {
        let his_room = this.get_his_room();
        let target_id;
        if(this.get_his_room()) {
            
            if(this.get_id() == his_room.get_p1().get_id()) {
            target_id = his_room.get_p2().get_id();
            } else {
            target_id = his_room.get_p1().get_id();
            }
            return target_id;
        } else {
            return 0;
        }
        
    }
}

module.exports = Player