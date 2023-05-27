import c1 from "../assets/sounds/correct/1.mp3";
import c2 from "../assets/sounds/correct/2.mp3";
import c3 from "../assets/sounds/correct/3.mp3";
import c4 from "../assets/sounds/correct/4.mp3";
import w1 from "../assets/sounds/wrong/1.mp3";
import w2 from "../assets/sounds/wrong/2.mp3";
import w3 from "../assets/sounds/wrong/3.mp3";
import w4 from "../assets/sounds/wrong/4.mp3";
import w5 from "../assets/sounds/wrong/5.mp3";
const corrects = [c1, c2, c3, c4].map(x => new Audio(x));
const wrongs = [w1, w2, w3, w4, w5].map(x => new Audio(x));
const ctx = new AudioContext();

export function playSound(correct: boolean) {
  let play;
  if (correct) {
    play = corrects[Math.floor(Math.random() * corrects.length)];
  } else {
    play = wrongs[Math.floor(Math.random() * wrongs.length)];
  }
  corrects.forEach(x => { x.pause(); x.currentTime = 0; });
  wrongs.forEach(x => { x.pause(); x.currentTime = 0; });
  play.play();
}