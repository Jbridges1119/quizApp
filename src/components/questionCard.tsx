import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (<div>
    <p className="nubmer">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question}}/>
    <div>
      {answers.map(answer => (
        <div key={answer}>
          <button disabled={userAnswer} value={answers} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer}}/>
          </button>
        </div>
      ))}
    </div>
  </div>);
};
export default QuestionCard;
