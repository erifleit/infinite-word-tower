import { useMemo } from "react";
import { ERRORS, MARGIN, RED, TEXT_COLOR } from "../../constants";
import { useMessage } from "./useMessage";

const MessageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: TEXT_COLOR,
};

const ErrorMessageStyle = {
  ...MessageStyle,
  color: RED,
};

export const Message = () => {
  const { displayMessage, content, tryAgain, error } = useMessage();

  const style = useMemo(
    () => (error ? ErrorMessageStyle : MessageStyle),
    [error]
  );

  return (
    <div style={style} className="message">
      {error || displayMessage ? content : ""}
      {error === ERRORS.ERROR_CHECKING && (
        <div
          style={{ color: "blue", cursor: "pointer", margin: MARGIN }}
          onClick={tryAgain}
        >
          Try Again
        </div>
      )}
    </div>
  );
};
