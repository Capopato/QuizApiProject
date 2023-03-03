import axios from "axios";

export const triviaQuiz = async () => {
  const url = "https://the-trivia-api.com/api/questions";
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

triviaQuiz();
