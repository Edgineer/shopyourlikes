import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Linklist from "./linklist/Linklist"
import Login from "./login/Login.js"
import logoColor from "./img/logoColor.svg"

/* border-left: 5px solid red;
  background-color: #f1f1f1;
  padding: 10px 20px; */

class App extends Component {
  render() {
    return (
      <Router>
      <div className="">
          <Link to="/" ><img className="App-sylLogo" src={logoColor} /></Link>
          <ul>
            <li><Link to="/linktree">Link Tree Page</Link></li>
            <li><Link to="/login">Login Page</Link></li>
          </ul>
          
        

        <Route exact path="/" component={Login}/>
        <Route exact path="/linktree" component={Linklist}/>
        <Route exact path="/login" component={Login}/>
      </div>
      </Router>
    );
  }
}

export default App;
