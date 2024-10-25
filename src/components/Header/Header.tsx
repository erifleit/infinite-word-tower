import { useHeader } from "./useHeader";

export const Header = () => {
  const { score, bestScore } = useHeader();

  return (
    <div className="Header">
      <div className="TitleContainer">
        <div className="Title">Infinite Word Tower</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "white",
            width: "100%",
          }}
        >
          <div>Score: {score}</div>
          <div>Best Score: {bestScore}</div>
        </div>
      </div>
      <div className="Padding" />
    </div>
  );
};
