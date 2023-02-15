import { useEffect } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import setup from "./lib/setup";
import Quiz from "./components/Quiz";

import { TriviaStore } from "./utils/useTriviaStore";

function App() {
  useEffect(() => {
    setup();
  }, []);

  return (
    <div className="App">
      <TriviaStore>
        <SignIn />
        <Quiz />
      </TriviaStore>
    </div>
  );
}

export default App;
