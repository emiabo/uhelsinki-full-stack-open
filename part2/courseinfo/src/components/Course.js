const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p style={{fontWeight: "bold"}}>total of {sum} exercises</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
    <Total sum={parts.reduce((acc, part) => acc + part.exercises, 0)} />
  </>

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
    </div>
  )
}

export default Course