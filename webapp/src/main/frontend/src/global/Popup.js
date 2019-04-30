import React, { Component } from 'react';
import styled from "styled-components";

import closeIcon from '../img/menu_close.png';

const FullScreen = styled.div`
    position: fixed;
    z-index: 99999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const Overlay = styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    width: 100%;
    height: 100%;
`;

const PopupWindow = styled.div`
    position: fixed;
    z-index: 1;
    background-color: transparent;
    box-shadow: ${props => props.emptyHeader ? 'unset' : '0px 10px 25px 2px rgba(150,150,150, 0.34)'};
    width: ${props => props.width ? props.width : '90%'};
    height: auto;
    margin: auto;
    max-width: ${props => props.width ? '90%' : '700px'};
    max-height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const HeaderSection = styled.div`
    display: block;
    background-color: ${props => props.emptyHeader ? 'unset' : '#f7f7fa'};
    height: auto;
    top: 0px;
    position: ${props => props.emptyHeader ? 'absolute' : 'relative'};
    width: 100%;
    ${props => props.emptyHeader && 'z-index: 9;'}
`;

const CloseIcon = styled.img`
    position: ${props => props.emptyHeader ? 'relative' : 'absolute'};
    top: ${props => props.emptyHeader ? '0px' : '20px'};
    right: 20px;
    width: 15px;
    height: 15px;
    display: block;
    cursor: pointer;
    ${props => props.emptyHeader && `margin-bottom: 10px;`}
`;

const Content = styled.div`
    position: relative;
    display: block;
    height: auto;
    background: white;
    margin: 0;
    max-height: 100%;
    overflow-y: hidden;
    padding: ${props => props.fullContent ? `0px` : `20px`};
    ${props => props.emptyHeader && `box-shadow: 0px 6px 25px 15px rgba(150,150,150,0.34);`}
    ${props => props.contentStyle? props.contentStyle : ""}
`;

const FooterSection = styled.div`
    display: block;
    background-color: #f7f7fa;
    height: auto;
    top: 0px;
    position: relative;
    width: 100%;
    padding-top: 5px;
`;

export default class Popup extends Component {

    render() {
        const { content, headerContent, fullContent, width, force, close, footerContent, contentStyle } = this.props;
        const emptyHeader = !headerContent || (headerContent === null);
        return (
            <FullScreen>
                <Overlay onClick={() => {if (!force) {close();}}} />
                <PopupWindow width={width} emptyHeader={emptyHeader}>
                    {!force && emptyHeader && <CloseIcon style={{right: "0px", marginLeft: "auto"}} emptyHeader={emptyHeader} src={closeIcon} onClick={() => close()}/>}
                    <HeaderSection emptyHeader={emptyHeader}>
                        {!force && !emptyHeader && <CloseIcon fullContent={fullContent} src={closeIcon} onClick={() => close()}/>}
                        {headerContent}
                    </HeaderSection>
                    <Content fullContent={fullContent} emptyHeader={emptyHeader} contentStyle={contentStyle}>
                        {content}
                    </Content>
                    {(footerContent != null && !force) && <FooterSection>{footerContent}</FooterSection>}
                </PopupWindow>
            </FullScreen>

        );

    }
}