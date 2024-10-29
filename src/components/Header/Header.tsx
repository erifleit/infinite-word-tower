import { useUIState } from "../../store";
import { useHeader } from "./useHeader";

export const Header = () => {
  const {
    score,
    bestScore,
    openModal,
    showKeyboard,
    hideKeyboard,
    keyboardVisible,
  } = useHeader();

  return (
    <div className="Header">
      <div className="TitleContainer">
        <div className="Title">Infinite Word Tower</div>
        <div className="Score">
          <div>Score: {score}</div>
          <div>Best Score: {bestScore}</div>
          <div
            className="options"
            onClick={keyboardVisible ? hideKeyboard : showKeyboard}
          >
            {keyboardVisible ? "hide keyboard" : "show keyboard"}
          </div>
        </div>
      </div>
      <div className="Padding" />
    </div>
  );
};
