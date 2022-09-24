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

function FacultyCards() {
  const [formValues, setFormValues] = useState('')
  const [book, setBook] = useState({})
  const [bookValid, setBookValid] = useState(false)
  const params = useParams()
  
  const host = `http://localhost:3001/`
  const course = params.course
  const id = params.jsonId

  console.log('eachbook', book)
  // console.log('params', params)

  useEffect(() => {
    fetch(`${host}${course}/${id}`)
      .then((r) => r.json())
      .then((data) => setBookData(data))
  }, [host, course, id])


  function setBookData(data) {
    setBook(data)
    setBookValid(true)
  }

  let bookId = Object.keys(book)[0]
  // console.log('ID ID', bookId)
  // console.log('is this author', book)
  // console.log('title', book[`${bookId}`].title)

  //holds state with current question input
  function handleInputChange (e) {
    setFormValues(e.target.value)
  }

  //create a new object for the question put to the server


  //puts the new question on the server in the matching book
  function handleSubmit (e) {
    e.preventDefault()
    const questions = [...book.questions, {question: formValues, answer: ''}]
    const putBook = Object.assign(book, questions)
    console.log(questions)
    console.log(`http://localhost:3001/${course}/${id}`)
    const put = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(putBook)
    }
    fetch(`http://localhost:3001/${course}/${id}`, put)
      .then((r) => r.json())
      .then((data) => (data))
  }

  const info = (props) => {
    switch (true) {
      case bookValid && props === 1 : return book[`${bookId}`].title
      case bookValid && props === 2 : return book[`${bookId}`].authors[0].name
      case bookValid && props === 3 : return book[`${bookId}`].number_of_pages
      case bookValid && props === 4 : return book[`${bookId}`].publish_date
      default: return 'Loading...'
    }
  }

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
            Assign questions below.
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextareaAutosize
            style={{width: 460}}
            maxRows={20}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua."
            value={formValues}
            onChange={handleInputChange}
          />
          <Button type="submit" style={{backgroundColor: 'lightgreen'}}>Assign Question to current book!</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default FacultyCards;