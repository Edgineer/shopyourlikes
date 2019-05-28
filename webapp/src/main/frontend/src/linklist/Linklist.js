import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios/index";
import './../App.css';
import './Linklist.css';



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
        showMenu: false, //for theme dropdown menu
        textColor: true, //true: black, false: white
        bottonStyle: true, //true: filled, false: clear
        themeSelected: 0, 
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.buttonStyleClear = this.buttonStyleClear.bind(this);
    this.buttonStyleFilled = this.buttonStyleFilled.bind(this);
    this.textColorBlack = this.textColorBlack.bind(this);
    this.textColorWhite = this.textColorWhite.bind(this);
    this.selectNewTheme = this.selectNewTheme.bind(this);
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
  saveSettings = () => {
    //function call to save the baked in settings to back end
    this.saveUserSelections()

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

  //function to save the selections made in the theme menu and
  // the radio menus regarding the external pages customization
  saveUserSelections() {
    //function should save values to variables
    var textColor = this.state.textColor;
    var buttonStyle = this.state.buttonStyle;
    var selectedTheme = this.state.themeSelected;

    console.log("textColor: " + textColor + "   buttonStyle: " + buttonStyle + "    selectedTheme:" + selectedTheme)

    //then make a put call to the backend
  }

  //both showMenu and closeMenu have been taken from a tutorial at the following link
  //https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true } , () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(event) {
    this.setState({ showMenu: false } , () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  // functions to handle radio buttons
  buttonStyleClear(event) {
    this.setState({buttonStyle: false});
  }

  buttonStyleFilled(event) {
    this.setState({buttonStyle: true});
  }

  textColorBlack(event) {
    this.setState({textColor: true});
  }

  textColorWhite(event) {
    this.setState({textColor: false});
  }

  //functions to handle the setting of the themes
  selectNewTheme(event) {
    var newThemeValue;

    switch(event.id) {
      case "Theme1":
        newThemeValue = 1;
        break;
      case "Theme2":
        newThemeValue = 2;
        break;
      case "Theme3":
        newThemeValue = 3;
        break;
      case "Theme4":
        newThemeValue = 4;
        break;
      case "Theme5":
        newThemeValue = 5;
        break;
      default:
        newThemeValue = 0;
    }

    this.setState({themeSelected: newThemeValue});
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

      <br/>
      {/* section for the external page's cosmetic settings */}
      {/* TODO: make it so both of the radio buttons are automatically
       selected on whatever the client orginally picked */}
      <div className="settingsBox">

        <div className="dropdownbtn">
          <button onClick={this.showMenu} className="themes-button">Themes</button>
          <br/>
          {
            this.state.showMenu
              ? (
                <div className="theme-selection-container">
                  <button id="Default" className="theme-selection" onClick={this.selectNewTheme}>Theme 0</button>
                  <br/>
                  <button id="Theme1" className="theme-selection" onClick={this.selectNewTheme}> Theme 1</button>
                  <br/>
                  <button id="Theme2" className="theme-selection" onClick={this.selectNewTheme}> Theme 2 </button>
                  <br/>
                  <button id="Theme3" className="theme-selection" onClick={this.selectNewTheme}> Theme 3 </button>
                  <br/>
                  <button id="Theme4" className="theme-selection" onClick={this.selectNewTheme}> Theme 4 </button>
                  <br/>
                  <button id="Theme5" className="theme-selection" onClick={this.selectNewTheme}> Theme 5 </button>
                </div>
              )
              : (
                null
              )
          }
        </div>


        <br/>
        <br/>

        {/* Options to select black or white text */}
        <label>White</label>
        <input type="radio" name="TextColor" input="White"/>

        <label>Black</label>
        <input type="radio" name="TextColor" input="Black"/>

        <br/>
        <br/>

        {/* Options to select clear or filled buttons */}
        <label>Clear</label>
        <input type="radio" name="ButtonStyle" input="Clear" onClick={this.buttonStyleClear}/>

        <label >Filled</label>
        <input type="radio" name="ButtonStyle" input="Filled" onClick={this.buttonStyleFilled}/>

        <br/>
        <br/>

        {/* Form to inputfile */}
        <div>
          <input type="file" onChange={this.fileChangedHandler}/>
          <br/>
        </div>

        {/* button to save settings   */}
        <br/>
        <button onClick={this.saveSettings}>Save!</button>
        <br/>

      </div>

      <br/>
      <br/>

      <Link to={`/tree/${this.props.location.state.userVal}`}><button type="button">See Link List</button></Link>

      <br></br>
      <br></br>

      <Link to="/stats"><button type="button">Statistics Report</button></Link>

      <br></br>

      <hr/>
      
      

      </div>
    );
  }
}

export default Linklist;