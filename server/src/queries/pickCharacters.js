// 5 knights
// 3 minions
// Percival
// Merlin
// Morgana
import characters from './characters';


const pickCharacter = (characters) => {
  const character = characters[Math.floor(Math.random()*items.length)];
  const ind = characters.indexOf(character);
  delete characters[ind];

  return character;
}

export default pickCharacter;
