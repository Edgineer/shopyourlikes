import React, { Component } from 'react';
import axios from "axios/index";
import styled from "styled-components";

const Text = styled.div`
          color: black;
      `;

const MESSAGE_URL = "/api/message";

export default class MessageCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: null,
            error: null
        };
    }

    async componentDidMount() {
        this.fetchMessage();
    }

    async fetchMessage() {
        try {
            const response = await axios.get(MESSAGE_URL + "?name=test");
            this.setState({message: response.data});
        } catch (error) {
            this.setState({error: "Error!"});
        }
    }

    render() {
        var html;
        if (this.state.message) {
            const {message, date, visits} = this.state.message;

            html =
                <Text>
                    <h>{message}</h>
                    <div>You have visited this page {visits} times!</div>
                    <span>Your last visit was on {date}</span>
                </Text>;
        } else if (this.state.error) {
            html = <div>Error! {this.state.error}</div>;
        } else {
            html = <div>Loading...</div>;
        }

        return html;
    }
}