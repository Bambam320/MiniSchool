//functional imports
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { LoggedUserContext } from './LoggedUserContext'

//component and other file imports
import '../index.css';
import Home from './Home';
import Faculty from './Faculty';
import Student from './Student';
import Explore from './Explore';
import Login from './Login';
import Signup from './Signup';
import NavBar from './NavBar';

function App() {
  const [currentUser, setCurrentUser] = useState('')

  //provides context to and route to entire app
  return (
    <LoggedUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div style={{ background: 'radial-gradient(#ffe6cc, #fff2e6)' }}>
        <Routes>
          {/* sets "/" to default with NavBar component and indexes home to it */}
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="faculty/*" element={<Faculty />} /> //root for faculty tree
            <Route path="student/*" element={<Student />} />
            {/* <Route path="explore" element={<Explore />} /> */}
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    </LoggedUserContext.Provider>
  )
}

export default App;