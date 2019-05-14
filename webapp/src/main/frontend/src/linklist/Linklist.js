import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';


var obj = JSON.parse('{"firstName":"John", "lastName":"Doe"}');
var listLinks = [{title: "Google", url: "http://www.google.com"}, {title: "Reddit", url: "http://www.reddit.com"}, {title: "Youtube", url: "http://www.youtube.com"}];

const MESSAGE_URL = "/links";

class Linklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
        linklist: null,
        error: null
    };
  }

  async componentDidMount() {
    this.fetchMessage();
  }

  async fetchMessage() {
    try {
        const response = await axios.get(MESSAGE_URL);
        this.setState({linklist: response.data});
    } catch (error) {
        this.setState({error: "Error!"});
    }
  }

  render() {

    return (
      <div className="App">
      <div className="App-header">
        <h1>UserName</h1>
        <h3>Bio</h3>
      </div>
      <div>
        <ul className="App-list">
          {listLinks.map(function(name, index) {
            return <li key={index}><a className="App-onelink" href={name.url}>{name.title}</a></li>;
          })}
        </ul>
      </div>
      </div>
    );
  }
}

export default Linklist;