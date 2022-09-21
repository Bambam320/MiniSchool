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

function Homecard({card}) {
  let bookId = (Object.keys(card)[0])
  // let imageUrl = book[`${bookId}`] || 'https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk='
  // let title = book[`${bookId}`]
  console.log(card[`${bookId}`])
  return(
    <Card sx={{ maxWidth: 345}}> title here
      <CardMedia
        component="img"
        height="300"
        // image={imageUrl}
        // alt={title}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
      {/* {title} */}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Lizards are a widespread group of squamate reptiles, with over 6,000
        species, ranging across all continents except Antarctica
      </Typography>
      </CardContent>
    </Card>
  )
}

export default Homecard;