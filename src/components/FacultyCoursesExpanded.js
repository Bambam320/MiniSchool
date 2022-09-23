//functional imports
import React from 'react';
import { Link, Route } from 'react-router-dom';

//component imports
import FacultyCards from './FacultyCards';

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
import { TitleTwoTone } from '@material-ui/icons';

function FacultyCoursesExpanded({bookInfo, course, jsonId}) {
  const {bookId, imageUrl, title, author, publishDate, 
    publishedBy, publishedIn, excerpt, bookPreview} = bookInfo

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  const classes = useStyles();

  <ListItem button component={Link} to="/design"></ListItem>
  return (
    <List component="div" disablePadding>
      <ListItem button component={Link} to={`/faculty/${course}/${bookId}/${jsonId}`}
        className={classes.nested}>
        <ListItemIcon>
          <ChromeReaderModeIcon />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </List>
  )
}

export default FacultyCoursesExpanded;