//functional imports
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


//material imports
import TextField from '@material-ui/core/TextField';
import Form from '@material-ui/core/Form';
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
  const params = useParams()

  useEffect(() => {
    const host = `http://localhost:3001/`
    const course = params.course
    const id = params.jsonId
    fetch(`${host}${course}/${id}`)
      .then((r) => r.json())
      .then((data) => setBookData(data))
  }, [params])


  function setBookData(data) {
    setBook(data)
  }

  let bookId = Object.keys(book)[0]

  function handleInputChange (e) {
    console.log(e)
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
            Title: {book[`${bookId}`].title}
          </Typography>
          <Typography variant="h6">
            Written By: {book[`${bookId}`].authors[0].name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Pages: {book[`${bookId}`].number_of_pages} || Published: {book[`${bookId}`].publish_date}
          </Typography>
          <Typography>
            Assign questions below.
          </Typography>
          <Form>
          <TextField
            id="question-input"
            name="username"
            label="User Name"
            type="text"
            value={formValues.question}
            onChange={handleInputChange}
          />
          <Button>Assign Question to current book!</Button>
          </Form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default FacultyCards;