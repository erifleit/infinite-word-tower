export const updateWord = (word: string, key: string) =>
  key === "Backspace"
    ? word.slice(0, -1)
    : word.length < 5
    ? `${word}${key.toUpperCase()}`
    : word;
