export const updateLocalStorageBestScore = (score: number) => {
  localStorage.setItem("bestScore", JSON.stringify(score));
};
