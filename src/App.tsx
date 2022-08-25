import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";

//Components
import QuestionCard from "./components/questionCard";

//Types
import { QuestionState, Difficulty } from "./API";
//Styles
import { GlobalStyle, Wrapper } from "./App.styles";


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  //QuestionState[] specifies what it should be - it cannot infer due to starting as empty array.
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    try {
      const newQuestions = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      );
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswer([]);
      setNumber(0);
      setLoading(false);
    } 
    catch (error) {
      console.log("There was an error", error);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      //users answers
      const answer = e.currentTarget.value;
      //check against correct answer
      const correct = questions[number].correct_answer === answer;
      console.log(questions[number].correct_answer, answer, number);
      
      //Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      //Save answer
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswer((prev) => [...prev, answerObj])
    }
  };

  const nextQuestion = () => {
    //Next question if not last
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  };

  return (
    <>
    <GlobalStyle/>
    <Wrapper>
      <h1>QUIZ APP</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? 
      <button className="start" onClick={startQuiz}>
        Start
      </button>: null}
      {!gameOver && <p className="score">Score: {score}</p> }
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && 
      <QuestionCard
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswer ? userAnswer[number] : undefined}
        callback={checkAnswer}
      />}
      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? <button className="next" onClick={nextQuestion}>
        Next Question
      </button> : null}
      </Wrapper></>
  );
}

export default App;
