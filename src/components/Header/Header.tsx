import { BACKGROUND_COLOR, TEXT_COLOR } from "../../constants";
import { useHeader } from "./useHeader";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Header = () => {
  const { score, bestScore } = useHeader();

  return (
    <div className="Header">
      <div
        className="TitleContainer"
        style={{ color: TEXT_COLOR, backgroundColor: BACKGROUND_COLOR }}
      >
        <div className="Title">Infinite Word Tower</div>
        <div
          className="Score"
          style={{ backgroundColor: BACKGROUND_COLOR, paddingBottom: 10 }}
        >
          <div>Score: {score}</div>
          <div>Best Score: {bestScore}</div>
          <div
            className="Meatball"
            style={{
              backgroundColor: "#3c4e5b",
              aspectRatio: "1/1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              color: BACKGROUND_COLOR,
              cursor: "pointer",
            }}
          >
            <i className="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>
      <div className="Padding" />
    </div>
  );
};
