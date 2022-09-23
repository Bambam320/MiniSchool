//functional imports
import React from 'react';

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

function FacultyCoursesExpanded({bookInfo}) {
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

  function handleBookClick (e) {
    console.log(bookId)
  }

  return (
    <List component="div" disablePadding>
      <ListItem component="Button" onClick={handleBookClick} value={title}
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