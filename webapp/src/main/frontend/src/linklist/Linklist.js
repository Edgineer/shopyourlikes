import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios/index";
import './../App.css';
import './Linklist.css';
import logo from "./../img/logoColor.svg"



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

  handleUpdatePriorityUp(linkObject) {

    let priorityID = linkObject.priority;
    if (priorityID !== 1) {

      let count = 0;
      for (let i = 0; i < this.state.linklist.length; i++) {

        const userLink = {
          "username": this.props.location.state.userVal,
          "title": this.state.linklist[i].title,
          "url": this.state.linklist[i].url
        };

        if (this.state.linklist[i].priority === priorityID - 1) {
          userLink.priority = priorityID;
        } else if (this.state.linklist[i].priority === priorityID) {
          userLink.priority = priorityID - 1;
        } else {
          userLink.priority = this.state.linklist[i].priority;
        }

        axios.put(MESSAGE_URL + "/" + this.state.linklist[i]._id, userLink).then( res => {
          count++;
          if (count === this.state.linklist.length) {
            this.fetchMessage();
          }
        });
      }
    
    }
  }

  handleUpdatePriorityDown(linkObject) {

    let priorityID = linkObject.priority;
    if (priorityID !== this.state.linklist.length) {

      let count = 0;
      for (let i = 0; i < this.state.linklist.length; i++) {

        const userLink = {
          "username": this.props.location.state.userVal,
          "title": this.state.linklist[i].title,
          "url": this.state.linklist[i].url
        };

        if (this.state.linklist[i].priority === priorityID) {
          userLink.priority = priorityID + 1;
        } else if (this.state.linklist[i].priority === priorityID + 1) {
          userLink.priority = priorityID;
        } else {
          userLink.priority = this.state.linklist[i].priority;
        }

        axios.put(MESSAGE_URL + "/" + this.state.linklist[i]._id, userLink).then( res => {
          count++;
          if (count === this.state.linklist.length) {
            this.fetchMessage();
          }
        });
      }
    
    }
  }

  //handleDeleteLinkSubmit = (event, sendID) => {
  handleDeleteLinkSubmit(sendID) {
    //event.preventDefault();

  
    //let sendID = "";
    /*
    let sendID = "";
    for (let i = 0; i < this.state.linklist.length; i++) {
      if (this.state.linklist[i].title === this.state.deleteTitle) {
        sendID = this.state.linklist[i]._id;
        break;
      }
    } */

    for(let i = 0; i < this.state.linklist.length; i++){ 
      if (this.state.linklist[i]._id === sendID) {
        this.state.linklist.splice(i, 1); 
      }
    }   

    axios.delete(MESSAGE_URL +  "/" + sendID)
      .then(res => {

        for (let i = 0; i < this.state.linklist.length; i++) {

          const userLink = {
            "username": this.props.location.state.userVal,
            "title": this.state.linklist[i].title,
            "url": this.state.linklist[i].url,
            "priority": i + 1
          };

          axios.put(MESSAGE_URL + "/" + this.state.linklist[i]._id, userLink).then( res => {});

        }
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
        <img src={logo} alt="ShopYourLikes"/>
        <h1>{this.props.location.state.userVal}</h1>
      </div>

      {/* left side */}
      <div className="split left">
        <div>

          <form onSubmit={this.handleAddLinkSubmit}>
            <label>
              <div className="link-input">
                <h3>Add a new link</h3>
                Title:
                <br/>
                <input type="text" name="title" placeholder="Link Title..." className="title-form" onChange={this.handleChangeTitle} />
              </div>
              <div className="link-input">
                Url:
                <br/>
                <input type="text" name="url" placeholder="Link Address..." className="address-form" onChange={this.handleChangeURL} />
              </div>
              <button type="submit" className="link-submit-button">Add new link</button>
              <br/>
            </label>
          </form>
        </div>

        <br></br>
        <br></br>

        <br/>
        {/* section for the external page's cosmetic settings */}
        {/* TODO: make it so both of the radio buttons are automatically
        selected on whatever the client orginally picked */}
        <div className="settingsBox">

          <h3>Page Settings</h3>

          <div className="theme-options">
            Themes
            <br/>
            <select id="themes" name="themes">
              <option value="Default">Default</option>
              <option value="Light-Colorful">Light and Colorful</option>
              <option value="Green">Green</option>
              <option value="Red">Red</option>
              <option value="Dark">Dark</option>
              <option value="Earthy">Earthy</option>
            </select>
          </div>

          <br/>

          {/* Options to select black or white text */}
          <div className="text-color-options">
            <label for="textColor">Change Page Text Color</label>
            <br/>
            <select id="textColor" name="textColor">
              <option value="Black">Black</option>
              <option value="White">White</option>
            </select>
          </div>

          <br/>

          {/* Options to select clear or filled buttons */}
          <div className="button-style-options">
            <label for="buttonStyle">Change Button Style</label>

            <br/>
            <select id="buttonStyle" name="buttonStyle">
              <option value="Clear">Clear</option>
              <option value="Filled">Filled</option>
            </select>
          </div>

          <br/>

          {/* Form to inputfile */}
          <div className="input-file">
            <label className="photo-button" for="photo-upload">Add A Background Photo</label>
            <br/>
            <input id="photo-upload" name="photo-upload" type="file" onChange={this.fileChangedHandler}/>
          </div>

          {/* button to save settings   */}
          <br/><br/>
          <button className="save-button" onClick={this.saveSettings}>Save!</button>
          <br/><br/>

        </div>

        <hr/>

        <div className="link-buttons">
          <h3>Other Pages</h3>
          <Link to={`/tree/${this.props.location.state.userVal}`}><button type="button" className="extern-view">See Link Page</button></Link>
          <br/><br/>
          <Link to="/stats"><button type="button" className="stats-view">Statistics Report</button></Link>
        </div>
        
        <br/>

        <hr/>
        <br/>

        <button className="sign-out-button">Sign Out</button>

        <br/><br/>

      </div>

      {/* right side */}
      <div className="split right">
        <div>
          <br/>
          <ul className="App-list">
            {this.state.linklist.map((name, index) => {
              if (name.priority === 1 && name.priority === this.state.linklist.length) {
                return <li key={index}>
                <a className="App-onelink" href={name.url}>{name.title}</a>
              <button onClick={() => {this.handleDeleteLinkSubmit(name._id)}}>Delete Link</button>
              </li>;
              } else if (name.priority === 1) {
                return <li key={index}>
                <a className="App-onelink" href={name.url}>{name.title}</a>
                <button onClick={() => {this.handleUpdatePriorityDown(name)}}>Move Down</button>
              <button onClick={() => {this.handleDeleteLinkSubmit(name._id)}}>Delete Link</button>
              </li>;
              } else if (name.priority === this.state.linklist.length) {
                return <li key={index}>
                <a className="App-onelink" href={name.url}>{name.title}</a>
              <button onClick={() => {this.handleUpdatePriorityUp(name)}}>Move Up</button>
              <button onClick={() => {this.handleDeleteLinkSubmit(name._id)}}>Delete Link</button>
              </li>;
              } else {
              return <li key={index}>
                <a className="App-onelink" href={name.url}>{name.title}</a>
              <button onClick={() => {this.handleUpdatePriorityUp(name)}}>Move Up</button>
              <button onClick={() => {this.handleUpdatePriorityDown(name)}}>Move Down</button>
              <button onClick={() => {this.handleDeleteLinkSubmit(name._id)}}>Delete Link</button>
              </li>;
              }
            })}
          </ul>
        </div>
      <br/><br/><br/>
      </div>



      </div>
    );
  }
}

export default Linklist;