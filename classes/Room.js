const Card = require('./classes/Card.js')
class Room {
  NB_MAX = 2;
  sort_stack;
  stack;
  p1;
  p2;
  name;
  is_locked = false;
  board;

  card_sent_fp;
  turn_lock = false;
  is_p1 = true;


  constructor(name, p1, perso_stack) {
    this.p1 = p1;
    this.name = name;
    this.sort_stack = perso_stack;
    this.board = new Array();
    this.stack = new Array();
  }

  add_p2(p2) {
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

  turn_fp(player, card_name) {
    if (player.get_id() == this.p1.get_id()) {
      this.is_p1 = true;
    } else {
      this.is_p1 = false;
    }

    this.turn_lock = true;
    this.set_card_sent_fp(card_name);

  }


  set_card_sent_fp(card) {
    this.card_sent_fp = card;
    console.log("Une carte a déja été cliquée");
  }






<<<<<<< Updated upstream
    // turn_fp(player, card_name) {
    //     if(player.get_id() == this.p1.get_id()) {
    //         this.is_p1 = true;
    //     } else {
    //         this.is_p1 = false;
    //     }
    //     this.set_card_sent_fp(card_name);

    //     // verification si la carte appartient bien a la main du joueur
    //     let card = this.contain(player.get_hand(), card_name);
    //     if (card == -1) {
    //         console.log("You are cheating")
    //     }
        
    //     let match(card);

    init_fp(player, card_name) {
        set_card_sent_fp(card_name);
        return this.contain(player.get_hand(), card_name);
    }

    match(card) {
        let match_cards = new Array();
        for(let i = 0 ; i < this.get_board().length ; i++) {
            if(card.get_month() == this.get_board()[i].get_month()) {
                match_cards.push(this.get_board()[i]);
            }
        }
        return match_cards;
    }
        

    // }
=======

>>>>>>> Stashed changes

  contain(hand, card_n) {
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].get_name() == card_n) return hand[i];
    }
<<<<<<< Updated upstream









    contain(hand, card_n) {
        for(let i = 0 ; i < hand.length ; i++) {
            if(hand[i].get_name() == card_n) return hand[i];
        }
        return -1;
      }
=======
    return false;
  }
>>>>>>> Stashed changes
}

module.exports = Room