class Card {
  static sort_stack = new Array();
  static SIZE = 48;
  month;
  type;

  constructor(month, type) {
    this.month = month;
    this.type = type;
    Card.sort_stack.push(this);
  }

  // getters
  static get_sort_stack() {
    return Card.sort_stack;
  }

  get_month() {
    return this.month;
  }

  get_type() {
    return this.type;
  }

  get_name() {
    return this.month.concat('', this.type);
  }
  // *******


  // display function
  static display(tab) {
    console.log(tab.length);
    for (let i = 0; i < tab.length; i++) {
      console.log(tab[i]);
    }
  }
  // *******


  // shuffle card function
  static shuffle(s) {
    for (let i = 0; i < Card.SIZE; i++) {
      let rand = Math.floor(Math.random() * Card.SIZE);
      let temp = s[i];
      s[i] = s[rand];
      s[rand] = temp;
    }
    return s;
  }
  // *******


  // initialisation start of a turn
  static init(r) {
    // departure
    let stack = r.get_stack();
    // arrival
    let hand_p1 = r.get_p1().get_hand();
    let hand_p2 = r.get_p2().get_hand();
    let board = r.get_board();
    
    while (1) {
      hand_p1.length = 0;
      hand_p2.length = 0;
      board.length = 0;

      Card.distribute(stack, hand_p1, hand_p2, board);

      if (!Card.need_shake(board)) {
        return stack;
      }
      console.log("-- Redistribution");

      // stack.length = 0;
      stack = Card.shuffle(Array.from(Card.get_sort_stack()));
    }
  }

  static distribute(stack, hand_p1, hand_p2, board) {
    // hand_p1 : Card[]
    // hand_p2 : Card[]
    // board : Card[]

    //cards are distributed 2 by 2
    for (let i = 0; i < 24; i++) {
      let j = (i % 6) >> 1;
      Card.move_card(stack[0], stack, j == 0 ? hand_p1 : j == 1 ? board : hand_p2);
    }
  }

  static move_card(card, start, end) {
    // card : Card
    // start : Card[]
    // end : Card[]

    // delete the card from start stack
    // console.log("CARD MOVE : " + card.get_name());
    start.splice(start.indexOf(card), 1);
    // add the card at the end of end stack
    end.push(card);
  }

  static need_shake(board) {
    let m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < board.length; i++) {
      let n = board[i].get_month() - 1;
      m[n]++; if (m[n] >= 3) return true;
    }
    return false;
  }
  // *******


  // initialisation of cards
  // original script
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
    new Card('06', 'RB');
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
    new Card('09', 'RB');
    new Card('09', 'AW');

    // October, public_stack
    new Card('10', '01');
    new Card('10', '02');
    new Card('10', 'RB');
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
  // *******

  static script1_cards() {
    // script for car drawn choice
    new Card('07', 'RR'); // p1
    new Card('09', 'RB'); // p1
    new Card('11', 'BR'); // board
    new Card('03', 'RP'); // board
    new Card('05', 'RR'); // p2
    new Card('12', 'BD'); // p2
    new Card('04', 'RR'); // p1
    new Card('10', 'RB'); // p1
    new Card('09', 'AW'); // board
    new Card('03', '02'); // board
    new Card('06', 'RB'); // p2
    new Card('08', 'A0'); // p2
    new Card('06', '02'); // p1
    new Card('08', '02'); // p1
    new Card('11', 'RR'); // board
    new Card('10', 'AS'); // board
    new Card('05', '02'); // p2
    new Card('04', '02'); // p2
    new Card('02', 'A0'); // p1
    new Card('01', 'RP'); // p1
    new Card('04', '01'); // board
    new Card('07', '02'); // board
    new Card('02', 'RP'); // p2
    new Card('12', '03'); // p2
    new Card('03', 'BC'); // card draw
    new Card('02', '02');
    new Card('06', 'AC');
    new Card('07', 'AI');
    new Card('02', '01');
    new Card('05', 'A0');
    new Card('09', '01');
    new Card('09', '02');
    new Card('04', 'A0');
    new Card('08', '01');
    new Card('01', 'BB');
    new Card('11', 'A0');
    new Card('01', '01');
    new Card('03', '01');
    new Card('05', '01');
    new Card('08', 'BM');
    new Card('07', '01');
    new Card('06', '01');
    new Card('10', '02');
    new Card('10', '01');
    new Card('11', '01');
    new Card('12', '01');
    new Card('01', '02');
    new Card('12', '02');
  }

  static script2_cards() {
    // script for hand choice

    //use : choose your 07 card and you are going to be able to make a choice on the board
    new Card('07', 'RR'); // p1
    new Card('09', 'RB'); // p1
    new Card('11', 'BR'); // board
    new Card('07', 'AI'); // board
    new Card('05', 'RR'); // p2
    new Card('12', 'BD'); // p2
    new Card('04', 'RR'); // p1
    new Card('10', 'RB'); // p1
    new Card('09', 'AW'); // board
    new Card('03', '02'); // board
    new Card('06', 'RB'); // p2
    new Card('08', 'A0'); // p2
    new Card('06', '02'); // p1
    new Card('08', '02'); // p1
    new Card('11', 'RR'); // board
    new Card('10', 'AS'); // board
    new Card('05', '02'); // p2
    new Card('04', '02'); // p2
    new Card('02', 'A0'); // p1
    new Card('01', 'RP'); // p1
    new Card('04', '01'); // board
    new Card('07', '02'); // board
    new Card('02', 'RP'); // p2
    new Card('12', '03'); // p2
    new Card('03', 'BC');
    new Card('02', '02');
    new Card('06', 'AC');
    new Card('03', 'RP');
    new Card('02', '01');
    new Card('05', 'A0');
    new Card('09', '01');
    new Card('09', '02');
    new Card('04', 'A0');
    new Card('08', '01');
    new Card('01', 'BB');
    new Card('11', 'A0');
    new Card('01', '01');
    new Card('03', '01');
    new Card('05', '01');
    new Card('08', 'BM');
    new Card('07', '01');
    new Card('06', '01');
    new Card('10', '02');
    new Card('10', '01');
    new Card('11', '01');
    new Card('12', '01');
    new Card('01', '02');
    new Card('12', '02');
  }

  static script3_cards() {
    // script wich need to re shuffle

    //use : choose your 07 card and you are going to be able to make a choice on the board
    new Card('07', 'RR'); // p1
    new Card('09', 'RV'); // p1
    new Card('11', 'BR'); // board
    new Card('07', 'AI'); // board 
    new Card('05', 'RR'); // p2
    new Card('12', 'BD'); // p2
    new Card('04', 'RR'); // p1
    new Card('10', 'RV'); // p1
    new Card('09', 'AW'); // board
    new Card('03', '02'); // board
    new Card('06', 'RV'); // p2
    new Card('08', 'A0'); // p2
    new Card('06', '02'); // p1
    new Card('08', '02'); // p1
    new Card('11', 'RR'); // board
    new Card('07', '01'); // board 
    new Card('08', 'BM'); // p2
    new Card('04', '02'); // p2
    new Card('02', 'A0'); // p1
    new Card('01', 'RP'); // p1
    new Card('04', '01'); // board
    new Card('07', '02'); // board
    new Card('02', 'RP'); // p2
    new Card('12', '03'); // p2
    new Card('03', 'BC');
    new Card('02', '02');
    new Card('06', 'AC');
    new Card('03', 'RP');
    new Card('02', '01');
    new Card('05', 'A0');
    new Card('09', '01');
    new Card('09', '02');
    new Card('04', 'A0');
    new Card('08', '01');
    new Card('01', 'BB');
    new Card('11', 'A0');
    new Card('01', '01');
    new Card('03', '01');
    new Card('05', '01');
    new Card('10', 'AS');
    new Card('05', '02');
    new Card('06', '01');
    new Card('10', '02');
    new Card('10', '01');
    new Card('11', '01');
    new Card('12', '01');
    new Card('01', '02');
    new Card('12', '02');
  }
  // *******
}

module.exports = Card

