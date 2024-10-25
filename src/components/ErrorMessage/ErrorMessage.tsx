import { useGameStore } from "../../store";

const ErrorMessageStyle = {
  color: "red",
  height: 40,
};

const LoadingMessageStyle = {
  height: 40,
};

export const ErrorMessage = () => {
  const { loading, error } = useGameStore();
  return loading ? (
    <div style={LoadingMessageStyle}>Checking 🧐</div>
  ) : (
    <div style={ErrorMessageStyle}>{error}</div>
  );
};
