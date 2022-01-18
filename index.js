const Room = require('./classes/Room.js')
const Player = require('./classes/Player.js')
const Card = require('./classes/Card.js')


const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { distribute, move_card } = require('./classes/Card.js');
const { match } = require('assert');
const io = new Server(server);

app.use(express.static('./img'));
let nb_room = 0;
let room_temp = null;
let players = [];


// connection with web page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game.html');
});
// *******


// waiting clients
var public_stack = new Array();
server.listen(3000, () => {
  console.log('listening on *:3000');
  Card.script2_cards();
  // Card.script_cards();
});
// *******


// new connection
io.on('connection', (socket) => {
  p = new Player(socket.id);
  players.push(p);
  console.log(p.get_id(), ' connected');

  // give him a gameroom
  if (room_temp == null) {
    r = new Room(nb_room, p);
    p.go_to_room(r);
    console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());
    room_temp = r;
    nb_room++;
  } else {
    room_temp.add_p2(p);
    p.go_to_room(room_temp);
    //game starts
    console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());
    start(room_temp);
    room_temp = null;
  }

  socket.on('disconnect', () => {

    console.log(socket.id, ' disconnected');
  });
});
// *******


// sockets events to update the game
function etat_du_jeu(player, enemy, flag, tab_match, card_drawn) {
  io.to(player.get_id()).emit('perso', construct_name_tab(player.get_hand()));
  io.to(player.get_id()).emit('enemy', enemy.get_hand().length);
  io.to(player.get_id()).emit('board', construct_name_tab(player.get_his_room().get_board()));
  io.to(player.get_id()).emit('pile', player.get_his_room().get_stack().length);

  io.to(enemy.get_id()).emit('perso', construct_name_tab(enemy.get_hand()));
  io.to(enemy.get_id()).emit('enemy', player.get_hand().length);
  io.to(enemy.get_id()).emit('board', construct_name_tab(player.get_his_room().get_board()));
  io.to(enemy.get_id()).emit('pile', player.get_his_room().get_stack().length);

  switch (flag) {
    case 'turn': io.to(player.get_id()).emit('playable', construct_name_tab(player.get_hand()));
      break;
    case 'choice': io.to(player.get_id()).emit('playable', construct_name_tab(tab_match));
      break;
    case 'show': io.to(player.get_id()).emit('draw', 'v');
      break;
    case 'draw': io.to(player.get_id()).emit('draw', card_drawn);
      io.to(enemy.get_id()).emit('draw', card_drawn);
      break;
  }
}

function construct_name_tab(card_tab) {
  var tab_name = [];
  for (var i = 0; i < card_tab.length; i++) {
    tab_name.push(card_tab[i].get_name());
  }
  return tab_name;
}
// *******



// GAME FONCTIONNMENT
// initial set
var start = function (r) {
  p1 = r.get_p1();
  p2 = r.get_p2();
  distribution(r);
  etat_du_jeu(p1, p2, 'turn', null, null);
}

var distribution = function (r) {
  console.log("Distribution...")

  Card.init(r);

  // display set in the term
  console.log("p1 : ", r.get_p1().get_id());
  Player.display_tab(r.get_p1().get_hand());

  console.log("");

  console.log("board : ", r.get_id_room());
  Player.display_tab(r.get_board());

  console.log("")

  console.log("p2 : ", r.get_p2().get_id())
  Player.display_tab(r.get_p2().get_hand());
}
// *******



// turn of p
io.on('connection', (socket) => {
  socket.on('turn', (card_name) => {
    // on retrouver le joueur grace a l'id de sa socket
    let p;
    let cpt = 0;
    while (1) {
      if (players[cpt].get_id() == socket.id) {
        p = players[cpt];
        break;
      }
      cpt++;
    }
    if (p.get_id() == p.get_his_room().get_turn()) {
      // dans get_turn il y a l'id du joueur qui doit jouer, en commmencant par p1
      first_part(p, card_name);
    } else {
      console.log("Ce n'est pas votre tour !");
    }
  });


  // first part of the turn
  function first_part(p, card_name) {
    // p est le joueur actif
    let c = p.get_his_room().init_fp(p, card_name); // retourne l'objet carte si la caret est bien dans la main de player, -1 sinon.
    if (c == -1) {
      console.log("Cette carte ne fais pas parti de votre main");
      return 2;
    }

    let tab_matchs = p.get_his_room().match(c);
    switch (tab_matchs.length) {
      case 0:
        Card.move_card(c, p.get_hand(), p.get_his_room().get_board());
        console.log("carte -> board car aucun appairage possible.");
        etat_du_jeu(p, p.get_his_mate(), 'show', null, null)
        second_part(p);
        break;
      case 1:
        console.log("Un appairage possible --> automatique");
        Card.move_card(c, p.get_hand(), p.get_depository());
        Card.move_card(tab_matchs[0], p.get_his_room().get_board(), p.get_depository());
        etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
        second_part(p);
        break;
      case 2:
        console.log("Deux appairages possible --> le joueur doit choisir");
        etat_du_jeu(p, p.get_his_mate(), 'choice', tab_matchs, null);
        Card.move_card(c, p.get_hand(), p.get_depository());
        // on bouge la carte apres avoir update le visuel, car les deux cartes doivent aller ensemble dans le depot
        break;
    }
  }
  // *******


  // second part of the turn
  function second_part(p) {
    console.log("Second part of the turn");
    let card_drawn = p.get_his_room().get_stack()[0];
    console.log('vous avez pioché : ' + card_drawn.get_name());
    etat_du_jeu(p, p.get_his_mate(), 'draw', null, card_drawn.get_name());

    let tab_matchs = p.get_his_room().match(card_drawn);
    switch (tab_matchs.length) {
      case 0:
        Card.move_card(card_drawn, p.get_his_room().get_stack(), p.get_his_room().get_board());
        console.log("carte piochée -> board car aucun appairage possible.");
        etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
        console.log("FIN DU TOUR");
        break;
      case 1:
        console.log("Un appairage possible --> automatique");
        Card.move_card(card_drawn, p.get_his_room().get_stack(), p.get_depository());
        Card.move_card(tab_matchs[0], p.get_his_room().get_board(), p.get_depository());
        etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
        console.log("FIN DU TOUR");
        break;
      case 2:
        console.log("Deux appairages possible --> le joueur doit choisir");
        etat_du_jeu(p, p.get_his_mate(), 'choice', tab_matchs, null);
        Card.move_card(card_drawn, p.get_his_room().get_stack(), p.get_depository());
        // on bouge la carte apres avoir update le visuel, car les deux cartes doivent aller ensemble dans le depot
        break;
    }
  }
  // *******


  // choice event : the player must choose between two cards on the board
  socket.on('choice', (tab) => {
    // tab[0] => flag card origin : 'h' for hand 's' for stack
    // tab[1] => card_name

    console.log("FLAG = " + tab[1]);
    let c = p.get_his_room().contain(p.get_his_room().get_board(), tab[1]); // retourne l'objet carte si la carte est bien sur le board, -1 sinon.
    if (c == -1) {
      console.log("Cette carte ne fais pas parti du board");
      return 2;
    }
    if (tab[0] == 'h') {
      console.log("HAND Joueur a choisi la carte" + tab[1] + " --> automatique");
      Card.move_card(c, p.get_his_room().get_board(), p.get_depository());
      etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
      second_part(p);
    } else {
      console.log("PILE Joueur a choisi la carte" + tab[1] + " --> automatique");
      Card.move_card(c, p.get_his_room().get_board(), p.get_depository());
      etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
      console.log("FIN DU TOUR");
    }
  });
  // *******
});
// *******