import { useGameStore } from "../../store";

const ErrorMessageStyle = {
  color: "red",
  height: 40,
};

const MessageStyle = {
  height: 40,
};

export const Message = () => {
  const { message, displayMessage, error } = useGameStore();

  return error ? (
    <div style={ErrorMessageStyle}>{error}</div>
  ) : displayMessage ? (
    <div style={MessageStyle}>{message}</div>
  ) : (
    <></>
  );
};
