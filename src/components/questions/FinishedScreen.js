function FinishedScreen({points,maxPossiblePoints,dispatch}) {
    const precentage = (points/maxPossiblePoints) * 100
    return (
        <>
         <p className="result">You scored <strong>{points}</strong> out of {maxPossiblePoints}  {Math.ceil(precentage)}%</p>
        <button className="btn btn-ui" onClick={()=>dispatch({type: 'restart'})}>Restart The React Quiz</button>
        </>
       
    )
}

export default FinishedScreen
