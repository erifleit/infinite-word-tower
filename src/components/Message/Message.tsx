import { useMemo } from "react";
import { useGameStore } from "../../store";

const MessageStyle = {
  height: 40,
};

const ErrorMessageStyle = {
  ...MessageStyle,
  color: "red",
};

export const Message = () => {
  const { message, displayMessage, error } = useGameStore();

  const style = useMemo(
    () => (error ? ErrorMessageStyle : MessageStyle),
    [error]
  );

  const content = useMemo(() => error || message, [error, message]);

  return error || displayMessage ? (
    <div style={style} className="message">
      {content}
    </div>
  ) : (
    <></>
  );
};
