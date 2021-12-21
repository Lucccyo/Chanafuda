const Room = require('./functions/Room.js')
const Player = require('./functions/Player.js')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


let nb_room = 0;
let room_temp = null;
let players = [];




// init
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});




/* serveur en ecoute = attente de clients */
server.listen(3000, () => {
  console.log('listening on *:3000');
});

const { is } = require("express/lib/request");




// new connection
io.on('connection', (socket) => {

  // new player connected
  p = new Player(socket.id);
  players.push(p);
  console.log(p.get_id(), ' connected');

  // give him a gameroom
  if(room_temp == null) {
    r = new Room(nb_room, p.get_id());
    p.go_to_room(r);
    room_temp = r;
    nb_room++;
  } else {
    room_temp.add_p2(p.get_id());
    p.go_to_room(room_temp);
    room_temp = null;
  }

  // display where he is
  console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());

  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });
});




// a socket send a msg, we want this msg appear only on his room
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    let sender;
    let target_id;
    // we search the sender id to know his opponent
    for(i = 0 ; i < players.length ; i++) {
      if(socket.id == players[i].get_id()) {
        sender = players[i];
      }
    }

    let his_room = sender.get_his_room();

    if(sender.get_id() == his_room.get_p1()) {
      target_id = his_room.get_p2();
    } else {
      target_id = his_room.get_p1();
    }

    // the msg is displayed on the room
    io.to(target_id).emit('chat message', msg);
    io.to(socket.id).emit('chat message', msg);
  });
});