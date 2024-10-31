export const getWord = async (word: string) => {
  try {
    const response = await fetch(
      `https://475yg524rl.execute-api.us-east-2.amazonaws.com/prod/check?word=${word}`
    );

    const body = await response.json();

    return body as string;
  } catch (error) {
    return "ERROR";
  }
};
