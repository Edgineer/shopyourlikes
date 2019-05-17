import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Linklist from "./linklist/Linklist"
import Login from "./login/Login.js"
<<<<<<< HEAD
import InstagramLogin from "./instagramlogin/InstagramLogin.js"
=======
import Tree from "./tree/Tree.js"
>>>>>>> 6bc4c23ab3b6a6d247400233457ca8b84715d570
import logoColor from "./img/logoColor.svg"

/* border-left: 5px solid red;
  background-color: #f1f1f1;
  padding: 10px 20px; */
  /* 

  <Link to="/" ><img className="App-sylLogo" src={logoColor} /></Link>
  <li><Link to="/login">Login Page</Link></li>
  <li><Link to={{pathname: '/linktree', state: {userVal: this.state.username}}} ><button type="button">Link Tree Page</button></Link></li>
  <Route exact path="/linktree" component={Linklist}/>
  <Link to={{pathname: '/linktree', state: {userVal: "Joe"}}} >Link Tree Page</Link>
  */

class App extends Component {

  render() {
    return (
      <Router>
      <div className="">
          
      <Link to="/login">Login Page</Link><br></br>
        

        <Route exact path="/" component={Login}/>
        <Route exact path="/linktree" component={Linklist}/>
        <Route exact path="/login" component={Login}/>
<<<<<<< HEAD
        <Route exact path="/insta_auth" component={InstagramLogin}/>
=======
        <Route exact path="/tree/:user" component={Tree}/>
>>>>>>> 6bc4c23ab3b6a6d247400233457ca8b84715d570
      </div>
      </Router>
    );
  }
}

export default App;
