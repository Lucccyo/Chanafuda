const Room = require('./classes/Room.js')
const Player = require('./classes/Player.js')
const Card = require('./classes/Card.js')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


let nb_room = 0;
let room_temp = null;
let players = [];




// connection with web page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});




/* serveur en ecoute = attente de clients */
server.listen(3000, () => {
  console.log('listening on *:3000');
});





// new connection
io.on('connection', (socket) => {

  // new player connected
  p = new Player(socket.id);
  players.push(p);
  console.log(p.get_id(), ' connected');

  // give him a gameroom
  var begin = false;
  if(room_temp == null) {
    r = new Room(nb_room, p);
    p.go_to_room(r);
    room_temp = r;
    nb_room++;
  } else {
    begin = true;
    room_temp.add_p2(p);
    p.go_to_room(room_temp);
    room_temp = null;
  }

  // display where he is
  console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());

  if(begin) {
    console.log("Distribution...")
    var r = p.get_his_room();
    Card.init(r.get_p1().get_hand(), r.get_p2().get_hand(), r.get_board());

    // pourquoi un undefined a la fin de chaque affichage?  

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







  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });
});




// a socket send a msg, we want this msg appear only on his room
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    let sender;
    // we search the sender id to know his opponent
    for(i = 0 ; i < players.length ; i++) {
      if(socket.id == players[i].get_id()) {
        sender = players[i];
      }
    }

    // let his_room = sender.get_his_room();

    // if(sender.get_id() == his_room.get_p1()) {
    //   target_id = his_room.get_p2();
    // } else {
    //   target_id = his_room.get_p1();
    // }

    target_id = sender.get_his_mate_id();

    // the msg is displayed on the room
    io.to(target_id).emit('chat message', msg);
    io.to(socket.id).emit('chat message', msg);
  });
});