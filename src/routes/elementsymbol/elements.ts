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
export function choice() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let result = null;
    const a = Math.random() > 0.5;
    if (a) {
      result = symbols[Math.floor(Math.random() * (symbols.length - 1))];
      result = result[Math.floor(Math.random() * result.length)];
    } else {
      result = names[Math.floor(Math.random() * (names.length - 1))];
      result = result[Math.floor(Math.random() * result.length)];
    }
    if (result !== null && !result.includes("*")) {
      return result;
    }
  }
}