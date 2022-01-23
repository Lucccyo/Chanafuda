const Card = require("./Card");
class Room {
  NB_MAX = 2;
  stack;
  p1;
  p2;
  name;
  board;
  turn;
  // card_sent_fp;

  constructor(name, p1) {
    this.p1 = p1;
    this.name = name;
    this.stack = Array.from(Card.get_sort_stack());
    // this.stack = Card.shuffle(Array.from(Card.get_sort_stack()));
    this.board = new Array();
    this.turn = p1.get_id();
  }

  add_p2(p2) {
    this.p2 = p2;
  }


  // getters
  get_turn() {
    return this.turn;
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
  // *******

  // start of player turn
  // init_fp(player, card_name) {
  //   this.set_card_sent_fp(card_name);
  //   return this.contain(player.get_hand(), card_name);
  //   //retourne l'objet carte si elle se trouve bien dans la main du joueur
  // }

  // set_card_sent_fp(card) {
  //   this.card_sent_fp = card;
  // }

  contain(hand, card_n) {
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].get_name() == card_n) return hand[i];
    }
    return -1;
  }
  // *******


  // match function
  match(card) {
    let match_cards = new Array();
    for (let i = 0; i < this.get_board().length; i++) {
      if (card.get_month() == this.get_board()[i].get_month()) {
        match_cards.push(this.get_board()[i]);
      }
    }
    //renvoir un tableau comprenant les cartes qui correspondent sur le board au mois de la carte choisie
    return match_cards;
  }
  // *******

  match_analysis(tab_matchs, card, start, p) {
    switch (tab_matchs.length) {
      case 0:
        Card.move_card(card, start, p.get_his_room().get_board());
        console.log("Aucun appairage possible, " + card.get_name() + " va sur le board");
        break;
      case 1:
        console.log("Un seul appairage possible, " + card.get_name() + ", et " + tab_matchs[0].get_name() + " vont dans le repo");
        Card.move_card(card, start, p.get_depository());
        Card.move_card(tab_matchs[0], this.get_board(), p.get_depository());
        break;
      case 2:
        console.log("Deux appairages possibles : " + tab_matchs[0].get_name() + ", " + tab_matchs[1].get_name() + " => Le joueur doit choisir");
        return tab_matchs;
    }
  }
}

module.exports = Room