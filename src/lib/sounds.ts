export function playSound(correct: boolean) {
  if (correct) {
    new Audio(`../../static/sound/correct/${ Math.floor(Math.random() * 4 + 1) }.mp3`).play();
  } else {
    new Audio(`../../static/sound/wrong/${ Math.floor(Math.random() * 5 + 1) }.mp3`).play();
  }
}