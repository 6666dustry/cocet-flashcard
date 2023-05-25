import { shuffle } from '$lib/utils/shuffle.js';
import { symbols, names } from './elements.json';

let number = 0;
export const elements = symbols.map((v, i) => {
  return v.map((value, index) => {
    let name = null;
    if (names[i] && names[i][index]) {
      name = names[i][index];
    }
    if (value) {
      if (value === '*' || value === '**') {
        number += 15;
      } else {
        number++;
      }
    }
    return {
      symbol: value,
      name,
      number
    };
  });
});
let shuffled = shuffle(names.slice(0, 6).flat().concat(symbols.slice(0, 6).flat())), index = 0;
/**
 * 
 * @returns returns random element name/symbol .
 */
export function choice() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (index >= shuffled.length) {
      shuffled = shuffle(names.flat().concat(symbols.flat()));
      index = 0;
    }
    const result = shuffled[index++];

    if (result !== null && !result.includes("*") && result !== "ランタノイド" && result !== "アクチノイド") {
      return result;
    }
  }
}