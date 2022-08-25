import axios from 'axios'
import QuestionCard from './components/questionCard';
import {shuffleArray} from './utils'


export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export type QuestionState = Question & { answers: string[]}

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=15&type=multiple`)
  .then(data => {
    return data.data.results.map((question: Question) => {
      return (
      {...question, answer: shuffleArray([...question.incorrect_answers, question.correct_answer])}
    )})
      })
  

  //Two awaits for waiting on the fetch and then waiting on the compiler to json
  // const data = await (await fetch(endpoint)).json()
  // console.log(data);
  
}