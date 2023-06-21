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

const Display = (props) => {
  return(
    <p>{props.text} {props.value} {props.suffix}</p>
  )
}

const Statistics = (props) => {
  return(
    <div>
      <h2>statistics</h2>
      <Display text='good' value={props.good} />
      <Display text='neutral' value={props.neutral} />
      <Display text='bad' value={props.bad} />
      <Display text='all' value={props.total} />
      <Display text='average' value={props.avg} />
      <Display text='positive' value={props.percentGood} suffix='%'/>
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