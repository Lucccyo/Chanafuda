class Card {
    static SIZE = 48;
    static stack = [];
    month;
    type;

    constructor(month, type, public_stack) {
        this.month = month;
        this.type = type;
        public_stack.push(this);
    }

    get_month() {
        return this.month;
    }

    get_name_show() {
        return this.month.concat('', this.type);
    }

    get_name_hidden() {
        return ("----");
    }

    static clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    static shuffle() {
        for (var i = 0; i < Card.SIZE; i++){
            var rand = Math.floor(Math.random() * Card.SIZE);
            var temp = Card.stack[i];
            Card.stack[i] = Card.stack[rand];
            Card.stack[rand] = temp;
        }
    }

    static display_cards() {
        for(var i = 0 ; i < this.SIZE ; i++) {
            console.log(Card.stack[i]);
        }
    }

    static display(tab) {
        for(var i = 0 ; i < tab.length ; i++) {
            console.log(tab[i]);
        }
    }

    static move_card(card, start, end) {
        // card : Card
        // start : Card[]
        // end : Card[]

        // delete the card from start stack
        start.splice(Card.stack.indexOf(card), 1);

        // add the card at the end of end stack
        end.push(card);
    }

    static distribute(hand_p1, hand_p2, board) {
        // hand_p1 : Card[]
        // hand_p2 : Card[]
        // board : Card[]

        //cards are distributed 2 by 2

        var j = 0;

        for(var i = 0 ; i < 4 ; i++) {
            Card.move_card(Card.stack[j], Card.stack, hand_p1);
            Card.move_card(Card.stack[j+1], Card.stack, hand_p1);

            Card.move_card(Card.stack[j+2], Card.stack, board);
            Card.move_card(Card.stack[j+3], Card.stack, board);

            Card.move_card(Card.stack[j+4], Card.stack, hand_p2);
            Card.move_card(Card.stack[j+5], Card.stack, hand_p2);

            j+=6;
        }
    }

    static need_shake(board) {
        // need to shuffle again the board if 3 card of one month are at the same time in the board (block the game)
        var b = board;

        while(b.length != 0) {
            var cpt = 1;
            var am = b[0].get_month();

            for(var j = 1 ; j < b.length ; j++) {
                if(b[j].get_month() == am) {
                    b.splice(j, 1);
                    j--;
                    cpt++;
                }
                if(cpt >= 3) {
                    return true;
                }
            }
            b.splice(0, 1);
        }
        return false;
    }

    static script_cards(public_stack) {

        // January
        new Card('01', '01', public_stack);
        new Card('01', '02', public_stack);
        new Card('01', 'RP', public_stack);
        new Card('01', 'BB', public_stack);

        // February, public_stack
        new Card('02', '01', public_stack);
        new Card('02', '02', public_stack);
        new Card('02', 'RP', public_stack);
        new Card('02', 'A0', public_stack);

        // March, public_stack
        new Card('03', '01', public_stack);
        new Card('03', '02', public_stack);
        new Card('03', 'RP', public_stack);
        new Card('03', 'BC', public_stack);

        // April, public_stack
        new Card('04', '01', public_stack);
        new Card('04', '02', public_stack);
        new Card('04', 'RR', public_stack);
        new Card('04', 'A0', public_stack);

        // May, public_stack
        new Card('05', '01', public_stack);
        new Card('05', '02', public_stack);
        new Card('05', 'RR', public_stack);
        new Card('05', 'A0', public_stack);

        // June, public_stack
        new Card('06', '01', public_stack);
        new Card('06', '02', public_stack);
        new Card('06', 'RV', public_stack);
        new Card('06', 'AC', public_stack);

        // July, public_stack
        new Card('07', '01', public_stack);
        new Card('07', '02', public_stack);
        new Card('07', 'RR', public_stack);
        new Card('07', 'AI', public_stack);

        // August, public_stack
        new Card('08', '01', public_stack);
        new Card('08', '02', public_stack);
        new Card('08', 'A0', public_stack);
        new Card('08', 'BM', public_stack);

        // September, public_stack
        new Card('09', '01', public_stack);
        new Card('09', '02', public_stack);
        new Card('09', 'RV', public_stack);
        new Card('09', 'AW', public_stack);

        // October, public_stack
        new Card('10', '01', public_stack);
        new Card('10', '02', public_stack);
        new Card('10', 'RV', public_stack);
        new Card('10', 'AS', public_stack);

        // November, public_stack
        new Card('11', '01', public_stack);
        new Card('11', 'RR', public_stack);
        new Card('11', 'A0', public_stack);
        new Card('11', 'BR', public_stack);

        // December, public_stack
        new Card('12', '01', public_stack);
        new Card('12', '02', public_stack);
        new Card('12', '03', public_stack);
        new Card('12', 'BD', public_stack);
    }

    static init(hand_p1, hand_p2, board) {

        // shuffle cards and distribution until a playable board
        while(1) {
            hand_p1.length = 0;
            hand_p2.length = 0;
            board.length = 0;
            Card.stack.length = 0;

            Card.script_cards();
            this.shuffle();

            Card.distribute(hand_p1, hand_p2, board);

            var b = Card.clone(board);
            if(!Card.need_shake(b)) break;
        }
    }
}

module.exports = Card

