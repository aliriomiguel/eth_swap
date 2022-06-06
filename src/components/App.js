import React, { Component } from 'react'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import EthSwap from '../abis/EthSwap.json'
import Main from './Main'
import Navbar from './Navbar'
import './App.css'


class App extends Component {

  
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    
    const web3 = window.web3
    
    const accounts = await web3.eth.getAccounts()
    //console.log(accounts)
    this.setState({account: accounts[0]})

    const ethBalance = await web3.eth.getBalance(this.state.account)
    //console.log(ethBalance)
    this.setState({ethBalance})
    

    /* 
    //A solution that I used since I got the report from MM that they don't inject web3.js anymore
    const windowEthereum = window.ethereum

    const accounts = await windowEthereum.request({ method: 'eth_requestAccounts' })
    this.setState({ account: accounts[0] })
    console.log('account ' + this.state.account)
    
    const hexBalance = await windowEthereum.request({method: 'eth_getBalance', params: [
      this.state.account,
      'latest'
    ], 'id': 1})
    var dec = parseInt(hexBalance, 16)
    const ethBalance = dec / (10**18)
    this.setState({ethBalance})
    console.log('balance ' + ethBalance)

    const networkId = await windowEthereum.networkVersion // this was used to get the network Id
    */


    //Load Token
    const networkId = await web3.eth.net.getId()
    //console.log(networkId)
    const tokenData = Token.networks[networkId]
    if(tokenData){
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      //console.log('token contract:')
      //console.log(token)
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      //console.log('tokenBalance: ', tokenBalance.toString())
      this.setState({ tokenBalance: tokenBalance.toString()})
    }
    else{
      window.alert('Token contract not deployed to detected network')
    }

    //Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData){
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    }
    else{
      window.alert('Token contract not deployed to detected network')
    }
    //console.log(this.state.ethSwap)
  } 

  async loadWeb3(){
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-ethereum browser detected. You should consider trying MetaMask!')
    }

    this.setState({loading: false})
  }

  constructor(props){
    super(props)
    this.state = {
      account : '',
      token: {},
      ethSwap: {},
      tokenBalance: '0',
      ethBalance : '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
      content = <p id = "loader" className="text-center">Loading...</p>
    }
    else{
      content = <Main/>
    }
    return (
      <div>
        <Navbar account = {this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
