import React, { Component } from 'react';
// import Identicon from 'identicon.js';
import logo from './logo.svg'
import "./index.css";

class Public extends Component {

  render() {

const s_elements =[];
    // s_elements.reverse();
       this.props.public_response.forEach(element => {
    s_elements.unshift(element)
});
    // console.log("mode" ,mode,s_elements);
    const s_items = []
    // s_elements.reverse();
    // if(mode=="public")
     { 
      

      for (const [sindex, svalue] of s_elements.entries()) {
       s_items.push(<>  <div className="post"><div className="post_header"> 
      <h3>{ svalue[1] }</h3>
      </div>
       <img className="post_img" src={"https://gateway.ipfs.io/ipfs/"+svalue[0]} />
      </div>
        </>)
        // s_items.push(<> <img src={"https://gateway.ipfs.io/ipfs/"+svalue[0]} height={200} width={300}/> <a href={"https://gateway.ipfs.io/ipfs/"+svalue[0]} target="_blank" > {svalue[0]}</a> <button> Share by {svalue[1]} </button><br /> </>)
        
      }
    }
    


      

    return (
      <div className="body_part">
         {s_items}
      </div>
    );
  }
}

export default Public;