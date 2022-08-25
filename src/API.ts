import axios from 'axios'


export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answer: string[];
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
    console.log('results', data.data.results)
    // return data.data.results.map((question: Question))
  })
  //Two awaits for waiting on the fetch and then waiting on the compiler to json
  // const data = await (await fetch(endpoint)).json()
  // console.log(data);
  
}