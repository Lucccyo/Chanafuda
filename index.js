const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let nb_room = 0;
let rooms = [];

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
  console.log(socket.id, ' connected');
  
  // si la derniere room du tableau est pleine ou si il n'y a aucune room = on en créé une nouvelle
  // sinon on ajoute le deuxieme joueur a la room
  if(rooms.at(rooms.length).get_is_locked() || rooms.length == 0) {
    rooms.push(new Room(nb_room, socket.id));
    nb_room++;
  } else {
    rooms.length().add_p2(socket);
  }

  console.log(socket.id, ' on room n° ', rooms.length.get_id_room);

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