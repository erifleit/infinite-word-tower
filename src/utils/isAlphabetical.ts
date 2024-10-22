export const isAlphabeticCharacter = (input: string) => {
  return /^[a-zA-Z]$/.test(input) || input === "";
};
