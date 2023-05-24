//しゃべるのさ！
export default function speak(word: string) {
  const uttr = new SpeechSynthesisUtterance(word);

  // 言語を設定
  uttr.lang = "en-US";

  // 速度を設定 
  uttr.rate = 0.75;

  // 高さを設定
  uttr.pitch = 1;

  // 音量を設定
  uttr.volume = 1;

  window.speechSynthesis.cancel();
  // 発言を再生 (必須)
  window.speechSynthesis.speak(uttr);
}
export function speakJapanese(word: string) {
  const uttr = new SpeechSynthesisUtterance(word);
  console.log(speechSynthesis.getVoices());

  // 言語を設定
  uttr.lang = "ja-JP";

  // 速度を設定 
  uttr.rate = 0.75;

  // 高さを設定
  uttr.pitch = 1;

  // 音量を設定
  uttr.volume = 1;

  window.speechSynthesis.cancel();
  // 発言を再生 (必須)
  window.speechSynthesis.speak(uttr);
}