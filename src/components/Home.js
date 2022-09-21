//functional imports
import React, {useEffect, useState} from 'react'
import Homecard from './Homecard'

//material imports
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Home () {
  const [cards, setCards] = useState([])
  // const [card1, setCard1] = useState({})
  // const [card2, setCard2] = useState({})
  // const [card3, setCard3] = useState({})
  // const [card4, setCard4] = useState({})
  // const [card5, setCard5] = useState({})

  const eng101 = ['OL4444289M', 'OL32520899M', 'OL24777120M', 'OL26639962M', 'OL39222415M']
  const eng202 = ['OL26339938M', 'OL32838419M', 'OL26491056M', 'OL32238679M', 'OL6514878M']
  const eng303 = ['OL13972886M', 'OL30728742M', 'OL26639962M', 'OL13983741M', 'OL16521070M']
  const eng404 = ['OL33990002M', 'OL37027591M', 'OL3693769M', 'OL24156400M', 'OL6977704M']
  const eng505 = ['OL23238391M', 'OL39221187M', 'OL26238737M', 'OL9317140M', 'OL13225388M']
  const courses = ["eng101", "eng202", "eng303", "eng404", "eng505"]

  useEffect(() => {
    const host = `http://localhost:3001/`
    let rand = Math.ceil(Math.random() * 4) 
    let bookarray = []
    courses.forEach((course) => {
      
      fetch(`${host}${course}`)
      .then((r) => r.json())
      .then((data) => {
        bookarray.push(data[rand])
        if (bookarray.length === 5) {
          return setCardState(bookarray)
        }
        // switch (true) {
        //   case course === courses[0] : return setCard1State(data[rand])
        //   case course === courses[1] : return setCard2State(data[rand])
        //   case course === courses[2] : return setCard3State(data[rand])
        //   case course === courses[3] : return setCard4State(data[rand])
        //   case course === courses[4] : return setCard5State(data[rand])
        //   default: return null
        // }
      })
    })
  }, [])

  function setCardState(bookarray) {
    setCards(bookarray)
  }

  const listBooks = cards.map((card, i) => {
    return card ? <Homecard key={i} card={card} /> : <img src='https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk=' ></img>
  })

  // function setCard1State (bookInfo) {
  //   setCard1(bookInfo)
  // }

  // function setCard2State (bookInfo) {
  //   setCard2(bookInfo)
  // }

  // function setCard3State (bookInfo) {
  //   setCard3(bookInfo)
  // }

  // function setCard4State (bookInfo) {
  //   setCard4(bookInfo)
  // }

  // function setCard5State (bookInfo) {
  //   setCard5(bookInfo)
  // }

  // function listCard (book) {
  //   return (
  //     <Homecard book={book} />
  //   )
  // }

  return (
    <div>
      <Container style={{marginTop: '15px'}}>
        <Grid container justifyContent="space-around" alignItems="baseline">
          {listBooks}
          {/* {listCard(card1)} */}
          {/* {listcard(card1)} */}
          {/* <Homecard card1={card1} /> */}
          {/* <Homecard card2={card2} /> */}
          {/* <Homecard card3={card3} />
          <Homecard card4={card4} />
          <Homecard card5={card5} /> */}
        </Grid>
      </Container>
    </div>
  )
}

export default Home;