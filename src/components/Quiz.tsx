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

  handleNextQuestion() {

  }

  handleNextQuestion() {
    
  }

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

      <button>End Trivia</button>
      <button>Next Question</button>
    </div>
  );
}
