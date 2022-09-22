//functional imports
import React, { useEffect, useState } from 'react';

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
  console.log(course)
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

  // useEffect(() => {
  //   const host = `http://localhost:3001/`
  //   let bookarray = []
  //   fetch()
  // })

  // useEffect(() => {
    
    
  //   courses.forEach((course) => {
  //     fetch(`${host}${course}`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       bookarray.push(data[Math.ceil(Math.random() * 4)])
  //       if (bookarray.length === 5) {
  //         return setCardState(bookarray)
  //       }
  //     })
  //   })
  // }, [])

  const handleClick = () => {
    return null
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary={`English ${course.substr(3)}`} />
        {/* {open101 ? <ExpandLess /> : <ExpandMore />} */}
      </ListItem>
      <Collapse in={true} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ChromeReaderModeIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
        </Collapse>
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