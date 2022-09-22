//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext'

//material imports
import Container from '@material-ui/core/Container'

function Student () {
  const { currentUser } = useContext(LoggedUserContext)

  return (
    <Container style={{marginTop: '25px'}}>
      <h3>Please login to view this content!</h3>
    </Container>
  )
}

export default Student;