//functional imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//material imports
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function StudentCards() {
  //assigning state and parameters
  const [formValues, setFormValues] = useState('')
  const [book, setBook] = useState({})
  const [bookValid, setBookValid] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [question, setQuestion] = useState('')
  const params = useParams()

  //assigning global variables
  const host = `http://localhost:3001/`
  const course = params.course
  const id = params.jsonId

  //use sideeffect to fetch the book data from the json server
  useEffect(() => {
    fetch(`${host}${course}/${id}`)
      .then((r) => r.json())
      .then((data) => setBookData(data))
  }, [host, course, id])

  //on params change, hide the guestion so the user has to display a new one
  useEffect(() =>{
    setShowQuestion(false)
  }, [params])

  //from useEffect: to load state with selected book
  function setBookData(data) {
    setBook(data)
    setBookValid(true)
  }

  //assign book ID variable
  let bookId = Object.keys(book)[0]

  //holds state with current answer input
  function handleInputChange(e) {
    setFormValues(e.target.value)
  }

  //patches the answer on the server to the matching books matching question
  function handleSubmit(e) {
    e.preventDefault()
    console.log('event', formValues)
    let answeredQuestion = book.questions.find((ques) => ques.question === question)
    answeredQuestion["answer"] = formValues
    console.log('question from book that was displayed', answeredQuestion['id'])
    const patch = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questions: [...book.questions].push(answeredQuestion)
      })
    }
    fetch(`${host}${course}/${id}`, patch)
      .then((r) => r.json())
      .then(() => setFormValues(''));
    setShowQuestion(false)
  }
  

  //from handleSubmit: clears the answer input form
  function clearForm() {
    setFormValues('')
  }

  //lists required data for student cards from info function call
  const info = (props) => {
    switch (true) {
      case bookValid && props === 1: return book[`${bookId}`].title
      case bookValid && props === 2: return book[`${bookId}`].authors[0].name
      case bookValid && props === 3: return book[`${bookId}`].number_of_pages
      case bookValid && props === 4: return book[`${bookId}`].publish_date
      default: return 'Loading...'
    }
  }

  //lists the next unanswered question from the server if there is one
  const handleClick = () => {
    let ques = {}
    console.log('book', book)
    if (book.questions.length > 1) {
      ques = book.questions.find((question) => question.question !== '' && question.answer === '')
    } else if (book.questions.length === 1) {
      ques = {question: 'No assignments found for this book'}
    }
    setQuestion(ques === undefined ? 'All asiggnments have been completed for this book' : ques.question)
    setShowQuestion(true)
  }

  //returns a card and form for each book to answer questions from the json server with.
  return (
    <Container style={{ marginTop: '75px', marginBottom: '75px' }}>
      <Card
        style={{
          marginBottom: '50px',
          maxWidth: '500px',
          borderStyle: "solid",
          borderWidth: '5px',
          borderColor: "#2AA624"
        }} variant="outlined"
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title: {info(1)}
          </Typography>
          <Typography variant="h6">
            Written By: {info(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Pages: {info(3)} || Published: {info(4)}
          </Typography>
          <Typography>
            Complete your homework below!
          </Typography>
          <Button style={{ backgroundColor: 'lightgreen' }} onClick={handleClick}>
            Get new assignment!
          </Button>
          {showQuestion ? <p>{question}</p> : <p></p>}
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              style={{ width: 460 }}
              maxRows={20}
              aria-label="maximum height"
              placeholder="Write Answers here."
              defaultValue="Answering..."
              value={formValues}
              onChange={handleInputChange}
            />
            <Button type="submit" style={{ backgroundColor: 'lightgreen' }}>Answer This Question!</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default StudentCards;