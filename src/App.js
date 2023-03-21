
import './App.css';

import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';
import { BrowserRouter as Router,  Routes, Route, Link } from 'react-router-dom';


export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Routes>
  
           <Route path='/' element={<News key='general' pageSize={9} country='in' category='general' />}></Route>
            <Route path='/business' element={<News key='business' pageSize={9} country='in' category='business' />}></Route>
            <Route path='/entertainment' element={<News key='entertainment' pageSize={9} country='in' category='entertainment' />}></Route>
            <Route path='/health' element={<News key='health' pageSize={9} country='in' category='health' />}></Route>
            <Route path='/science' element={<News key='science' pageSize={9} country='in' category='science' />}></Route>
            <Route path='/sports' element={<News key='sports' pageSize={9} country='in' category='sports' />}></Route>
            <Route path='/general' element={<News key='sports' pageSize={9} country='in' category='general' />}></Route>
            <Route path='/technology' element={<News key='technology' pageSize={9} country='in' category='technology' />}></Route>
          </Routes>
        </Router>
          

          
        
      </div>
    )
  }
}
