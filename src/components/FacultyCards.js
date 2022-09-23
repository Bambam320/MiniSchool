//functional imports
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


//material imports
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function FacultyCards() {
  const [formValues, setFormValues] = useState({
    question: ''
  })
  const [book, setBook] = useState({})
  const [bookValid, setBookValid] = useState(false)
  const params = useParams()
  
  const host = `http://localhost:3001/`
  const course = params.course
  const id = params.jsonId

  // console.log('eachbook', book)
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

  function handleInputChange (e) {
    console.log(e)
  }

  function handleSubmit (e) {
    e.preventDefault()
  }

  const title = () => {
    if (bookValid) {
      return book[`${bookId}`].title
    } else return 'Loading'
  }

  const author = () => {
    if (bookValid) {
      return book[`${bookId}`].authors[0].name
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
            Title: {title()}
          </Typography>
          <Typography variant="h6">
            Written By: {author()}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {/* Pages: {book[`${bookId}`].number_of_pages} || Published: {book[`${bookId}`].publish_date} */}
          </Typography>
          <Typography>
            Assign questions below.
          </Typography>
          <form onSubmit={handleSubmit}>
          <TextField
            id="question-input"
            name="username"
            label="User Name"
            type="text"
            value={formValues.question}
            onChange={handleInputChange}
          />
          <Button>Assign Question to current book!</Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default FacultyCards;