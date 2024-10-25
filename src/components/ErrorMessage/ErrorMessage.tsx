type ErrorMessageProps = {
  message?: string;
  loading?: boolean;
};

const ErrorMessageStyle = {
  color: "red",
  height: 40,
};

const LoadingMessageStyle = {
  height: 40,
};

export const ErrorMessage = ({ message, loading }: ErrorMessageProps) => {
  return loading ? (
    <div style={LoadingMessageStyle}>Checking 🧐</div>
  ) : (
    <div style={ErrorMessageStyle}>{message}</div>
  );
};
