import { questionModel } from "./question.model";

export interface quizModel {
  roundOfQuestions: questionModel[];
  gameIsRunning: boolean;
  roundIsRunning: boolean;
  scoreRight: number;
  scoreWrong: number;
  getQuizData(): void;
  playRound(): void;
}
