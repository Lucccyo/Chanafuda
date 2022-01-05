const Room = require('./classes/Room.js')
const Player = require('./classes/Player.js')
const Card = require('./classes/Card.js')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { distribute } = require('./classes/Card.js');
const io = new Server(server);


let nb_room = 0;
let room_temp = null;
let players = [];


// connection with web page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/game.html');
});


// waiting clients
server.listen(3000, () => {
  console.log('listening on *:3000');
  var public_stack = new Array;
  Card.script_cards(public_stack);
  // Player.display_tab(public_stack);
  // Object.freeze(public_stack);
  // public_stack = 'k';
  // console.log(public_stack);
});


// new connection
io.on('connection', (socket) => {

  p = new Player(socket.id);
  players.push(p);
  console.log(p.get_id(), ' connected');

  // give him a gameroom
  if(room_temp == null) {
    personal_stack = Array.from(public_stack);
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
  io.to(p1.get_id()).emit('enemy', p2_hand_name);

  io.to(p2.get_id()).emit('perso', p2_hand_name);
  io.to(p2.get_id()).emit('enemy', p1_hand_name);

  io.to(p1.get_id()).emit('board', board_hand_name);
  io.to(p2.get_id()).emit('board', board_hand_name);
}

function construct_name_tab(card_tab) {
  var tab_name = [];
  for(var i = 0 ; i <card_tab.length ; i++) {
    tab_name.push(card_tab[i].get_name_show());
  }
  return tab_name;
}


var distribution = function (r) {
  console.log("Distribution...")

  Card.init(r.get_p1().get_hand(), r.get_p2().get_hand(), r.get_board());

  // affichage term
  console.log("p1 : ", r.get_p1().get_id());
  Player.display_tab(r.get_p1().get_hand());

  console.log("");

  console.log("board : ", r.get_id_room());
  Player.display_tab(r.get_board());

  // console.log(Player.display_tab(r.get_board()));
  //avec le console.log, un undefined apparait a la fin du tab. pasque double display ? on essaye de display un \0?

  console.log("")

  console.log("p2 : ", r.get_p2().get_id())
  Player.display_tab(r.get_p2().get_hand());
}

// a socket send a msg, we want this msg appear only on his room
io.on('connection', (socket) => {
  socket.on('chat message', () => {
    let sender;
    // we search the sender id to know his opponent
    for(i = 0 ; i < players.length ; i++) {
      if(socket.id == players[i].get_id()) {
        sender = players[i];
      }
    }
    target_id = sender.get_his_mate_id();

    // the msg is displayed on the room
    io.to(target_id).emit('chat message', "hi");
    io.to(socket.id).emit('chat message', msg);
  });
});