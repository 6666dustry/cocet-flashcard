/**
 * 
 * @param word A string to speak.
 * @param options Speaking options.
 */
export default function speak(word: string, options?: {
  /**
   * The language of the speech.
   * @default "en-US"
   */
  lang?: "ja-JP" | "en-US" | string,
  /**
   * The speed of the speech.
   * @default 0.75
   */
  rate?: number,
  /**
   * The height of the speech.
   * @default 1
   */
  pitch?: number,
  /**
   * The volume of the speech.
   * @default 1
   */
  volume?: number,
  /**
   * If true, cancel the speech before speaking.
   * @default false
   */
  cancelBefore?: boolean;
  /**
   * If true, the speech will be repeated.
   * @default false
   */
  loop?: boolean;
}) {
  const uttr = new SpeechSynthesisUtterance(word);
  // 言語を設定
  uttr.lang = options?.lang || "en-US";

  // 速度を設定 
  uttr.rate = options?.rate || 0.75;

  // 高さを設定
  uttr.pitch = options?.pitch || 1;

  // 音量を設定
  uttr.volume = options?.volume || 1;

  if (options?.cancelBefore !== false) {
    window.speechSynthesis.cancel();
  }
  if (options?.loop) {
    uttr.onend = () => {
      window.speechSynthesis.speak(uttr);
    };
  }
  // 発言を再生 (必須)
  window.speechSynthesis.speak(uttr);
  return uttr;
}