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
app.use(express.static('./style'));
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
  console.log('');
  Card.script2_cards();
});
// *******


// new connection
io.on('connection', (socket) => {
  p = new Player(socket.id);
  players.push(p);

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
    console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());
    console.log('');
    console.log("-- Game start");
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
  io.to(player.get_id()).emit('depo_perso', construct_name_tab(player.get_depository()));
  io.to(player.get_id()).emit('depo_enemy', construct_name_tab(enemy.get_depository()));

  io.to(enemy.get_id()).emit('perso', construct_name_tab(enemy.get_hand()));
  io.to(enemy.get_id()).emit('enemy', player.get_hand().length);
  io.to(enemy.get_id()).emit('board', construct_name_tab(player.get_his_room().get_board()));
  io.to(enemy.get_id()).emit('pile', player.get_his_room().get_stack().length);
  io.to(enemy.get_id()).emit('depo_enemy', construct_name_tab(player.get_depository()));
  io.to(enemy.get_id()).emit('depo_perso', construct_name_tab(enemy.get_depository()));

  switch (flag) {
    case 'turn': io.to(player.get_id()).emit('playable', construct_name_tab(player.get_hand()));
      // io.to(player.get_id()).emit('draw', 'v');
      // io.to(enemy.get_id()).emit('draw', 'v');
      break;
    case 'choice': console.log('choice  ----------'); io.to(player.get_id()).emit('playable', construct_name_tab(tab_match));
      break;
    case 'show':

      break;
    case 'draw':
      // io.to(player.get_id()).emit('draw', card_drawn);
      // io.to(enemy.get_id()).emit('draw', card_drawn);
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
  console.log("-- Distribution...");
  distribution(r);
  etat_du_jeu(p1, p2, 'turn', null, null);
}

var distribution = function (r) {
  Card.init(r);

}
// *******



// turn of p
io.on('connection', (socket) => {
  let p;
  socket.on('turn', (card_name) => {
    // on retrouver le joueur grace a l'id de sa socket
    let cpt = 0;
    while (1) {
      if (players[cpt].get_id() == socket.id) {
        p = players[cpt];
        break;
      }
      cpt++;
    }
    let card = p.get_his_room().contain(p.get_hand(), card_name);
    if (card != -1) first_part(p, card);
    else console.log("CHEATING");
  });

  var in_fp;
  // first part of the turn
  function first_part(p, card) {
    console.log('');
    console.log("-- Tour de " + p.get_id());
    console.log('- Première partie');
    console.log('Vous avez choisi la carte ' + card.get_name());
    in_fp = true;
    let r = p.get_his_room();

    let a = r.match_analysis(r.match(card), card, p.get_hand(), p);
    if (a != null) {
      etat_du_jeu(p, p.get_his_mate(), 'choice', a, null);
      Card.move_card(card, p.get_hand(), p.get_depository());
    } else {
      etat_du_jeu(p, p.get_his_mate(), 'show', null, null)
      second_part(p);
    }
    // traite les differents cas et effectue les opérations de mouvements sur les cartes


  }
  // *******


  // second part of the turn
  function second_part(p) {
    in_fp = false;
    console.log('- Seconde partie');
    let card_drawn = p.get_his_room().get_stack()[0];
    console.log('Carte piochée : ' + card_drawn.get_name());

    etat_du_jeu(p, p.get_his_mate(), 'draw', null, card_drawn.get_name());

    let r = p.get_his_room();
    let a = r.match_analysis(r.match(card_drawn), card_drawn, r.get_stack(), p);
    if (a != null) {
      etat_du_jeu(p, p.get_his_mate(), 'choice', a, null);
      Card.move_card(card_drawn, p.get_his_room().get_stack(), p.get_depository());

    } else {
      etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
      if (p.get_points() != p.point_analysis()) {
        console.log("Points ajoutés : " + (p.point_analysis() - p.get_points()));
        p.set_points(p.point_analysis());
      }
      console.log("points du joueur = " + p.get_points());

      console.log("tour_suivant");
      etat_du_jeu(p.get_his_mate(), p, 'turn', null, null);
    }
  }
  // *******


  // choice event : the player must choose between two cards on the board
  socket.on('choice', (card_name) => {
    let c = p.get_his_room().contain(p.get_his_room().get_board(), card_name); // retourne l'objet carte si la carte est bien sur le board, -1 sinon.
    if (c == -1) {
      console.log("Cette carte ne fais pas parti du board");
      return 2;
    }
    if (in_fp) {
      console.log("La carte choisie est : " + card_name);
      Card.move_card(c, p.get_his_room().get_board(), p.get_depository());
      etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
      second_part(p);
    } else {
      console.log("La carte choisie est : " + card_name);
      Card.move_card(c, p.get_his_room().get_board(), p.get_depository());
      etat_du_jeu(p, p.get_his_mate(), 'show', null, null);
      console.log("points du joueur = " + p.point_analysis());
      console.log("tour_suivant");
      etat_du_jeu(p.get_his_mate(), p, 'turn', null, null);
    }
  });
  // *******


});

// *******