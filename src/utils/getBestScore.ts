export const getBestScore = () => {
  const savedScore = localStorage.getItem("bestScore");
  return savedScore ? JSON.parse(savedScore) : 0;
};
