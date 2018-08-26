import React, { Component } from 'react';

import Portal from './Portal';

export default class Modal extends Component {
  render() {
    return (
      <Portal>
        <div style={{ background: 'teal', height: '100%', width: '100%', position: 'absolute', left: '0', right: '0' }}>
            {this.props.children}
        </div>
      </Portal>
    )
  }
};



