import React, { Component } from 'react'

export default class Toggle extends Component {
  state = {
    on: false
  };

  onAuth = () => {
    this.setState({ on: !this.state.on });
  };
  
  render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        {children({
          on: this.state.on,
          onAuth: this.toggle
        })}
      </React.Fragment>
    )
  }
}
