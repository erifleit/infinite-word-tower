export const getWord = async (word: string) => {
  const response = await fetch(
    `https://475yg524rl.execute-api.us-east-2.amazonaws.com/prod/check?word=${word}`
  );

  const body = await response.json();

  if (body === "VALID_WORD") {
    return true;
  }
  if (body === "INVALID_WORD") {
    return false;
  }

  return false;
};
