import CryptoJS from "crypto-js";

const hashString = (str: string) => {
  return CryptoJS.SHA256(str).toString();
};

export const getSavedWord = (word: string) => {
  const hashed = hashString(word);
  const savedFailedWord = localStorage.getItem(hashed);
  return savedFailedWord;
};

export const addSavedWord = (word: string, response: string) => {
  const hashed = hashString(word);

  // Retrieve or initialize cache index
  const cacheIndex = JSON.parse(localStorage.getItem("cacheIndex") || "[]");

  // If cache exceeds 100, remove the oldest entry
  if (cacheIndex.length >= 100) {
    const oldestHash = cacheIndex.shift(); // Remove the oldest hash
    localStorage.removeItem(oldestHash); // Remove corresponding item
  }

  // Add new word to cache and update the cache index
  cacheIndex.push(hashed);
  localStorage.setItem("cacheIndex", JSON.stringify(cacheIndex));
  localStorage.setItem(hashed, response);
};
