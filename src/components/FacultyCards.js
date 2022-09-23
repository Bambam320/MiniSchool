//functional imports
import React, { useState } from 'react';


//material imports
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CollectionsIcon from '@material-ui/icons/Collections';
import { makeStyles } from '@material-ui/core/styles';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardActionArea } from '@material-ui/core'

function FacultyCards ({bookInfo}) {
  const {bookId, imageUrl, title, author, publishDate, 
    publishedBy, publishedIn, excerpt, bookPreview} = bookInfo

  function handleClick () {
    console.log('well do something soon....')
  }

  return (
    <>      <Card 
    style={{
      marginBottom: '50px', 
      maxWidth: '500px', 
      borderStyle: "solid", 
      borderWidth: '5px', 
      borderColor: "#2AA624"
      }} variant="outlined"
    >
    <CardActionArea onClick={handleClick}>
    <CardMedia
      style={{borderStyle: "solid", borderWidth: '5px', borderColor: "#dce04f"}} 
      component="img"
      height="1000px"
      width="600px"
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
    <Typography variant="body2" gutterBottom>
      {`Published in ${publishDate} by ${publishedBy} from ${publishedIn}`}
    </Typography>
    <Typography>
      <strong>An excerpt from chapter 1 : </strong>{`${excerpt}...`}
    </Typography>
    <Typography>
      <a href={bookPreview} target="_blank">Click here to view the eBook in a new window!</a>
      <p> Click on the book to go to your account!</p>
    </Typography>
    </CardContent>
    </CardActionArea>
  </Card></>
  )
}

export default FacultyCards;