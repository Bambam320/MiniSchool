//functional imports
import React from 'react';

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
import { CardActionArea } from '@material-ui/core'

function Homecard({card}) {
  let bookId = (Object.keys(card)[0])
  console.log(bookId)
  let imageUrl = card[`${bookId}`].cover.large || 'https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk='
  let title = card[`${bookId}`].title
  let author = card[`${bookId}`].authors[0].name
  
  let publishDate = card[`${bookId}`].publish_date || 'Unknown'
  let publishedBy = card[`${bookId}`].publishers[0].name
  console.log('just before it happens')
  let publishedIn = card[`${bookId}`].publish_places[0].name || 'Unknown'
  console.log(card[`${bookId}`].publish_places[0].name) //more stuff
  
  
  function handleClick() {
    console.log("I hear you")
  }

  return(
    <Card sx={{ maxWidth: 100}}>
      <CardActionArea onClick={handleClick}>
      <CardMedia
        component="img"
        height="100"
        width="100"
        image={imageUrl}
        alt={title}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant ="h6">
        Written By: {author}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {`Published in ${publishDate} by ${publishedBy} from ${publishedIn}`}
      </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Homecard;