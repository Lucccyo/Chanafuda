class Player {
  id;
  hand;
  depository;
  points;
  his_room;

  constructor(id) {
    this.id = id;
    this.hand = new Array();
    this.depository = new Array();
    this.points = 0;
  }

  go_to_room(room) {
    this.his_room = room;
  }

  // display function
  static display_tab(tab) {
    for (var i = 0; i < tab.length; i++) {
      console.log(tab[i]);
    }
  }
  // *******


  // getters
  get_id() {
    return this.id;
  }

  get_his_room() {
    return this.his_room;
  }

  get_hand() {
    return this.hand;
  }

  get_depository() {
    return this.depository;
  }

  get_his_mate() {
    let his_room = this.get_his_room();
    let mate;
    if (this.get_his_room()) {
      if (this.get_id() == his_room.get_p1().get_id()) {
        mate = his_room.get_p2();
      } else {
        mate = his_room.get_p1();
      }
      return mate;
    } else {
      return 0;
    }
  }

  get_his_mate_id() {
    let his_room = this.get_his_room();
    let target_id;
    if (this.get_his_room()) {

      if (this.get_id() == his_room.get_p1().get_id()) {
        target_id = his_room.get_p2().get_id();
      } else {
        target_id = his_room.get_p1().get_id();
      }
      return target_id;
    } else {
      return 0;
    }
  }
  // *******

  get_points() {
    return this.points;
  }

  set_points(points) {
    this.points = points;
  }

  point_analysis() {
    // console.log("Analysis..................................");
    if (this.depository == null) return 0;
    // console.log("Analysis.......................non nul");
    let sum = 0;
    let count_plain = 0;
    let count_ribbon = 0;
    let count_poetry_ribbon = 0;
    let count_blue_ribbon = 0;
    let count_animal = 0;
    let count_ISC = 0;
    let count_bright = 0;
    let count_moon_sake = 0;
    let count_flowery_sake = 0;
    let contain_rainMan = false;
    let contain_ISC = false;
    let contain_3poetry = false;
    let contain_3blue = false;

    for (let i = 0; i < this.depository.length; i++) {
      // console.log(this.depository[i])
      // Plain
      if (this.depository[i].get_type()[0] == '0') {
        count_plain++;
        continue;
      }
      // Ribbon
      if (this.depository[i].get_type()[0] == 'R') {
        count_ribbon++;
        // Poetry
        if (this.depository[i].get_type()[1] == 'P') {
          count_poetry_ribbon++;
          if (count_poetry_ribbon == 3) contain_3poetry = true;
          continue;
        }
        // Blue
        if (this.depository[i].get_type()[1] == 'B') {
          count_blue_ribbon++;
          if (count_blue_ribbon == 3) contain_3blue = true;
        }
        continue;
      }


      // Animals
      if (this.depository[i].get_type()[0] == 'A') {
        count_animal++;
        //Ino Shika Cho
        if (this.depository[i].get_type()[1] == ('I' || 'S' || 'C')) {
          count_ISC++;
          if (count_ISC == 3) contain_ISC = true;
          continue;
        }
        if (this.depository[i].get_type()[1] == 'W') {
          count_flowery_sake++;
          count_moon_sake++;
        }
        continue;
      }


      // Bright
      if (this.depository[i].get_type()[0] == 'B') {
        count_bright++;

        if (this.depository[i].get_type()[1] == 'R') {
          contain_rainMan = true;
          continue;
        }

        if (this.depository[i].get_type()[1] == 'M') {
          count_moon_sake++;
          continue;
        }

        if (this.depository[i].get_type()[1] == 'C') {
          count_flowery_sake++;
        }
      }
    }

    if (count_plain >= 10) sum += count_plain - 9;

    if (count_moon_sake == 2) sum += 5;
    if (count_flowery_sake == 2) sum += 5;

    if (count_animal >= 5 && !contain_ISC) sum += count_animal - 4;
    if (contain_ISC) sum = + 5 + (count_animal - 3);

    if (!contain_3poetry && !!contain_3blue && count_ribbon >= 5) sum += count_ribbon - 4;
    if (contain_3poetry && contain_3blue) sum += 10 + (count_ribbon - 6);
    if (contain_3poetry ^ contain_3blue) sum += 5 + (count_ribbon - 3);

    if (!contain_rainMan && count_bright == 3) sum += 3;
    if (contain_rainMan && count_bright == 4) sum += 7;
    if (!contain_rainMan && count_bright == 4) sum += 8;
    if (count_bright == 5) sum += 10;

    return sum;
  }
}

module.exports = Player