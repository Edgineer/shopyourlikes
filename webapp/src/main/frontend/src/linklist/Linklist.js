import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios/index";
import './../App.css';
import './Linklist.css';
import logo from "./../img/logoColor.svg"
import logoTrash from "./../img/icons_trash.png";
import logoUp from "./../img/icons_up.png";
import logoDown from "./../img/icons_down.png";



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
        userInfo: null, //user object returned from backend
        selectedFile: null,
        showPhoto: true,  //true: yes, false: no
        savedShowPhoto: true,
        textColor: true, //true: black, false: white
        savedTextColor: true,
        buttonStyle: true, //true: filled, false: clear
        savedButtonStyle: true,
        themeSelected: 0, 
        savedTheme: 0,
    };

    this.handleThemeOptions = this.handleThemeOptions.bind(this);
    this.handlePhotoOptions = this.handlePhotoOptions.bind(this);
    this.handleButtonStyleOptions = this.handleButtonStyleOptions.bind(this);
    this.handleTextColorOptions = this.handleTextColorOptions.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
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

    axios.post(MESSAGE_URL + "/", userLink)
      .then(res => {
        this.fetchMessage();
      }).catch(function(error) {
        // console.log("failed to add a new link")
      });
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
    
    } else {

      let count = 0;
      for (let i = 1; i < this.state.linklist.length; i++) {

        const userLink = {
          "username": this.props.location.state.userVal,
          "title": this.state.linklist[i].title,
          "url": this.state.linklist[i].url,
          "priority": this.state.linklist[i].priority - 1
        };

        axios.put(MESSAGE_URL + "/" + this.state.linklist[i]._id, userLink).then( res => {
          count++;
          if (count === this.state.linklist.length - 1) {

            const userUpLink = {
              "username": this.props.location.state.userVal,
              "title": this.state.linklist[0].title,
              "url": this.state.linklist[0].url,
              "priority": this.state.linklist.length
            };
      
            axios.put(MESSAGE_URL + "/" + this.state.linklist[0]._id, userUpLink).then( res => {
              this.fetchMessage();
            });
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
    
    } else {

      const userDownLink = {
        "username": this.props.location.state.userVal,
        "title": this.state.linklist[this.state.linklist.length - 1].title,
        "url": this.state.linklist[this.state.linklist.length - 1].url,
        "priority": 1
      };

      axios.put(MESSAGE_URL + "/" + this.state.linklist[this.state.linklist.length - 1]._id, userDownLink).then( res => {
        let count = 1;
        for (let i = 0; i < this.state.linklist.length - 1; i++) {

          const userLink = {
            "username": this.props.location.state.userVal,
            "title": this.state.linklist[i].title,
            "url": this.state.linklist[i].url,
            "priority": this.state.linklist[i].priority + 1
          };

          axios.put(MESSAGE_URL + "/" + this.state.linklist[i]._id, userLink).then( res => {
            count++;
            if (count === this.state.linklist.length) {
              this.fetchMessage();
            }
          });
        }
      });

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

    //get settings info
    try {
      const DBsettings = await axios.get("/" + this.props.location.state.userVal);
      this.setState({
        userInfo: DBsettings.data,
        savedButtonStyle: DBsettings.data.buttonstyle,
        buttonStyle: DBsettings.data.buttonstyle,
        savedShowPhoto: DBsettings.data.profilepic,
        showPhoto: DBsettings.data.profilepic,
        savedTextColor: DBsettings.data.textcolor,
        textColor: DBsettings.data.textcolor,
        savedTheme: DBsettings.data.theme,
        themeSelected: DBsettings.data.theme,
      });
    } catch (error) {
      console.log("error getting settings")
      this.setState({error: "Error!"});
    }
  } 

  //this function caches the uploaded file
  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
    // console.log(event)
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
      // console.log("Tried to upload but nothing was selected!!\n")
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
          // console.log(res)
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
    var photoEnabled = this.state.showPhoto;

    


    //save the settings localy
    this.setState({
      savedButtonStyle: buttonStyle,
      savedShowPhoto: photoEnabled,
      savedTextColor: textColor,
      savedTheme: selectedTheme,
    });


    //then make a put call to the backend
    const newSettings = {
      "textcolor": textColor,
      "buttonstyle": buttonStyle,
      "profilepic": photoEnabled,
      "theme": selectedTheme,
    };


    //alert(JSON.stringify(userLink, null, 4));
    axios.put("/settings/" + this.state.userInfo._id, newSettings)
      .then(res => {
        this.fetchMessage();
      }).catch(function(error){
        console.log("Updating the settings didn't go through")
      });
  }

  //function to save a change in photo option dropdown menu
  handlePhotoOptions(event) {
    switch(event.target.value){
      case "On":
        this.setState({showPhoto: true});
        break;
      case "Off":
        this.setState({showPhoto: false});
        break;
      default:
        this.setState({showPhoto: this.state.savedShowPhoto});
    }
  }

  //function to save a change in the theme option dropdown menu
  handleThemeOptions(event) {
    switch(event.target.value){
      case "Default":
        this.setState({themeSelected: 0});
        break;
      case "Light-Colorful":
        this.setState({themeSelected: 1});
        break;
      case "Green":        
        this.setState({themeSelected: 2});
        break;
      case "Red":
        this.setState({themeSelected: 3});
        break;
      case "Dark":
        this.setState({themeSelected: 4});
        break;
      case "Earthy":        
        this.setState({themeSelected: 5});
        break;
      case "None":
      default:
        this.setState({themeSelected: this.state.savedTheme});
        break;
    }
  }

  // function to save a change in the button style dropdown menu
  handleButtonStyleOptions(event) {

    switch(event.target.value){
      case "Filled":
        this.setState({buttonStyle: true});
        break;
      case "Clear":
        this.setState({buttonStyle: false});
        break;
      default:
        this.setState({buttonStyle: this.state.savedButtonStyle});
    }


  }

  // function to save a change from the text color dropdown menu
  handleTextColorOptions(event) {
    switch(event.target.value){
      case "Black":
        this.setState({textColor: true});
        break;
      case "White":
        this.setState({textColor: false});
        break;
      default:
        this.setState({textColor: this.state.savedTextColor});
    }
  }

  //Handles when the user clicks the sign-out button
  handleSignout(event){
    localStorage.removeItem("token");
    this.props.history.push({pathname: "/"});
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
            <select id="themes" name="themes" onChange={this.handleThemeOptions}>
              <option value="None" onChange={this.handleThemeOptions}></option>
              <option value="Default" onChange={this.handleThemeOptions}>Default</option>
              <option value="Light-Colorful" onChange={this.handleThemeOptions}>Light and Colorful</option>
              <option value="Green" onChange={this.handleThemeOptions}>Green</option>
              <option value="Red" onChange={this.handleThemeOptions}>Red</option>
              <option value="Dark" onChange={this.handleThemeOptions}>Dark</option>
              <option value="Earthy" onChange={this.handleThemeOptions}>Earthy</option>
            </select>
          </div>

          <br/>

          {/* Options to select black or white text */}
          <div className="text-color-options">
            <label for="textColor">Change Page Text Color</label>
            <br/>
            <select id="textColor" name="textColor" onChange={this.handleTextColorOptions}>
              <option value="None" onChange={this.handleTextColorOptions}></option>
              <option value="Black" onChange={this.handleTextColorOptions}>Black</option>
              <option value="White" onChange={this.handleTextColorOptions}>White</option>
            </select>
          </div>

          <br/>

          {/* Options to select clear or filled buttons */}
          <div className="button-style-options">
            <label for="buttonStyle">Change Button Style</label>

            <br/>
            <select id="buttonStyle" name="buttonStyle" onChange={this.handleButtonStyleOptions}>
              <option value="None" onChange={this.handleButtonStyleOptions}></option>
              <option value="Clear" onChange={this.handleButtonStyleOptions}>Clear</option>
              <option value="Filled" onChange={this.handleButtonStyleOptions}>Filled</option>
            </select>
          </div>

          <br/>

          {/* Options to turn on or off the photo background */}
          <div className="enable-photo-options">
            <label for="photos-enabled">Enable Background Photo</label>

            <br/>
            <select id="photos-enabled" name="photos-enabled" onChange={this.handlePhotoOptions}>
              <option value="None" onChange={this.handlePhotoOptions}></option>
              <option value="On" onChange={this.handlePhotoOptions}>On</option>
              <option value="Off" onChange={this.handlePhotoOptions}>Off</option>
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


        <div className="link-buttons">
          <h3>Other Pages</h3>
          <Link to={`/tree/${this.props.location.state.userVal}`}><button type="button" className="extern-view">See Link Page</button></Link>
          <br/><br/>
          <Link to="/stats"><button type="button" className="stats-view">Statistics Report</button></Link>
        </div>
        
        <br/>

        <hr/>
        <br/>

        <button className="sign-out-button" onClick={this.handleSignout.bind(this)}>Sign Out</button>

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
              <button onClick={() => {this.handleDeleteLinkSubmit(name._id)}}><img src={logoTrash} alt="LogoTrash" /></button>
              </li>;
              } else {
              return <li key={index}>
                <a className="App-onelink" href={name.url}>{name.title}</a>
              <button onClick={() => {this.handleUpdatePriorityUp(name)}}><img src={logoUp} alt="LogoUp" /></button>
              <button onClick={() => {this.handleUpdatePriorityDown(name)}}><img src={logoDown} alt="LogoDown" /></button>
              <button onClick={() => {this.handleDeleteLinkSubmit(name._id)}}><img src={logoTrash} alt="LogoTrash" /></button>
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