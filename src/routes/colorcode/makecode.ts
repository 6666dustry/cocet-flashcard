const codes = {
  black: [0, 0, 1e0],
  brown: [1, 1, 1e1, 1],
  red: [2, 2, 1e2, 2],
  orange: [3, 3, 1e3],
  yellow: [4, 4, 1e4],
  green: [5, 5, 1e5],
  blue: [6, 6, 1e6],
  purple: [7, 7, 1e7],
  gray: [8, 8, 1e8],
  white: [9, 9, 1e9],
  silver: [null, null, 1e-2, 5],
  gold: [null, null, 1e-1, 10],
  none: [null, null, null, 20]
};
type key = (keyof typeof codes)[];
const hasOne: key = Object.keys(codes).slice(0, 10) as key;
const hasTwo: key = Object.keys(codes).slice(0, 10) as key;
const hasThree: key = Object.keys(codes).slice(0, 12) as key;

const hasFour: key = ["brown", "red", "silver", "gold", "none"];
function rnd<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}
export function makeCode() {
  const colors: (keyof typeof codes)[] = [rnd(hasOne), rnd(hasTwo), rnd(hasThree), rnd(hasFour)];
  const values = [10 * (codes[colors[0]][0] ?? 0), (codes[colors[1]][1] ?? 0), (codes[colors[2]][2] ?? 0)];
  return {
    values,
    colors,
    value: (10 * (codes[colors[0]][0] ?? 0) + (codes[colors[1]][1] ?? 0)) * (codes[colors[2]][2] ?? 0)
  };
}
