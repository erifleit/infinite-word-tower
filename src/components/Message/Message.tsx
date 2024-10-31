import { useMemo } from "react";
import { ERRORS, MARGIN } from "../../constants";
import { useMessage } from "./useMessage";

const MessageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ErrorMessageStyle = {
  ...MessageStyle,
  color: "red",
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
