var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "YOURAPIKEY";
var mnemonic = "YOURMNEMONIC";

module.exports = {
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey)
      },
      network_id: 3,
      from: "0xfbfd26551fa04237095eda83b256a45883ab4507",
      gas: 4000000
    }
  }
};
