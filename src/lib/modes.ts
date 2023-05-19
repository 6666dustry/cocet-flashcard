import { writable, type Writable } from "svelte/store";
type valueOf<T> = T[T[keyof T] extends number ? keyof T : never];
export const modes: [
  cocet: "COCET FLASH CARD",
  colorCode: "COLOR CODE FLASH CARD",
  element: "ELEMENT SYMBOL FLASH CARD",
] = [
    "COCET FLASH CARD",
    "COLOR CODE FLASH CARD",
    "ELEMENT SYMBOL FLASH CARD",
  ];
export const mode: Writable<valueOf<typeof modes>> = writable("COCET FLASH CARD");