import React, { Component } from 'react';
// import Identicon from 'identicon.js';
import logo from './logo.svg'
import "./index.css";

class Mainnav extends Component {

  render() {


    return (
      <div className="nav_bar">
         {this.props.title}
      </div>
    );
  }
}

export default Mainnav;