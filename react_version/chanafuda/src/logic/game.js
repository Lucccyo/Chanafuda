import Rand, {PRNG} from 'rand-seed';

const rand = new Rand('1234');
const array = [1, 2, 3, 4, 5, 6, 7, 8];

export function shuffle(array) {
  let shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand.next() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  return shuffled;
}

export function distribute(cards) {
  const shuffled = shuffle(cards);
  const ally_hand = shuffled.slice(0, 8);
  const river = shuffled.slice(8, 16);
  const ennemy_hand = shuffled.slice(16, 24);
  const stack = shuffled.slice(24);
  return [ally_hand, river, ennemy_hand, stack];
}
