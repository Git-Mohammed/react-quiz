import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

//"loading", "error"
const initialState = { questions: [], status: "loading" };

function reducer(state, action) {
  switch (action.type) {
    case "dataRecevied":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailded":
      return {
        ...state,
        status: "error",
      };
    case "startQuiz":
      return {
        ...state,
        status: "active",
      };
    default:
      throw new Error("Action unkown");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

  function handleOnClick() {
    dispatch({ type: "startQuiz" });
  }
  useEffect(function () {
    async function fetchQuestions() {
      try {
        const resp = await fetch("http://localhost:4000/questions");
        const data = await resp.json();
        dispatch({ type: "dataRecevied", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailded" });
      }
    }
    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} onClick={handleOnClick} />
        )}
        {status === "active" && <Question />}
      </Main>
    </div>
  );
}

export default App;
