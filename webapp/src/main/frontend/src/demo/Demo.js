import React, { Component } from 'react';
import MessageCard from "./message/MessageCard";
import Popup from "./../global/Popup";

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
        showModal: true
    };
  }

  closeModal = () => {
    this.setState({showModal: false});
  }

  render() {
    const { showModal } = this.state;
    const modal = showModal ? <Popup content={<MessageCard />} close={this.closeModal} /> : "";

    return (
      <div className="demo">
        {modal}
      </div>
    );
  }
}

export default Demo;
