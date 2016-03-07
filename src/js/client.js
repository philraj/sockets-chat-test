import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

var $ = document.querySelector.bind(document);
var socket = io();

var ChatBox = React.createClass({
  componentDidMount() {
    socket.on('chat message', (data) => {
      this.setState({
        messages: this.state.messages.concat([data])
      })
    });
  },

  getInitialState() {
    return {
      messages: []
    }
  },

  handleSubmit (e) {
    e.preventDefault();

    var inputName = this.refs.username.value;

    if (inputName.length === 0 ) {
      inputName = 'anon';
    }

    var data = {
      username: inputName,
      msg: this.refs.message.value
    };

    socket.emit('chat message', data);
    this.refs.message.value = '';
  },

  render() {
    // console.log(this.state)
    var messageList = this.state.messages.map( (message, i) => {
      return (
        <li key={i}> {message.username}: {message.msg} </li>
      )
    })

    return (
      <div>
        <ul id="messages">
          {messageList}
        </ul>
        <form id="form" onSubmit={this.handleSubmit}>
          <input ref="username" id="username" placeholder="ENTER YOUR NAME..." autoComplete='false'/>
          <input ref="message" id="m" autoComplete='false'/> <button>Send</button>
        </form>
      </div>
    )
  },

  componentDidRender() {
    window.scrollTo(0, document.body.scrollHeight);
  }
});

ReactDOM.render(<ChatBox/>, $('#app'));
