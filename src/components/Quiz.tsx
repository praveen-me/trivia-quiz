import React, { useEffect, useState } from "react";

import { getQuestion } from "../api";
import Question from "./Question";
import { useTriviaStore } from "../utils/useTriviaStore";
import shuffleArray from "../utils/shuffleArray";

export default function Quiz() {
  //@ts-ignore
  const { actions, dispatch, state } = useTriviaStore();
  const [currentValue, setCurrentValue] = useState<string>("");

  const [options, setOptions] = useState<string[]>([]);

  const { currentQuestion } = state;

  useEffect(() => {
    console.log("here");
    getNewQuestion();
  }, []);

  useEffect(() => {
    if (currentQuestion) {
      if (currentQuestion.type === "multiple") {
        const items = shuffleArray([
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ]);

        setOptions(shuffleArray(items));

        setCurrentValue(items[0]);
      }
    }
  }, [currentQuestion]);

  async function handleNextQuestion() {
    const isCorrectAnswer =
      currentQuestion?.correct_answer &&
      currentValue === currentQuestion?.correct_answer;

    if (isCorrectAnswer) {
      dispatch(actions.setTotal());
      await getNewQuestion();
    }
  }

  function handleEndTrivia() {}

  async function getNewQuestion() {
    const response = await getQuestion();

    const data: {
      results: IQuestion[];
    } = await response.json();

    dispatch(actions.setQuestion(data.results[0]));
  }

  if (!currentQuestion) return null;

  return (
    <div>
      <h2>Your Score: {state.totalScore}</h2>

      <Question
        question={currentQuestion}
        currentValue={currentValue}
        setCurrentValue={setCurrentValue}
        options={options}
      />

      <button onClick={handleEndTrivia}>End Trivia</button>
      <button onClick={handleNextQuestion}>Next Question</button>
    </div>
  );
}
