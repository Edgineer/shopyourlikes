import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Home from "./home/Home";
import Demo from "./demo/Demo";

class App extends Component {
  render() {
    return (
    <Router>
      <div className="">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/demo">Demo</Link></li>
        </ul>

        <Route exact path="/" component={Home}/>
        <Route exact path="/demo" component={Demo}/>
      </div>
      </Router>
    );
  }
}

export default App;
