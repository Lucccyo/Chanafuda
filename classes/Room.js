const Card = require("./Card");

class Room {
  NB_MAX = 2;
  stack;
  p1;
  p2;
  name;
  is_locked = false;
  board;

  card_sent_fp;
  turn_lock = false;


  constructor(name, p1) {
    this.p1 = p1;
    this.p1.set_p1(true);
    this.name = name;
    this.stack = Card.shuffle(Array.from(Card.get_sort_stack()));
    this.board = new Array();
  }

  add_p2(p2) {
    this.p2 = p2;
    this.p2.set_p1(false);
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

  turn_fp(player, card_name) {

      this.set_card_sent_fp(card_name);

  }


  set_card_sent_fp(card) {
      this.card_sent_fp = card;
    this.turn_lock = true;
  }

  init_fp(player, card_name) {
    this.set_card_sent_fp(card_name);
    return this.contain(player.get_hand(), card_name);
  }

  match(card) {
    let match_cards = new Array();
    for (let i = 0; i < this.get_board().length; i++) {
      if (card.get_month() == this.get_board()[i].get_month()) {
        match_cards.push(this.get_board()[i]);
      }
    }
    return match_cards;
  }

  contain(hand, card_n) {
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].get_name() == card_n) return hand[i];
    }
    return -1;
  }
}

module.exports = Room