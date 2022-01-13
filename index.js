const Room = require('./classes/Room.js')
const Player = require('./classes/Player.js')
const Card = require('./classes/Card.js')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { distribute } = require('./classes/Card.js');
const { match } = require('assert');
const io = new Server(server);


let nb_room = 0;
let room_temp = null;
let players = [];


// connection with web page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game.html');
});

// waiting clients
var public_stack = new Array();
server.listen(3000, () => {
  console.log('listening on *:3000');
  Card.script_cards(public_stack);
});


// new connection
io.on('connection', (socket) => {

  p = new Player(socket.id);
  players.push(p);
  console.log(p.get_id(), ' connected');

  // give him a gameroom
  if (room_temp == null) {
    personal_stack = Array.from(public_stack);    //création copie du tableau trié de carte pour cette room
    r = new Room(nb_room, p, personal_stack);
    p.go_to_room(r);
    room_temp = r;
    nb_room++;
  } else {
    room_temp.add_p2(p);
    p.go_to_room(room_temp);
    //game starts
    start(room_temp);
    room_temp = null;
  }

  // display where he is
  console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });
});


var start = function (r) {
  p1 = r.get_p1();
  p2 = r.get_p2();

  distribution(r);

  // construction du tableau de noms de cartes; plus tard tab de nom d'image
  var p1_hand_name = construct_name_tab(p1.get_hand());
  var p2_hand_name = construct_name_tab(p2.get_hand());
  var board_hand_name = construct_name_tab(r.get_board());

  io.to(p1.get_id()).emit('perso', p1_hand_name);
  io.to(p1.get_id()).emit('enemy', p2_hand_name.length);

  io.to(p2.get_id()).emit('perso', p2_hand_name);
  io.to(p2.get_id()).emit('enemy', p1_hand_name.length);

  io.to(p1.get_id()).emit('board', board_hand_name);
  io.to(p2.get_id()).emit('board', board_hand_name);
}


function construct_name_tab(card_tab) {
  var tab_name = [];
  for (var i = 0; i < card_tab.length; i++) {
    tab_name.push(card_tab[i].get_name());
  }
  return tab_name;
}


var distribution = function (r) {
  console.log("Distribution...")

  r.set_stack(Card.init(r));

  console.log("p1 : ", r.get_p1().get_id());
  Player.display_tab(r.get_p1().get_hand());

  console.log("");

  console.log("board : ", r.get_id_room());
  Player.display_tab(r.get_board());

  console.log("")

  console.log("p2 : ", r.get_p2().get_id())
  Player.display_tab(r.get_p2().get_hand());
}


io.on('connection', (socket) => {
  socket.on('first_part', (card_name) => {

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
    if (!p.get_is_p1()) {
      console.log("Ce n'est pas votre tour");

    } else {
      let c = p.get_his_room().init_fp(p, card_name); // retourne l'objet carte si la caret est bien dans la main de player, -1 sinon.
      if (c == -1) {
        console.log("You are cheating");
        return 2;
      }
      let tab_matchs = p.get_his_room().match(c);
      console.log(p.get_is_p1());
      switch (tab_matchs.length) {
        case 0:
          Card.move_card(c, p.get_hand(), p.get_his_room().get_board());
          console.log("carte -> board car aucun appairage possible.");

          io.to(p.get_id()).emit('board', construct_name_tab(p.get_his_room().get_board()));
          io.to(p.get_his_room().get_p2().get_id()).emit('board', construct_name_tab(p.get_his_room().get_board()));

          io.to(p.get_id()).emit('perso', construct_name_tab(p.get_hand()));
          io.to(p.get_id()).emit('enemy', p.get_his_room().get_p2().get_hand().length);

          io.to(p.get_his_room().get_p2().get_id()).emit('perso', construct_name_tab(p.get_his_room().get_p2().get_hand()));
          io.to(p.get_his_room().get_p2().get_id()).emit('enemy', p.get_hand().length);
          break;
        case 1 : 
          console.log("Un appairage possible --> automatique");
          Card.move_card(c, p.get_hand(), p.get_depository());
          Card.move_card(tab_matchs[0], p.get_his_room().get_board(), p.get_depository());

          io.to(p.get_id()).emit('board', construct_name_tab(p.get_his_room().get_board()));
          io.to(p.get_his_room().get_p2().get_id()).emit('board', construct_name_tab(p.get_his_room().get_board()));

          io.to(p.get_id()).emit('perso', construct_name_tab(p.get_hand()));
          io.to(p.get_id()).emit('enemy', p.get_his_room().get_p2().get_hand().length);

          io.to(p.get_his_room().get_p2().get_id()).emit('perso', construct_name_tab(p.get_his_room().get_p2().get_hand()));
          io.to(p.get_his_room().get_p2().get_id()).emit('enemy', p.get_hand().length);
          break;
        case 2 : 
          let tab_id = new Array();
          for(let i = 0 ; i < p.get_his_room().get_board().length ; i++) {
            if(p.get_his_room().get_board()[i] == tab_matchs[0] || p.get_his_room().get_board()[i] == tab_matchs[1]) {
              tab_id.push(i);
            }
          }
          Player.display_tab(tab_id);
          io.to(p.get_id()).emit('choice', tab_id);
          console.log('envoyé');
          break;
        default : console.log("Pas normal");
        break;
      }


      
      // io.to(p1.get_id()).emit('perso', p1_hand_name);
      // io.to(p1.get_id()).emit('enemy', p2_hand_name.length);

      // io.to(p2.get_id()).emit('perso', p2_hand_name);
      // io.to(p2.get_id()).emit('enemy', p1_hand_name.length);

      // io.to(p1.get_id()).emit('board', board_hand_name);
      // io.to(p2.get_id()).emit('board', board_hand_name);

    }
  });
});



// function match(card_name, board) {

// }