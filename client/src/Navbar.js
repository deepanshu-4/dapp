import React, { Component } from 'react';
// import Identicon from 'identicon.js';
import logo from './logo.svg'
import "./index.css";

class Navbar extends Component {

  render() {


    const s_elements =[];
    const s_items = [];
    if(this.props.title==="file"){
      this.props.private_response.forEach(element => {
          s_elements.unshift(element)
     });
    
   
      for (const [index, value] of  s_elements.entries()) {
        s_items.push(<> <tr><td> <bold>{index}</bold> </td> <td> <a href={"https://gateway.ipfs.io/ipfs/"+value[1]} target="_blank" > {value[0]}</a> </td> </tr>  </>)
        
      }



    }
    else{
    // s_elements.reverse();
       this.props.private_response.forEach(element => {
          s_elements.unshift(element)
     });
    const mode=this.props.mode;
    console.log("mode" ,mode,s_elements);
    
   
      for (const [index, value] of  s_elements.entries()) {
        s_items.push(<> <img src={"https://gateway.ipfs.io/ipfs/"+value} height={200} width={300}/> <a href={"https://gateway.ipfs.io/ipfs/"+value} target="_blank" > {value}</a> <button  value={value} onClick={this.props.share}> Share </button><br /> </>)
        
      }
    }



      

    return (
      <div className="body_part">
        <table>
         {s_items}
         </table>
      </div>
    );
  }
}

export default Navbar;