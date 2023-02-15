interface IQuestion {
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: "multiple" | "boolean";
}
