import { useEffect, useState } from "react";

import { getQuestion } from "../api";
import Question from "./Question";
import { useTriviaStore } from "../utils/useTriviaStore";
import shuffleArray from "../utils/shuffleArray";
import Loader from "./Loader";

export default function Quiz() {
  //@ts-ignore
  const { actions, dispatch, state } = useTriviaStore();
  const [currentValue, setCurrentValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [options, setOptions] = useState<string[]>([]);

  const { currentQuestion } = state;

  useEffect(() => {
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
    try {
      setIsLoading(true);

      const response = await getQuestion();

      const data: {
        results: IQuestion[];
      } = await response.json();

      dispatch(actions.setQuestion(data.results[0]));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container">
      <h2 className="vertical-gutter">Your Score: {state.totalScore}</h2>

      {isLoading ? (
        <div className="center main-wrapper loader-wrapper">
          <Loader />
        </div>
      ) : (
        currentQuestion && (
          <>
            <Question
              question={currentQuestion}
              currentValue={currentValue}
              setCurrentValue={setCurrentValue}
              options={options}
            />
            <div className="row button-center">
              <button
                onClick={handleEndTrivia}
                className="error-button"
                disabled={isLoading}
              >
                End Trivia
              </button>
              <button
                onClick={handleNextQuestion}
                className="button-primary"
                disabled={isLoading}
              >
                Next Question
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
}
