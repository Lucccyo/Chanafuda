const Card = require('./Card.js');

class Stack_test {
    static script_cards() {

        // January
        new Card('01', '01');
        new Card('01', '02');
        new Card('01', 'RP');
        new Card('01', 'BB');

        // February, public_stack
        new Card('02', '01');
        new Card('02', '02');
        new Card('02', 'RP');
        new Card('02', 'A0');

        // March, public_stack
        new Card('03', '01');
        new Card('03', '02');
        new Card('03', 'RP');
        new Card('03', 'BC');

        // April, public_stack
        new Card('04', '01');
        new Card('04', '02');
        new Card('04', 'RR');
        new Card('04', 'A0');

        // May, public_stack
        new Card('05', '01');
        new Card('05', '02');
        new Card('05', 'RR');
        new Card('05', 'A0');

        // June, public_stack
        new Card('06', '01');
        new Card('06', '02');
        new Card('06', 'RV');
        new Card('06', 'AC');

        // July, public_stack
        new Card('07', '01');
        new Card('07', '02');
        new Card('07', 'RR');
        new Card('07', 'AI');

        // August, public_stack
        new Card('08', '01');
        new Card('08', '02');
        new Card('08', 'A0');
        new Card('08', 'BM');

        // September, public_stack
        new Card('09', '01');
        new Card('09', '02');
        new Card('09', 'RV');
        new Card('09', 'AW');

        // October, public_stack
        new Card('10', '01');
        new Card('10', '02');
        new Card('10', 'RV');
        new Card('10', 'AS');

        // November, public_stack
        new Card('11', '01');
        new Card('11', 'RR');
        new Card('11', 'A0');
        new Card('11', 'BR');

        // December, public_stack
        new Card('12', '01');
        new Card('12', '02');
        new Card('12', '03');
        new Card('12', 'BD');
    }
}

module.exports = Stack_test