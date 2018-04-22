var EdTechTokenCrowdsale = artifacts.require('./EdTechTokenCrowdsale.sol');

module.exports = function(deployer, network, accounts) {
  return liveDeploy(deployer, accounts);
};

function latestTime() {
  var latestBlock;
  latestBlock = web3.eth.getBlock('latest', function(error, result){
    if(!error){
      latestBlock = result.timestamp;
    }
    else{
        console.error(error);
    }
  })
  return latestBlock;
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)}
};

async function liveDeploy(deployer, accounts) {
  const BigNumber = web3.BigNumber;
  const RATE = 1000;
  const startTime = 1524325857;
  const endTime =  1526139357;
  console.log([startTime, endTime, RATE, accounts[0]]);
  // uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet)

  return deployer.deploy(EdTechTokenCrowdsale, startTime, endTime, RATE, accounts[0]).then( async () => {
    const instance = await EdTechTokenCrowdsale.deployed();
    const token = await instance.token.call();
    console.log('Token Address', token);
  })
}
