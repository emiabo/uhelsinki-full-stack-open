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
    <p>{props.text} {props.rating}</p>
  )
}

const Statistics = (props) => {
  return(
    <div>
      <h2>statistics</h2>
      <Display text='good' rating={props.good} />
      <Display text='neutral' rating={props.neutral} />
      <Display text='bad' rating={props.bad} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback setGood={() => setGood(good+1)} setNeutral={() => setNeutral(neutral+1)} setBad={() => setBad(bad+1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App