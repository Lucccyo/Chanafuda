class Card {
  static SIZE = 48;
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

  static shuffle(s) {
    for (var i = 0; i < Card.SIZE; i++) {
      var rand = Math.floor(Math.random() * Card.SIZE);
      var temp = s[i];
      s[i] = s[rand];
      s[rand] = temp;
    }
  }

  static display_cards() {
    for (var i = 0; i < this.SIZE; i++) {
      console.log(Card.stack[i]);
    }
  }

  static display(tab) {
    for (var i = 0; i < tab.length; i++) {
      console.log(tab[i]);
    }
  }

  static move_card(card, start, end) {
    // card : Card
    // start : Card[]
    // end : Card[]

    // delete the card from start stack
    start.splice(start.indexOf(card), 1);
    // add the card at the end of end stack
    end.push(card);
  }

  static distribute(stack, hand_p1, hand_p2, board) {
    // hand_p1 : Card[]
    // hand_p2 : Card[]
    // board : Card[]

    //cards are distributed 2 by 2
    var j = 0;

    for (var i = 0; i < 4; i++) {
      Card.move_card(stack[j], stack, hand_p1);
      Card.move_card(stack[j + 1], stack, hand_p1);
      Card.move_card(stack[j + 2], stack, board);
      Card.move_card(stack[j + 3], stack, board);
      Card.move_card(stack[j + 4], stack, hand_p2);
      Card.move_card(stack[j + 5], stack, hand_p2);

      j += 6;
    }
  }

  static need_shake(board) {
    // console.log('boucle');
    let m = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // for(let i = 0 ; i < board.length ; i++) {
    // console.log('for');

    //   switch (board[i].get_month()) {
    //     case '01' : m[0]++; if(m[0] >= 3)   Card.display(board);  return true; break;
    //     case '02' : m[1]++; if(m[1] >= 3)   Card.display(board);  return true; break;
    //     case '03' : m[2]++; if(m[2] >= 3)   Card.display(board);  return true; break;
    //     case '04' : m[3]++; if(m[3] >= 3)   Card.display(board);  return true; break;
    //     case '05' : m[4]++; if(m[4] >= 3)   Card.display(board);  return true; break;
    //     case '06' : m[5]++; if(m[5] >= 3)   Card.display(board);  return true; break;
    //     case '07' : m[6]++; if(m[6] >= 3)   Card.display(board);  return true; break;
    //     case '08' : m[7]++; if(m[7] >= 3)   Card.display(board);  return true; break;
    //     case '09' : m[8]++; if(m[8] >= 3)   Card.display(board);  return true; break;
    //     case '10' : m[9]++; if(m[9] >= 3)   Card.display(board);  return true; break;
    //     case '11' : m[10]++; if(m[10] >= 3) Card.display(board);  return true; break;
    //     case '12' : m[11]++; if(m[11] >= 3) Card.display(board);  return true; break;

    //   }
    // }
    for (let i = 0; i < board.length; i++) {
      // console.log('for');

      switch (board[i].get_month()) {
        case '01': m[0]++; if (m[0] >= 3) {
          return true;
        }
          break;
        case '02': m[1]++; if (m[1] >= 3) {
          return true;
        }
          break;
        case '03': m[2]++; if (m[2] >= 3) {
          return true;
        }
          break;
        case '04': m[3]++; if (m[3] >= 3) {
          return true;
        }
          break;
        case '05': m[4]++; if (m[4] >= 3) {
          return true;
        }
          break;
        case '06': m[5]++; if (m[5] >= 3) {
          return true;
        }
          break;
        case '07': m[6]++; if (m[6] >= 3) {
          return true;
        }
          break;
        case '08': m[7]++; if (m[7] >= 3) {
          return true;
        }
          break;
        case '09': m[8]++; if (m[8] >= 3) {
          return true;
        }
          break;
        case '10': m[9]++; if (m[9] >= 3) {
          return true;
        }
          break;
        case '11': m[10]++; if (m[10] >= 3) {
          return true;
        }
          break;
        case '12': m[11]++; if (m[11] >= 3) {
          return true;
        }
          break;
      }
    }
    Card.display(m);
    // for(let j = 0 ; j < m.length ; j++) {
    //   if(m[j] >=3) {
    //     return true;
    //   }
    // }

    return false;
  }

  static script_cards(public_stack) {

    // January
    // new Card('01', '01', public_stack);
    // new Card('01', '02', public_stack);
    // new Card('01', 'RP', public_stack);
    // new Card('01', 'BB', public_stack);

    // // February, public_stack
    // new Card('02', '01', public_stack);
    // new Card('02', '02', public_stack);
    // new Card('02', 'RP', public_stack);
    // new Card('02', 'A0', public_stack);


    // // March, public_stack
    // new Card('03', '01', public_stack);
    // new Card('03', '02', public_stack);
    // new Card('03', 'RP', public_stack);
    // new Card('03', 'BC', public_stack);

    new Card('04', '01', public_stack);
    new Card('04', '02', public_stack);
    new Card('04', 'RR', public_stack);
    new Card('04', 'A0', public_stack); new Card('04', '01', public_stack);
    new Card('04', '02', public_stack);
    new Card('04', 'RR', public_stack);
    new Card('04', 'A0', public_stack); new Card('04', '01', public_stack);
    new Card('04', '02', public_stack);
    new Card('04', 'RR', public_stack);
    new Card('04', 'A0', public_stack);
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

  static init(r) {

    // departure
    let sort_stack = r.get_sort_stack();

    // arrival
    let hand_p1 = r.get_p1().get_hand();
    let hand_p2 = r.get_p2().get_hand();
    let board = r.get_board();
    hand_p1.length = 0;
    hand_p2.length = 0;
    board.length = 0;
    // shuffle cards and distribution until a playable board
    // while (1) {
    // console.log('while');
    Card.shuffle(sort_stack);

    Card.distribute(sort_stack, hand_p1, hand_p2, board);
    // console.log('board :');
    // Card.display(board);
    // console.log(Card.need_shake(board));
    console.log(sort_stack.length);
    console.log(board.length);
    console.log(hand_p1.length);
    console.log(hand_p2.length);
    console.log("--------------");
    if (Card.need_shake(board)) {
      while (1) {
        //on remets les cartes dans le paquet
        for (let k = 0; k < 8; k++) {
          Card.move_card(board[k], board, sort_stack);
          Card.move_card(hand_p1[k], hand_p1, sort_stack);
          Card.move_card(hand_p2[k], hand_p2, sort_stack);
        }

        if (sort_stack.length != 48) {
          console.log('PRBLMM-------------------------------------------------------');
          console.log(sort_stack.length);
        }
        Card.shuffle(sort_stack);

        Card.distribute(sort_stack, hand_p1, hand_p2, board);
        if (!Card.need_shake(board)) {
          break;
        }
      }
    }


    // }
  }
}

module.exports = Card

