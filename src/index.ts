/**
 * Quiz app
 *
 * Action plan:
 * Make a file/function that fetches questions from an api
 * console.log the question and ask the user for input
 * check if input is the correct answer
 * go to next question
 *
 * When making the API call the response is X amount of question + answers
 * Action plan:
 * make a class
 * make a function for the API call or import it
 * make a [] for storing the API call data
 * make a function that only displays the question + all the available answers.
 * make a prompt-sync function to ask user for input to choose from 1 of the answers
 * compare the input to the correct answer
 * score point if won
 *
 * make while loop to iterate over all the question. When all the questions are done ask if you want to play another round to get new question.
 * To proceed do the following: make 1 API call and store the data in a []
 *
 *
 */

import { triviaQuiz } from "./fetch/quiz.fetch";
import { questionModel } from "./models/question.model";
import axios from "axios";

export class Quiz {
  questionData: questionModel[];
  onlyQuestions: string[];
  onlyAnswers: string[][];
  correctAnswer: string[];
  round: number;
  running: boolean;
  constructor() {
    this.questionData = [];
    this.onlyQuestions = [];
    this.onlyAnswers = [];
    this.correctAnswer = [];
    this.round = 0;
    this.running = false;
  }

  public async getData() {
    const url = "https://the-trivia-api.com/api/questions";
    const response = await axios.get(url);
    const relevantData: questionModel[] = response.data;

    if (!relevantData) {
      console.log("Something went wrong. Please try again.");
      return;
    }

    this.questionData.push(...relevantData);

    /** Get only the questions and push them to a seperate [] */
    for (let i = 0; i < this.questionData.length; i++) {
      this.onlyQuestions.push(this.questionData[i].question);
    }

    /** Get only the answers and push them to a seperate [] */
    for (let i = 0; i < this.questionData.length; i++) {
      //   console.log(this.questionData[i]);
      this.onlyAnswers.push([this.questionData[i].correctAnswer + "," + this.questionData[i].incorrectAnswers]);
    }

    /** Get only the correct answer and push it to a seperate [] */
    for (let i = 0; i < this.questionData.length; i++) {
      //   console.log(this.questionData[i]);
      this.correctAnswer.push(this.questionData[i].correctAnswer);
    }
  }

  public async displayQuestion() {
    await this.getData();
    console.log(this.onlyQuestions[this.round]);
    this.round += 1;
  }

  public async displayAnswers() {
    await this.getData();
    console.log(this.onlyAnswers[this.round]);
    this.round += 1;
  }

  public async checkAnswer() {
    await this.getData();
  }
}

const quiz = new Quiz();
// quiz.checkAnswer();

while (quiz.round <= 2) {
  quiz.running = false;

  while (quiz.running == false) {
    quiz.displayQuestion();
    quiz.displayAnswers();
    // ask input
    quiz.running = true;
  }

  quiz.round += 1;
}

/**
 * while(quiz.running = false){
 * quiz.getData()
 *  while(quiz.round = false){
 *      display question: quiz.onlyquestion[round]
 *      ask input: prompt(asnwer)
 *      check if answer is correct with a method
 *      quiz.round = true
 *  }
 *
 *  quiz.round += 1
 *
 *  if(quiz.round == 10){
 *      quiz.running = true
 *  }
 * }
 */
