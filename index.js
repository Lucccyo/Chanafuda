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

/* init */

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/* serveur en ecoute = attente de clients */
server.listen(3000, () => {
  console.log('listening on *:3000');
});

/***************/

const { is } = require("express/lib/request");

/* nouveau client arrivé */
io.on('connection', (socket) => {

  // new player connected
  p = new Player(socket.id);
  console.log(p.get_id(), ' connected');

  // give him a gameroom
  if(room_temp == null) {
    console.log("premier player");
    r = new Room(nb_room, p.get_id());
    p.go_to_room(r);
    room_temp = r;
    nb_room++;
  } else {
    console.log("deuxieme player");
    room_temp.add_p2(p.get_id());
    p.go_to_room(room_temp);
    room_temp = null;
  }

  console.log(socket.id, ' on room n° ', p.get_his_room().get_id_room());



  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });
});

/* le serv recoit un msg et le transmet a toutes ses sc */
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});