import { useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/questions/Main';
import { useReducer } from 'react';
import Loader from './components/questions/Loader';
import Error from './Error';
import StartScreen from './components/questions/StartScreen';
import Question from './components/questions/Question';
import NextButton from './components/buttons/NextButton';
import Progress from './components/progressBar/Progress';
const initialState = {
  questions: [],
  status: 'loading', //loading,err,active,ready,finish,
  index: 0,
  answer: null,
  points: 0,
}
const reducer = (state,action) =>{
    const {type,payload} = action;
    switch(type){
      case 'dataRecived':
        return {...state,questions: payload,status: 'ready'}
      case 'dataFailed':
        return {...state, status: 'error'}
      case 'start':
        return {...state, status: 'active'}
      case 'newAnswer':
        const question = state.questions.at(state.index);
        return {...state,answer: payload,points: action.payload === question.correctOption ? state.points + question.points : state.points}
      case 'nextQuestion':
        return {...state, index: state.index + 1,answer: null}
      default:
        throw new Error("Action unknow")
    }
}
function App() {

  const [{questions,status,index,answer},dispatch] = useReducer(reducer,initialState)

  const numQuestions = questions.length;

  useEffect(()=>{
    fetch('http://localhost:9000/questions')
    .then(res=>res.json())
    .then(data=>dispatch({type: 'dataRecived',payload: data}))
    .catch((err)=>dispatch({type: 'dataFailed'}))
  },[])
  
  return (
    <div className="app">
        <Header></Header>
        <Main>
          <Progress></Progress>
          {status === "loading" && <Loader></Loader>}
          {status === "error" && <Error></Error>}
          {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}></StartScreen>}
          {status === 'active' && <Question question={questions[index] } dispatch={dispatch} answer={answer}></Question>}
          <NextButton dispatch={dispatch} answer={answer}></NextButton>
        </Main>
    </div>
  );
}

export default App;
