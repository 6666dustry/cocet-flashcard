import { writable } from "svelte/store";
export const modes: [
  cocet: "COCET FLASH CARD",
  colorCode: "COLOR CODE FLASH CARD",
  element: "ELEMENT SYMBOL FLASH CARD",
] = [
    "COCET FLASH CARD",
    "COLOR CODE FLASH CARD",
    "ELEMENT SYMBOL FLASH CARD",
  ];
export const links = [
  "/",
  "/colorcode",
  "/elementsymbol",
];

export const mode = writable(0);