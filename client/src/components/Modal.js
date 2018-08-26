import React, { Component } from 'react';
import styled from 'styled-components';
import Portal from './Portal';

export default class Modal extends Component {
  render() {
    return (
      <Portal>
        <ModalWrapper>
            {this.props.children}
        </ModalWrapper>
      </Portal>
    )
  }
};

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%:
    background: green;
`;
