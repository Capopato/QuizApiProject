// /**
//  * Quiz app
//  *
//  * Action plan:
//  * Make a file/function that fetches questions from an api
//  * console.log the question and ask the user for input
//  * check if input is the correct answer
//  * go to next question
//  *
//  * When making the API call the response is X amount of question + answers
//  * Action plan:
//  * make a class
//  * make a function for the API call or import it
//  * make a [] for storing the API call data
//  * make a function that only displays the question + all the available answers.
//  * make a prompt-sync function to ask user for input to choose from 1 of the answers
//  * compare the input to the correct answer
//  * score point if won
//  *
//  * make while loop to iterate over all the question. When all the questions are done ask if you want to play another round to get new question.
//  * To proceed do the following: make 1 API call and store the data in a []
//  *
//  *
//  */

import { questionModel } from "./models/question.model";
import axios from "axios";
import promptSync from "prompt-sync";

const prompt = promptSync();

export class Quiz {
  questionData: questionModel[];
  running: boolean;
  round: number;
  readyToAnswer: boolean;
  scoreCorrect: number;
  scoreInCorrect: number;
  playRound: boolean;
  constructor() {
    this.questionData = [];
    this.running = true;
    this.round = 0;
    this.readyToAnswer = false;
    this.scoreCorrect = 0;
    this.scoreInCorrect = 0;
    this.playRound = true;
  }

  public async getData() {
    const url = "https://the-trivia-api.com/api/questions";
    const response = await axios.get(url);
    const relevantData: questionModel[] = response.data;

    this.questionData.push(...relevantData);
  }

  public async runQuiz() {
    await this.getData();
    const question = this.questionData[this.round].question;
    const possibleAnswers = this.questionData[this.round].incorrectAnswers + "," + this.questionData[this.round].correctAnswer;
    const correctAnswers = this.questionData[this.round].correctAnswer;

    console.log("\n");
    console.log(question);
    console.log(possibleAnswers);
    console.log("\n");

    const answer = prompt("Answer: ");

    if (answer == correctAnswers) {
      this.scoreCorrect += 1;
      console.log("That is correct!");
    } else {
      this.scoreInCorrect += 1;
      console.log("That is incorrect!");
    }
    this.round += 1;

    if (this.round == 18) {
      console.log(`You have ${this.scoreCorrect} questions right and ${this.scoreInCorrect} questions wrong.`);
    }
  }
}

const game = new Quiz();

for (let i = 0; i < 9; i++) {
  game.playRound = true;
  while (game.playRound == true) {
    game.runQuiz();
    game.playRound = false;
    game.round += 1;
  }
}
