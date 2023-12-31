import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick={props.handler}>{props.text}</button>
  )
}

const Feedback = (props) => {
  return(
    <div>
      <h2>give feedback</h2>
      <Button text='good' handler={props.setGood}/>
      <Button text='neutral' handler={props.setNeutral}/>
      <Button text='bad' handler={props.setBad}/>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.suffix}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return(
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.total} />
          <StatisticLine text='average' value={props.avg} />
          <StatisticLine text='positive' value={props.percentGood} suffix='%'/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0.0)
  const [percentGood, setPercentGood] = useState(0.0)

  const addGood = () => {
    const newGood = good+1
    const newTotal = total+1
    const newAvg = (newGood-bad)/newTotal
    const newPercentGood = (newGood/newTotal)*100
    setGood(newGood)
    setTotal(newTotal)
    setAvg(newAvg)
    setPercentGood(newPercentGood)
  }

  const addNeutral = () => {
    const newNeutral = neutral+1
    const newTotal = total+1
    const newAvg = (good-bad)/newTotal
    const newPercentGood = (good/newTotal)*100
    setNeutral(newNeutral)
    setTotal(newTotal)
    setAvg(newAvg)
    setPercentGood(newPercentGood)
  }

  const addBad = () => {
    const newBad = bad+1
    const newTotal = total+1
    const newAvg = (good-newBad)/newTotal
    const newPercentGood = (good/newTotal)*100
    setBad(newBad)
    setTotal(newTotal)
    setAvg(newAvg)
    setPercentGood(newPercentGood)
  }

  return (
    <div>
      <Feedback setGood={addGood} setNeutral={addNeutral} setBad={addBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} percentGood={percentGood} />
    </div>
  )
}

export default App