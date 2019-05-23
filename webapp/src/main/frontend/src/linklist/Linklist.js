import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios/index";
import './../App.css';


//var obj = JSON.parse('{"firstName":"John", "lastName":"Doe"}');
//var listLinks = [{title: "Google", url: "http://www.google.com"}, {title: "Reddit", url: "http://www.reddit.com"}, {title: "Youtube", url: "http://www.youtube.com"}];

const MESSAGE_URL = "/links";
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dqm1bxfif/'
const CLOUDINARY_UPLOAD_PRESET = 'djyrqv1v'

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
        deleteTitle: "",
        selectedFile: null,
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

  //this function caches the uploaded file
  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
    console.log(event)
  }

  //this function handles the case in which the user confirms their picture selection
  //it sends the selected picture to the cloudinary service
  uploadImageHandler = () => {
    //modify the api url to include the upload parameter
    var url = CLOUDINARY_URL + 'upload'

    //check to see there was any file uploaded
    //if there isn't a file uploaded then return without doing anything
    if (this.state.selectedFile == null)
    {
      console.log("Tried to upload but nothing was selected!!\n")
      return
    }

    //take the file from the input and copy it over with the name of the user
    var blob = this.state.selectedFile.slice(0, this.state.selectedFile.size, 'image/jpg')
    var clone = new File([blob], this.props.location.state.userVal + '.jpg', {type: 'image/jpg'})

    //create the arguments for the api call
    var formData = new FormData()
    formData.append('file', clone)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    //configure the headers for the axios request
    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

    //make the axios request
    axios.post(url, formData, config)
        .then(function(res) {
          console.log(res)
        }).catch(function(err){
          console.error(err)
        });
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

      <br></br>

      <Link to={`/tree/${this.props.location.state.userVal}`}><button type="button">See Link List</button></Link>

      <br></br>

      <hr/>
      
      <div>
        <input type="file" onChange={this.fileChangedHandler}/>
        <br/>
        <button onClick={this.uploadImageHandler}>Upload!</button>
        <br/>
      </div>
      

      </div>
    );
  }
}

export default Linklist;