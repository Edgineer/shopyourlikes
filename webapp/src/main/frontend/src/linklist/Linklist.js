import React, { Component } from 'react';
import axios from "axios/index";
import './../App.css';


//var obj = JSON.parse('{"firstName":"John", "lastName":"Doe"}');
//var listLinks = [{title: "Google", url: "http://www.google.com"}, {title: "Reddit", url: "http://www.reddit.com"}, {title: "Youtube", url: "http://www.youtube.com"}];

const MESSAGE_URL = "/links";
//const USER = "Matt";

class Linklist extends Component {

  constructor(props) {
    super(props);
    this.state = {
        linklist: [],
        error: null,
        username: "",
        title: "",
        url: "",
        priority: 0,
        deleteTitle: ""
    };
  }

  handleChangeTitle = event => {
    this.setState({ title: event.target.value });
  }

  handleChangeURL = event => {
    this.setState({ url: event.target.value });
  }

  handleDeleteChange = event => {
    this.setState({ deleteTitle: event.target.value });
  }

  handleAddLinkSubmit = event => {
    event.preventDefault();

    const userLink = {
      "username": this.props.location.state.userVal,
      "title": this.state.title,
      "url": this.state.url,
      "priority": this.state.linklist.length + 1
    };

    //alert(JSON.stringify(userLink, null, 4));
    axios.post(MESSAGE_URL, userLink )
      .then(res => {
        this.fetchMessage();
      })
  }

  handleDeleteLinkSubmit = event => {
    event.preventDefault();
    
    let sendID = "";
    for (let i = 0; i < this.state.linklist.length; i++) {
      if (this.state.linklist[i].title === this.state.deleteTitle) {
        sendID = this.state.linklist[i]._id;
        break;
      }
    }

    axios.delete(MESSAGE_URL +  "/" + sendID)
      .then(res => {
        this.fetchMessage();
      })
  }

  async componentDidMount() {
    this.fetchMessage();
  }

  async fetchMessage() {
    try {
      //response.data contains an array of JavaScript objects
        const response = await axios.get(MESSAGE_URL + "/" + this.props.location.state.userVal);
        this.setState({linklist: response.data});
    } catch (error) {
        this.setState({error: "Error!"});
    } 
  } 

  render() {

    return (
      <div className="App">

      <div className="App-header">
        <h1>{this.props.location.state.userVal}</h1>
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
        <form onSubmit={this.handleAddLinkSubmit}>
          <label>
          <br></br><br></br>
            Add New Link:
            <br></br>
            Title:
            <input type="text" name="title" onChange={this.handleChangeTitle} />
            <br></br>
            Url:
            <input type="text" name="url" onChange={this.handleChangeURL} />
            <br></br>
          </label>
          <button type="submit">Add new link</button>
        </form>
      </div>

<br></br>
<br></br>

      <div>
        <form onSubmit={this.handleDeleteLinkSubmit}>
          <label>
            Enter Title of Post to delete:<br></br>
            <input type="text" name="deleteTitle" onChange={this.handleDeleteChange} />
          </label>
          <br></br>
          <button type="submit">Delete Post</button>
        </form>
      </div>

      </div>
    );
  }
}

export default Linklist;