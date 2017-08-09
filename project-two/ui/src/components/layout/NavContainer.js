import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TOGGLE_HAMBURGER } from '../../actions/types';
import Nav from './Nav';

class NavContainer extends Component {
  onToggleHamburger = () => {
    this.props.dispatch({ type: TOGGLE_HAMBURGER });
  };

  render() {
    return (
      <Nav active={this.props.nav} onToggleHamburger={this.onToggleHamburger} />
    );
  }
}

export default connect(state => state)(NavContainer);
