"use strict";
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
        (this.roundOfQuestions = []), (this.gameIsRunning = true), (this.roundIsRunning = true), (this.scoreRight = 0), (this.scoreWrong = 0);
    }
    getQuizData() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = "https://the-trivia-api.com/api/questions";
            const response = yield axios_1.default.get(url);
            const quizData = [];
            quizData.push(...response.data);
            for (let i = 0; i < quizData.length; i++) {
                const question = quizData[i].question;
                const correctAnswer = quizData[i].correctAnswer;
                let allAnswer = quizData[i].correctAnswer + "," + quizData[i].incorrectAnswers;
                let allAnswers = allAnswer.split(",");
                this.roundOfQuestions.push({ question: question, correctAnswer: correctAnswer, allAnswers: allAnswers });
            }
            // console.log(this.roundOfQuestions[1]);
        });
    }
    playRound() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getQuizData();
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
                    }
                    else if (answer == this.roundOfQuestions[i].correctAnswer) {
                        this.scoreRight += 1;
                        console.log("That is correct!");
                        break;
                    }
                    else if (answer != this.roundOfQuestions[i].correctAnswer) {
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
                    }
                    else if (playAgain == "no") {
                        console.log(`You had ${this.scoreRight} questions right and ${this.scoreWrong} questions wrong.`);
                        break;
                    }
                    else {
                        console.log("Please type 'Yes' of 'No'");
                        // }
                    }
                }
            }
        });
    }
}
exports.Quiz = Quiz;
const game = new Quiz();
game.getQuizData();
game.playRound();
