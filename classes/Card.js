class Card {
    static SIZE = 48;
    static stack = [];
    month;
    type;

    constructor(month, type) {
        this.month = month;
        this.type = type;
        Card.stack.push(this);
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

    static script_cards() {

        // January
        new Card('01', '01');
        new Card('01', '02');
        new Card('01', 'RP');
        new Card('01', 'BB');

        // February
        new Card('02', '01');
        new Card('02', '02');
        new Card('02', 'RP');
        new Card('02', 'A0');

        // March
        new Card('03', '01');
        new Card('03', '02');
        new Card('03', 'RP');
        new Card('03', 'BC');

        // April
        new Card('04', '01');
        new Card('04', '02');
        new Card('04', 'RR');
        new Card('04', 'A0');

        // May
        new Card('05', '01');
        new Card('05', '02');
        new Card('05', 'RR');
        new Card('05', 'A0');

        // June
        new Card('06', '01');
        new Card('06', '02');
        new Card('06', 'RV');
        new Card('06', 'AC');

        // July
        new Card('07', '01');
        new Card('07', '02');
        new Card('07', 'RR');
        new Card('07', 'AI');

        // August
        new Card('08', '01');
        new Card('08', '02');
        new Card('08', 'A0');
        new Card('08', 'BM');

        // September
        new Card('09', '01');
        new Card('09', '02');
        new Card('09', 'RV');
        new Card('09', 'AW');

        // October
        new Card('10', '01');
        new Card('10', '02');
        new Card('10', 'RV');
        new Card('10', 'AS');

        // November
        new Card('11', '01');
        new Card('11', 'RR');
        new Card('11', 'A0');
        new Card('11', 'BR');

        // December
        new Card('12', '01');
        new Card('12', '02');
        new Card('12', '03');
        new Card('12', 'BD');
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

