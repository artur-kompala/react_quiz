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
import FinishedScreen from './components/questions/FinishedScreen';
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
      case 'finish':
        return {...state, status: 'finished'}
      case 'restart':
        return {...initialState, status: 'ready',index: 0, answer: null, points: 0}
      default:
        throw new Error("Action unknow")
    }
}
function App() {

  const [{questions,status,index,answer,points},dispatch] = useReducer(reducer,initialState)

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur)=>prev + cur.points,0)

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
          
          {status === "loading" && <Loader></Loader>}
          {status === "error" && <Error></Error>}
          {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}></StartScreen>}
          {status === 'active' && 
          <>
          <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}></Progress>
          <Question question={questions[index] } dispatch={dispatch} answer={answer}></Question>
          <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}></NextButton>
          </>
          
          }
          
          {status === 'finished' && <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}></FinishedScreen>}
        </Main>
    </div>
  );
}

export default App;
