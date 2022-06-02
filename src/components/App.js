import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    console.log('debug')
    console.log(window.ethereum)
    await this.loadBlockchainData()
  }

  async loadBlockchainData(){
    const web3 = window.ethereum
    
    const accounts = await web3.request({ method: 'eth_requestAccounts' })
    this.setState({ account: accounts[0] })
    console.log('account ' + this.state.account)
    

    const hexBalance = await web3.request({method: 'eth_getBalance', params: [
      this.state.account,
      'latest'
    ], 'id': 1})
    var dec = parseInt(hexBalance, 16)
    const ethBalance = dec / (10**18)
    this.setState({ethBalance})
    console.log('balance ' + ethBalance)
  }

  loadWeb3(){
    window.addEventListener('load', async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
              // Request account access if needed
              await window.ethereum.enable();
              // Acccounts now exposed
              return web3;
          } catch (error) {
              console.error(error);
          }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          const web3 = window.web3;
          //window.web3 = new Web3(window.web3.currentProvider);
          console.log('Injected web3 detected.');
          return web3;
          // Acccounts always exposed
      }
      // Non-dapp browsers...
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        return web3;
      }
  });
  }

  constructor(props){
    super(props)
    this.state = {
      account : '',
      ethBalance : '0'
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Hello World</h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
