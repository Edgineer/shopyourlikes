import React, { Component } from 'react';
import axios from "axios/index";
import './../App.css';


//var obj = JSON.parse('{"firstName":"John", "lastName":"Doe"}');
//var listLinks = [{title: "Google", url: "http://www.google.com"}, {title: "Reddit", url: "http://www.reddit.com"}, {title: "Youtube", url: "http://www.youtube.com"}];

const MESSAGE_URL = "/links";

class Linklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
        linklist: [],
        error: null,
        username: "",
        title: "",
        url: "",
        priority: 0
    };
  }

  handleChangeUsername = event => {
    this.setState({ username: event.target.value });
  }

  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  }

  handleChangeURL = event => {
    this.setState({ url: event.target.value });
  }

  handleChangePriority = event => {
    this.setState({ priority: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    //alert(this.state.title);

    const userLink = {
      "username": this.state.username,
      "title": this.state.title,
      "url": this.state.url,
      "priority": this.state.priority
    };

    //alert(userLink.username);

    axios.post(MESSAGE_URL, { userLink })
      .then(res => {
        //alert(res.data);
        this.fetchMessage();
      })
  }

  async componentDidMount() {
    this.fetchMessage();
  }

  async fetchMessage() {
    try {
      //response.data contains an array of JavaScript objects
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
          {this.state.linklist.map(function(name, index) {
            return <li key={index}><a className="App-onelink" href={name.url}>{name.title}</a></li>;
          })}
        </ul>
      </div>

      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add link here:
            <input type="text" name="username" onChange={this.handleChangeUsername} />
            <input type="text" name="title" onChange={this.handleChangeTitle} />
            <input type="text" name="url" onChange={this.handleChangeURL} />
            <input type="text" name="priority" onChange={this.handleChangePriority} />
          </label>
          <button type="submit">Add new link</button>
        </form>
      </div>


      </div>
    );
  }
}

export default Linklist;