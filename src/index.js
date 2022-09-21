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
const [state, setState] = useState('orange')
return(
<SomethingContext.Provider value={state, setState}/>
  <Consumer //other components but they should require the context which has to imported>
<SomethinContext.Provider/>
)
Consumer apps
import { useContext } from 'react'
import { SomethingContext } from 'SomethingContext location'
const { state, setState } useContext(AppContent)

const root = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="student" element={<Student />} />
          <Route path="explore" element={<Explore />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  root
);



