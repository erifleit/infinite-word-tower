import { useHeader } from "./useHeader";

export const Header = () => {
  const { score, bestScore } = useHeader();

  return (
    <div className="Header">
      <div className="TitleContainer">
        <div className="Title">Infinite Word Tower</div>
        <div className="Score">
          <div>Score: {score}</div>
          <div>Best Score: {bestScore}</div>
          <div className="options">Options</div>
        </div>
      </div>
      <div className="Padding" />
    </div>
  );
};
