import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import ipfs from './ipfs';
import Navbar from './Navbar';
import Public from './Public';
import Mainnav from './Mainnav';
import Upload from './Upload';
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      web3:null,
      accounts:null,
      contract:null,
      private_length:0,
      file_private_length:0,
      ipfshash:[""],
      public_response:[""],
      file_response:[""],
      value:"private"
    };
    this.share = this.share.bind(this);
    this.onipfssubmit = this.onipfssubmit.bind(this);
    this.captureFile=this.captureFile.bind(this);
    this.display=this.display.bind(this);
    this.capturetitle=this.capturetitle.bind(this);
  }



  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      // console.log("ds",deployedNetwork);
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract ,ind} = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set("dk").send({ from: accounts[0] });
    let response=[];
    let file_response=[]
    let public_response=[];
    // Get the value from the contract to prove it worked.


    const private_length = await contract.methods.private_length_get().call({from :accounts[0]});
    const file_private_length = await contract.methods.file_private_length_get().call({from :accounts[0]});
    // console.log("dekh 1 ",private_length,accounts[0]);

    const public_length = await contract.methods.public_length_get().call({from :accounts[0]});
    // console.log("dekh 2 ",public_length,accounts[0]);

     for (var i = 0; i < private_length ; i++) 
     {
        const person = await contract.methods.data(accounts[0],i).call({from :accounts[0]});
        // console.log(person);
        response.push(person);
      }


     for (var i = 0; i < file_private_length ; i++) 
     {
        const f_person = await contract.methods.fdata(accounts[0],i).call({from :accounts[0]});
        console.log("files",f_person);
        file_response.push(f_person);
      }

      for (var i = 0; i < public_length ; i++) 
     {
        const pub_person = await contract.methods.people(i).call({from :accounts[0]});
        // console.log(pub_person[0],pub_person[1]);
        public_response.push(pub_person);
      } 
    // const private_data = await contract.methods.data().call({from :accounts[0]});
    // console.log("public res",public_response);
    
    // Update state with the result.
    this.setState({public_response});
    this.setState({file_response});
    this.setState({ ipfshash: response});
     this.setState({private_length});
  };


  captureFile=(event)=>{
    event.stopPropagation()
    event.preventDefault()
    const file =event.target.files[0]
    let reader =new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend=()=>this.convertToBuffer(reader);    
  };
  capturetitle=(event)=>{
    event.stopPropagation()
    event.preventDefault()
    const file_title =event.target.value
    this.setState({file_title})
    // let reader =new window.FileReader()
    // reader.readAsArrayBuffer(file)
    // reader.onloadend=()=>this.convertToBuffer(reader);    
  };

  convertToBuffer=async(reader)=>{
    const buffer=await Buffer.from(reader.result);
    this.setState({buffer});
  };
  
  display=async(event)=>{
     if(event.target.value=="public"){
           this.setState({value:"private"});
     }
     else{
            this.setState({value:"public"});
     }


  };

   
  share = async(event)=>{
    const { accounts, contract ,public_response} = this.state;
     
     contract.methods.public_set(event.target.value).send({ from: accounts[0] });
      var obj={"1":accounts[0],"0":event.target.value};
      public_response.push(obj);
      // console.log(obj);
      this.setState({public_response});

  };

  onipfssubmit= async (event)=> {
    const { accounts, contract ,ipfshash} = this.state;
    event.preventDefault();
    await ipfs.add(this.state.buffer,async(err,result)=>{
    // console.log(err,result);
    ipfshash.push(result[0].hash);     
    this.setState({ipfshash:ipfshash});
    contract.methods.private_set(result[0].hash).send({ from: accounts[0] });
    
    })
  };

  onfilesubmit= async (event)=> {
    const { accounts, contract ,file_response} = this.state;
    event.preventDefault();
    await ipfs.add(this.state.buffer,async(err,result)=>{
    console.log(err,result);
    let nobj={"1":result[0].hash,"0":this.state.file_title};
    file_response.push(nobj);     
    console.log(file_response);
    this.setState({file_response});
    contract.methods.file_set(this.state.file_title,result[0].hash).send({ from: accounts[0] });
    
    })
  };

  


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

      

      const items = []

      if(this.state.value == "private"){
        // console.log("mera mode",this.state.mode);
          items.push(<div className="head_shot">Public collection <br/>  <Public mode={this.state.value}  public_response={this.state.public_response} /> </div>);
           
      }
      else
      {
            items.push(<div className="head_shot">Your private collection <br/> <Navbar share={this.share}  private_response={this.state.ipfshash} /> </div>);
            
      }


    return (
       <>
       <Mainnav title={this.state.accounts[0]}/>
    
       <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/file">Save file</Link>
            </li>
            <li>
              <Link  className="link" to="/image">Save image</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/file">
             <Upload title="file" capturetitle={this.capturetitle} onipfssubmit={this.onfilesubmit} captureFile={this.captureFile}  value={this.state.value}/>
             <Navbar title ="file"   private_response={this.state.file_response}/>
          </Route>
          <Route path="/image">
            <Upload title="image" onipfssubmit={this.onipfssubmit} captureFile={this.captureFile}  value={this.state.value}/>
            <Navbar title="image" share={this.share}  private_response={this.state.ipfshash}/>
          </Route>
          <Route path="/">
            <Public mode={this.state.value}  public_response={this.state.public_response} />
          </Route>
        </Switch>
      </div>
    </Router>
      </>

    );
  }

}

export default App;
