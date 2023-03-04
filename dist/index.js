"use strict";
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
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class Quiz {
    constructor() {
        this.questionData = [];
        this.running = true;
        this.round = 0;
        this.readyToAnswer = false;
        this.scoreCorrect = 0;
        this.scoreInCorrect = 0;
        this.playRound = true;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://the-trivia-api.com/api/questions";
            const response = yield axios_1.default.get(url);
            const relevantData = response.data;
            this.questionData.push(...relevantData);
        });
    }
    runQuiz() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getData();
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
            }
            else {
                this.scoreInCorrect += 1;
                console.log("That is incorrect!");
            }
            this.round += 1;
            if (this.round == 18) {
                console.log(`You have ${this.scoreCorrect} questions right and ${this.scoreInCorrect} questions wrong.`);
            }
        });
    }
}
exports.Quiz = Quiz;
const game = new Quiz();
for (let i = 0; i < 9; i++) {
    game.playRound = true;
    while (game.playRound == true) {
        game.runQuiz();
        game.playRound = false;
        game.round += 1;
    }
}
