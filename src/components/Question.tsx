import React from "react";

interface IQuestionProps {
  question: IQuestion;
  currentValue: string;
  setCurrentValue: (key: string) => void;
  options: string[];
}

export default function Question(props: IQuestionProps) {
  const { question, currentValue, setCurrentValue, options } = props;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentValue(event.target.value);
  }

  return (
    <div>
      <div>
        <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>

      <form>
        {options.map((option) => (
          <label key={option} className="row">
            <input
              type="radio"
              value={option}
              key={option}
              placeholder={option}
              id={option}
              checked={option === currentValue}
              onChange={handleChange}
            />
            <div
              dangerouslySetInnerHTML={{ __html: option }}
              className="option-container"
            />
          </label>
        ))}
      </form>
    </div>
  );
}
