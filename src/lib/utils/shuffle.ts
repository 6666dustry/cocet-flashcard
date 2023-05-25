export function shuffle<T extends unknown[]>(array: T): T {
  const result: T = [...array] as T;
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * array.length);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}