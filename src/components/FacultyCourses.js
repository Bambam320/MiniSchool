//functional imports
import React, { useEffect, useState } from 'react';

//component imports
import FacultyCoursesExpanded from './FacultyCoursesExpanded'


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


function FacultyCourses({ course }) {

  const [open, setOpen] = useState(false)
  const [courseMaterial, setCourseMaterial] = useState([])
  // console.log(course)
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

  useEffect(() => {
    const host = `http://localhost:3001/`
    fetch(`${host}${course}`)
      .then((r) => r.json())
      .then((data) => setCourseState(data))
  }, [])

  function setCourseState(readingAssignments) {
    setCourseMaterial(readingAssignments)
  }

  const listCourseMaterials = courseMaterial.map((book) => {
    let bookId = (Object.keys(book)[0])
    let bookInfo = {
      'bookId': bookId,
      imageUrl: book[`${bookId}`].cover.large || 'https://media.istockphoto.com/vectors/loading-icon-vector-illustration-vector-id1335247217?k=20&m=1335247217&s=612x612&w=0&h=CQFY4NO0j2qc6kf4rTc0wTKYWL-9w5ldu-wF8D4oUBk=',
      title: book[`${bookId}`].title,
      author: book[`${bookId}`].authors[0].name,
      publishDate: book[`${bookId}`].publish_date || 'Unknown',
      publishedBy: book[`${bookId}`].publishers[0].name,
      publishedIn: book[`${bookId}`].publish_places[0].name || 'Unknown',
      excerpt: book.chapters.chapter_1.content.substr(0, 200),
      bookPreview: book[`${bookId}`].ebooks[0].preview_url
    }
    let jsonId= book.id
    
    return (
      <div>
        <Collapse 
          in={open} 
          timeout="auto" 
          unmountOnExit>
            <FacultyCoursesExpanded bookInfo={bookInfo} course={course} jsonId={jsonId}/>
        </Collapse>
      </div>
    )
  })

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary={`English Literature ${course.substr(3)}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      {listCourseMaterials}
    </>
  )
};

export default FacultyCourses;

{/* <Collapse in={open101} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
  <ListItem button className={classes.nested}>
    <ListItemIcon>
      <ChromeReaderModeIcon />
    </ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
</List>
</Collapse>
<ListItem button onClick={handle202Click}>
<ListItemIcon>
  <CollectionsIcon />
</ListItemIcon>
<ListItemText primary="English 202" />
{open202 ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={open202} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
  <ListItem button className={classes.nested}>
    <ListItemIcon>
      <ChromeReaderModeIcon />
    </ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
</List>
</Collapse>
<ListItem button onClick={handle303Click}>
<ListItemIcon>
  <CollectionsIcon />
</ListItemIcon>
<ListItemText primary="English 303" />
{open303 ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={open303} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
  <ListItem button className={classes.nested}>
    <ListItemIcon>
      <ChromeReaderModeIcon />
    </ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
</List>
</Collapse>
<ListItem button onClick={handle404Click}>
<ListItemIcon>
  <CollectionsIcon />
</ListItemIcon>
<ListItemText primary="English 404" />
{open404 ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={open404} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
  <ListItem button className={classes.nested}>
    <ListItemIcon>
      <ChromeReaderModeIcon />
    </ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
</List>
</Collapse>
<ListItem button onClick={handle505Click}>
<ListItemIcon>
  <CollectionsIcon />
</ListItemIcon>
<ListItemText primary="English 505" />
{open505 ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={open505} timeout="auto" unmountOnExit>
<List component="div" disablePadding>
  <ListItem button className={classes.nested}>
    <ListItemIcon>
      <ChromeReaderModeIcon />
    </ListItemIcon>
    <ListItemText primary="Starred" />
  </ListItem>
</List>
</Collapse> */}