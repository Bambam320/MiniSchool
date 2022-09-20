//functional imports
import React from 'react'

//material imports
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function Home () {

  const eng101 = ['OL4444289M', 'OL32520899M', 'OL24777120M', 'OL26639962M', 'OL39222415M']
  const eng202 = ['OL26339938M', 'OL32838419M', 'OL26491056M', 'OL32238679M', 'OL6514878M']
  const eng303 = ['OL13972886M', 'OL30728742M', 'OL26639962M', 'OL13983741M', 'OL16521070M']
  const eng404 = ['OL33990002M', 'OL37027591M', 'OL3693769M', 'OL24156400M', 'OL6977704M']
  const eng505 = ['OL23238391M', 'OL39221187M', 'OL26238737M', 'OL9317140M', 'OL13225388M']

  const courses = [eng101, eng202, eng303, eng404, eng505]

  const card1 = () => {
    const host = `http://localhost:3001/`
    const course = 'eng101'
    const randomNumber = Math.floor(Math.random() * 5) + 1
    fetch(`${host}${course}`)
    .then((r) => r.json())
    .then((course) => cardData(course))
  }

  function cardData(course) {
    return(
      <Card sx={{ maxWidth: 345}}> Curriculum 1
        <CardMedia
          component="img"
          height="300"
          image={data[randomNumber].cover.large}
          alt={data[randomNumber].title}
        />
        <CardContent>

        </CardContent>
      </Card>
      <Card> Curriculum 2 </Card>
      <Card> Curriculum 3 </Card> 
    )
  }

  return (
    <div>
      <Container style={{marginTop: '15px'}}>
        <Grid container justifyContent="space-around" alignItems="baseline">
          {card1()}
          {/* {card2}
          {card3}
          {card4}
          {card5} */}

        </Grid>
      </Container>
    </div>
  )
}

export default Home;