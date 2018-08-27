import React, { Component } from 'react'

export default class Profile extends Component {
  render() {
    return (
      <div>
        User account page for { this.props.match.params.username }
      </div>
    )
  }
}
