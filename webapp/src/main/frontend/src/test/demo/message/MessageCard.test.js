// MessageCard.test.js
import React from 'react';
import MessageCard from '../../../demo/message/MessageCard';
import { create } from "react-test-renderer";
import axios from 'axios/index';

jest.mock('axios/index');

describe("Message Card", () => {
    it("displays the user's name and visit info", async () => {
        const response = {
            data: {message: "Hello test!", visits: 100, date: "2019-01-01"}
        };
        axios.get.mockResolvedValue(response);
        const component = create(<MessageCard />);
        const instance  = component.getInstance();
        await instance.componentDidMount();
        console.log(instance.state.message);

        expect(instance.state.message.visits).toBe(100);
    });

    it("encounters an error fetching data", async () => {
        const response = {
            data: {message: "Hello test!", visits: 100, date: "2019-01-01"}
        };
        axios.get.mockRejectedValue(response);
        const component = create(<MessageCard />);
        const instance  = component.getInstance();
        await instance.componentDidMount();
        console.log(instance.state);

        expect(instance.state.error).toBeTruthy();
    });
});