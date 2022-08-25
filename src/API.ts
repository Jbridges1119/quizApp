

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=15&type=multiple`;
  //Two awaits for waiting on the fetch and then waiting on the compiler to json
  const data = await (await fetch(endpoint)).json()
  console.log(data);
  
}