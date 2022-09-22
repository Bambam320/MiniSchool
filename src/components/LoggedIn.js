//functional imports
import React, { useContext } from 'react';
import { LoggedUserContext } from './LoggedUserContext';
import { useNavigate } from 'react-router-dom'

//material imports
import Button from '@material-ui/core/Button';


function LoggedIn () {
  const { currentUser, setCurrentUser } = useContext(LoggedUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser('')
    navigate('/')
  }

  return (
    <>
      {currentUser ? 
        <div>
          {`Logged in as ${currentUser.username}`}
          <Button 
            onClick={handleLogout}
            style={{
              margin: '10px', 
              color: 'white',
              backgroundColor: 'darkblue'}}
            >Logout</Button>
        </div> 
        : null}
    </>
  )
}

export default LoggedIn;