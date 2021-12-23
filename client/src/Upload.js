import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ipfs from './ipfs';
import Navbar from './Navbar';
import Public from './Public';
import Mainnav from './Mainnav';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Upload extends Component {

  render() {
      const items=[];
      if(this.props.title==='image')
      {
        items.push(
          <>
          <form onSubmit={this.props.onipfssubmit}>
          <input required accept=".jpg, .png , .jpeg ,.svg" type="file" onChange={this.props.captureFile}/>

          <button className="btn" type="submit">Upload image</button>
          </form>
          </>

          );
      }
      else
      {

        items.push(
          <>
          <form onSubmit={this.props.onipfssubmit}>
          <strong>Enter name of your file </strong> <input type="text" required  onChange={this.props.capturetitle}/>
          <br/>
          <br/>
          <input required accept=".txt, .xlsx, .docx ,.pdf ,.csv" type="file" onChange={this.props.captureFile}/>
          <br/>
          <br/>
          <button className="btn" type="submit">Upload</button></form>
          </>

          );


      }

    return (
      <div className="App">
          
          <h2>Upload a {this.props.title}</h2>
          <br/>
          {items}

          <br/>
         
          <br/>
          <hr/>
    
      </div>
    );
  }
}

export default Upload;