import React from 'react';
import ReactDOM from 'react-dom';
import './Chatroom.css';

import Message from './Message.js';
import io from "socket.io-client";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'user' + getRandomInt(100000000000),
            chats: [],
        };
        this.socket = io('localhost:5000');
        this.submitMessage = this.submitMessage.bind(this);
        this.addMessage = this.addMessage.bind(this);
        const that = this;
        this.socket.on('RECEIVE_MESSAGE', function(data) {
            that.addMessage(data);
        });
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            username: this.state.username,
            content: ReactDOM.findDOMNode(this.refs.msg).value
        });
        ReactDOM.findDOMNode(this.refs.msg).value = "";
    }

    addMessage(data) {
        this.setState({
            ...this.state,
            chats: this.state.chats.concat([{
                username: data.username,
                content: data.content,
                img: "http://i.imgur.com/Tj5DGiO.jpg",
            }])
        });
    };

    render() {
        const { chats, username } = this.state;
        const chatMessages = chats.map((chat, key) =>
            <Message chat={chat} user={username} key={key} />
        );
        return (
            <div className="App">
                <div className="chatroom">
                    <h3>Chilltime</h3>
                    <ul className="chats" ref="chats">
                        {chatMessages}
                    </ul>
                    <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                        <input type="text" ref="msg" />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Chatroom;