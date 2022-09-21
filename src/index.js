import React, {useState, createContext} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css';
import App from './components/App';
import Home from './components/Home';
import Faculty from './components/Faculty';
import Student from './components/Student';
import Explore from './components/Explore';
import Login from './components/Login';
import Signup from './components/Signup';
debugger

function index () {
  const LoggedUserContext = createContext();

  const [currentUser, setCurrentUser] = useState('')

  const root = document.getElementById('root');
  ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <LoggedUserContext.Provider value = {{currentUser, setCurrentUser}}>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="faculty" element={<Faculty />} />
              <Route path="student" element={<Student />} />
              <Route path="explore" element={<Explore />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </LoggedUserContext.Provider>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>,
    root
  );

}

index()


