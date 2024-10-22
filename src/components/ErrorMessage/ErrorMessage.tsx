type ErrorMessageProps = {
  message?: string;
};

const ErrorMessageStyle = {
  color: "red",
  height: 40,
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div style={ErrorMessageStyle}>{message}</div>;
};
