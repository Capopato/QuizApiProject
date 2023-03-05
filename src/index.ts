import axios from "axios";
import { quizModel } from "./models/quiz.model";
import { questionModel } from "./models/question.model";
import promptSync from "prompt-sync";
import e from "express";

const prompt = promptSync();

export class Quiz implements quizModel {
  // roundOfQuestions: any;
  roundOfQuestions: questionModel[];
  gameIsRunning: boolean;
  roundIsRunning: boolean;
  scoreRight: number;
  scoreWrong: number;
  constructor() {
    (this.roundOfQuestions = []), (this.gameIsRunning = true), (this.roundIsRunning = true), (this.scoreRight = 0), (this.scoreWrong = 0);
  }

  public async getQuizData(): Promise<void> {
    const url = "https://the-trivia-api.com/api/questions";
    const response = await axios.get(url);
    const quizData = [];
    quizData.push(...response.data);

    for (let i = 0; i < quizData.length; i++) {
      const question = quizData[i].question;
      const correctAnswer = quizData[i].correctAnswer;
      let allAnswer = quizData[i].correctAnswer + "," + quizData[i].incorrectAnswers;
      let allAnswers: string[] = allAnswer.split(",");
      this.roundOfQuestions.push({ question: question, correctAnswer: correctAnswer, allAnswers: allAnswers });
    }
    // console.log(this.roundOfQuestions[1]);
  }

  public async playRound(): Promise<void> {
    await this.getQuizData();
    for (let i = 0; i < this.roundOfQuestions.length; i++) {
      // for (let i = 0; i < 2; i++) {
      console.log(`Question: ${this.roundOfQuestions[i].question}`);
      console.log(`Possible answers: ${this.roundOfQuestions[i].allAnswers}`);
      console.log("\n");

      while (true) {
        const answer = prompt("Your answer: ");
        console.log("\n");
        if (!this.roundOfQuestions[i].allAnswers.includes(answer)) {
          console.log("Please select 1 of the 4 answers.");
        } else if (answer == this.roundOfQuestions[i].correctAnswer) {
          this.scoreRight += 1;
          console.log("That is correct!");
          break;
        } else if (answer != this.roundOfQuestions[i].correctAnswer) {
          this.scoreWrong += 1;
          console.log("That is incorrect!");
          break;
        }
      }
      console.log("\n");

      while (true && i == this.roundOfQuestions.length - 1) {
        // if (i == this.roundOfQuestions.length - 1) {
        const playAgain = prompt("Do you want to play again: ").toLowerCase();
        if (playAgain == "yes") {
          this.playRound();
          break;
        } else if (playAgain == "no") {
          console.log(`You had ${this.scoreRight} questions right and ${this.scoreWrong} questions wrong.`);
          break;
        } else {
          console.log("Please type 'Yes' of 'No'");
          // }
        }
      }
    }
  }
}

const game = new Quiz();
game.getQuizData();
game.playRound();
