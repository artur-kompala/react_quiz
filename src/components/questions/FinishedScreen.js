function FinishedScreen({points,maxPossiblePoints}) {
    const precentage = (points/maxPossiblePoints) * 100
    return (
        <p className="result">You scored <strong>{points}</strong> out of {maxPossiblePoints}  {Math.ceil(precentage)}%</p>
    )
}

export default FinishedScreen
