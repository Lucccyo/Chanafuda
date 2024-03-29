var socket = io();

    var enemy_stack = document.getElementById('enemy');
    var perso_stack = document.getElementById('perso');
    var board_top = document.getElementById('board_top');
    var board_bot = document.getElementById('board_bot');
    var tas = document.getElementById('tas');

    // my cards
    socket.on('perso', function (tab) {
      perso_stack.innerHTML = '';
      for (let i = 0; i < tab.length; i++) {
        add_card(tab[i], perso_stack);
      }
    });

    function add_card(nom, stack) {
      var div = document.createElement("div");
      div.classList.add('carte');
      div.classList.add('v');
      card_name = 'c'.concat('', nom);
      div.setAttribute('id', card_name);
      div.innerText = nom;
      stack.append(div);
    }
    // *******


    // enemy cards
    socket.on('enemy', function (nb_card) {
      enemy_stack.innerHTML = '';
      for (let i = 0; i < nb_card; i++) {
        add_enemy_card();
      }
    });

    function add_enemy_card() {
      var div = document.createElement("div");
      div.classList.add('carte');
      enemy_stack.append(div);
    }
    // *******


    // board cards
    socket.on('board', function (tab) {
      board_bot.innerHTML = '';
      board_top.innerHTML = '';
      for (let i = 0; i < tab.length; i++) {
        if (i % 2 == 0) {
          add_board_card(tab[i], board_top, i);
        } else {
          add_board_card(tab[i], board_bot, i);
        }
      }
    });

    function add_board_card(nom, stack, index) {
      var div = document.createElement("div");
      div.classList.add('carte');
      div.classList.add('v');
      div.setAttribute('id', index);
      card_name = 'c'.concat('', nom);
      div.setAttribute('id', card_name);
      div.innerText = nom;
      stack.append(div);
    }
    // *******


    // playable cards
    socket.on('playable', function (tab) {
      for (let i = 0; i < tab.length; i++) {
        var div = document.getElementById('c'.concat('', tab[i]))
        var p = document.createElement("button");
        p.onclick = function () {

          if (((div.parentNode).id) == 'perso') {
            send_card_turn(tab[i]);
          } else {
            send_card_choice(tab[i]);
          }
        }
        div.appendChild(p);
      }
    });

    function send_card_turn(card_n) {
      // envoie de la carte cliquée
      socket.emit('turn', card_n);
    }

    function send_card_choice(card_choose) {
      // envoie de la carte cliquée
      socket.emit('choice', card_choose);
    }
    // *******


    // number of cards in stack
    socket.on('pile', function (nb_card) {
      console.log("Dans la pile, il y a " + nb_card + " cartes.");
    });
    // *******


    // display wich card is drawn
    socket.on('draw', function (card_name) {
      if (card_name == 'v') {
        tas.textContent = '';
        console.log(card_name);
      } else {
        tas.textContent = card_name;
        console.log(card_name);
      }
    });
// *******