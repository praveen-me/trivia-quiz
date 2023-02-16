import { useEffect } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import setup from "./lib/setup";
import Quiz from "./components/Quiz";

import { useTriviaStore } from "./utils/useTriviaStore";

function App() {
  const { state } = useTriviaStore();

  useEffect(() => {
    setup();
  }, []);

  console.log(state.user);

  return (
    <div className="App">
      <>{state.user.isAuthenticated ? <Quiz /> : <SignIn />}</>
    </div>
  );
}

export default App;
