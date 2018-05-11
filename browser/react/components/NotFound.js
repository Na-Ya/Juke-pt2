import React, { Component } from 'react';
import { HashRouter, Route, Link, Redirect } from 'react-router-dom';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      willRedirect: false
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({willRedirect: true});
  }
  render() {
    return (
      <div>
        <h1>Did You Mean To Come Here?</h1>
        <button type="button" onClick={() => this.handleClick()}>Back to Home</button>
        {this.state.willRedirect ? <Redirect to="/" /> : null}
      </div>
    );
  }
}
