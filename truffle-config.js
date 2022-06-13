require('babel-register');
require('babel-polyfill');

const HDWalletProvider = require('truffle-hdwallet-provider');
var private_keys = [
  'f2cc3ea9a6f40017be2ce3c6e181dd0872533f833684dd6cc77cfea1c5d3f7b6', 
  '635962c53568a491b501e34af6da3309194ccaf553fbb255d50a6cb76d342bfd'
];

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      /*provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: "https://rinkeby.infura.io/v3/459eb50045fc46499b82136bab26c5f5",
        numberOfAddresses: 2
      }),*/
      provider: function () {
        return new HDWalletProvider(
          private_keys[0],
          "https://rinkeby.infura.io/v3/459eb50045fc46499b82136bab26c5f5"
        );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: { 
        enabled: true,
        runs: 200
      },
      version: '^0.8.0'
    }
  }
}
