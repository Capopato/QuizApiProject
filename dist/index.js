"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const axios_1 = __importDefault(require("axios"));
class Quiz {
    constructor() {
        this.questionData = [];
        this.onlyQuestions = [];
        this.onlyAnswers = [];
        this.correctAnswer = [];
        this.round = 0;
        this.running = false;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://the-trivia-api.com/api/questions";
            const response = yield axios_1.default.get(url);
            const relevantData = response.data;
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
        });
    }
    displayQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getData();
            console.log(this.onlyQuestions[this.round]);
            this.round += 1;
        });
    }
    displayAnswers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getData();
            console.log(this.onlyAnswers[this.round]);
            this.round += 1;
        });
    }
    checkAnswer() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getData();
        });
    }
}
exports.Quiz = Quiz;
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
