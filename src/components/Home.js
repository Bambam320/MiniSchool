//functional imports
import React, {useEffect, useState} from 'react'
import Homecard from './Homecard'

//material imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

function Home () {
  const [cards, setCards] = useState([])

  const eng101 = ['OL4444289M', 'OL32520899M', 'OL24777120M', 'OL26639962M', 'OL39222415M']
  const eng202 = ['OL26339938M', 'OL32838419M', 'OL26491056M', 'OL32238679M', 'OL6514878M']
  const eng303 = ['OL13972886M', 'OL30728742M', 'OL26639962M', 'OL13983741M', 'OL16521070M']
  const eng404 = ['OL33990002M', 'OL37027591M', 'OL3693769M', 'OL24156400M', 'OL6977704M']
  const eng505 = ['OL23238391M', 'OL39221187M', 'OL26238737M', 'OL9317140M', 'OL25098005M']
  const courses = ["eng101", "eng202", "eng303", "eng404", "eng505"]

  useEffect(() => {
    const host = `http://localhost:3001/`
    let bookarray = []
    courses.forEach((course) => {
      fetch(`${host}${course}`)
      .then((r) => r.json())
      .then((data) => {
        bookarray.push(data[Math.ceil(Math.random() * 4)])
        if (bookarray.length === 5) {
          return setCardState(bookarray, course)
        }
      })
    })
  }, [])

  function setCardState(bookarray) {
    setCards(bookarray)
  }

  const listBooks = cards.map((card, i) => {
    return (card ? 
      <Grid item={4}>
        <Homecard key={i} card={card} />
      </Grid> 
      : <img src='https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk=' ></img>)
  })

  return (
    <div>
      <Container style={{marginTop: '80px'}}>
        <Typography className='gradient-text' variant='h3' style={{fontWeight: '800', textAlign: 'center', marginBottom: '25px'}}>
          Welcome To The Flatiron Project University
        </Typography>
        <Box >
          <img style={{height: '600px', width:'100%'}} src='/imgs/Main_Book_Photo.jpg' alt='main book image'></img>
        </Box>
      </Container>
      <Container style={{marginTop: '15px'}} >
        <Grid container spacing={24} justifyContent="space-evenly" columnSpacing={24}>
          {listBooks}
        </Grid>
      </Container>
    </div>
  )
}

export default Home;