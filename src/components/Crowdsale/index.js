import React from 'react';
import Web3 from 'web3';
import './_crowdsale.scss';

class Crowdsale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minimumBet: 1,
      totalSupply : 0,
      address: '',
      saleRate: 0,
      symbol: '',
      balance: 0,
      raised: 0,
    };

    if (typeof web3 !== 'undefined') {
      console.log('Using web3 detected from external source like Metamask');
      this.web3 = new Web3(web3.currentProvider);
    } else {
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    const EdTechCrowdsale = web3.eth.contract([{ constant: false, inputs: [{ name: '_beneficiary', type: 'address' }], name: 'buyTokens', outputs: [], payable: true, stateMutability: 'payable', type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'purchaser', type: 'address' }, { indexed: true, name: 'beneficiary', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }, { indexed: false, name: 'amount', type: 'uint256' }], name: 'TokenPurchase', type: 'event' }, { payable: true, stateMutability: 'payable', type: 'fallback' }, { inputs: [{ name: '_rate', type: 'uint256' }, { name: '_wallet', type: 'address' }, { name: '_token', type: 'address' }, { name: '_openingTime', type: 'uint256' }, { name: '_closingTime', type: 'uint256' }, { name: '_cap', type: 'uint256' }, { name: '_goal', type: 'uint256' }], payable: false, stateMutability: 'nonpayable', type: 'constructor' }, { constant: true, inputs: [], name: 'rate', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'token', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'wallet', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'weiRaised', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }]);

    this.state.EdTechCrowdsaleInstance = EdTechCrowdsale.at('0xe487439c011b495838df81c1b166647a043e5a7d');

    const EdTechToken = web3.eth.contract([{ constant: true, inputs: [], name: 'mintingFinished', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'name', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'totalSupply', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_from', type: 'address' }, { name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transferFrom', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'decimals', outputs: [{ name: '', type: 'uint8' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_amount', type: 'uint256' }], name: 'mint', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_subtractedValue', type: 'uint256' }], name: 'decreaseApproval', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: 'balance', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [], name: 'finishMinting', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [], name: 'owner', outputs: [{ name: '', type: 'address' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: true, inputs: [], name: 'symbol', outputs: [{ name: '', type: 'string' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: '_to', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'transfer', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_addedValue', type: 'uint256' }], name: 'increaseApproval', outputs: [{ name: '', type: 'bool' }], payable: false, stateMutability: 'nonpayable', type: 'function' }, { constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: '', type: 'uint256' }], payable: false, stateMutability: 'view', type: 'function' }, { constant: false, inputs: [{ name: 'newOwner', type: 'address' }], name: 'transferOwnership', outputs: [], payable: false, stateMutability: 'nonpayable', type: 'function' }, { anonymous: false, inputs: [{ indexed: true, name: 'to', type: 'address' }, { indexed: false, name: 'amount', type: 'uint256' }], name: 'Mint', type: 'event' }, { anonymous: false, inputs: [], name: 'MintFinished', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'previousOwner', type: 'address' }, { indexed: true, name: 'newOwner', type: 'address' }], name: 'OwnershipTransferred', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'owner', type: 'address' }, { indexed: true, name: 'spender', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Approval', type: 'event' }, { anonymous: false, inputs: [{ indexed: true, name: 'from', type: 'address' }, { indexed: true, name: 'to', type: 'address' }, { indexed: false, name: 'value', type: 'uint256' }], name: 'Transfer', type: 'event' }]);

    this.state.EdTechTokenInstance = EdTechToken.at('0x58b36e7a41278cffe43471b2d606b143671f2f5d');
  }

  componentDidMount() {
    this.updateState();
    this.setupListeners();
    setInterval(this.updateState.bind(this), 10e3);
  }

  updateState() {
    this.state.EdTechTokenInstance.symbol((err, result) => {
      if (result != null) {
        this.setState({
          symbol: result
        });
      }
    });
    // this.state.EdTechTokenInstance.totalSupply((err, result) => {
    //   if (result != null) {
    //     this.setState({
    //       totalSupply: result
    //     });
    //   }
    // });
    web3.eth.getAccounts((error, accounts) => {
      if (error) return console.error(error);
      if (!accounts || accounts.length <= 0) return console.error("No accounts found. Please login to Metamask.");

      this.state.EdTechTokenInstance.balanceOf(accounts[0], (err, result) => {
        if (result != null) {
          this.setState({
            balance: parseFloat(result) / 1e18,
          });
        }
      });
    });

    this.state.EdTechCrowdsaleInstance.rate((err, result) => {
      if (result != null) {
        console.warn(result);
        this.setState({
          saleRate: parseInt(result),
        });
      }
    });

    this.state.EdTechCrowdsaleInstance.weiRaised((err, result) => {
      if (result != null) {
        console.warn(result);
        this.setState({
          raised: parseFloat(result) / 1e18,
        });
      }
    });
  }

  // Listen for events and executes the buyTokens method
  setupListeners() {
    const button = this.refs.invest;

    button.addEventListener('click', (event) => {
      event.target.className = 'number-selected';
      this.buyTokens(parseInt(this.refs['ether-bet'].valueL), (done) => {});
    });
  }

  buyTokens(number, cb) {
    let bet = this.refs['ether-bet'].value;
    if (!bet) bet = 1;
    if (parseFloat(bet) < this.state.minimumBet) {
      alert('You must bet more than the minimum');
      cb();
    } else {
      web3.eth.getAccounts((error, accounts) => {
        if (error) return console.error(error);
        if (!accounts || accounts.length <= 0) return console.error("No accounts found. Please login to Metamask.");

        this.state.EdTechCrowdsaleInstance.buyTokens(accounts[0], {
          gas: 300000,
          from: accounts[0],
          value: web3.toWei(bet, 'ether'),
        }, (err, result) => {
          cb();
        });
      });
    }
  }

  render() {
    return (
      <section className="crowdsale" id="crowdsale">
        <div className="container">
          <h1 className="crowdsale-title">EDTEC Crowdsale</h1>
          <div className="block">
            <b>Token Symbol:</b> &nbsp;
            <span>{this.state.symbol}</span>
          </div>
          <div className="block">
            <b>Token Address:</b> &nbsp;
            <span>{this.state.EdTechTokenInstance.address}</span>
          </div>
          <div className="block">
            <b>You own:</b> &nbsp;
            <span>{this.state.balance} EDTEC Tokens</span>
          </div>
          <hr />
          <div className="block">
            <b>Total ETH raised:</b> &nbsp;
            <span>{this.state.raised}</span>
          </div>
          <div className="block">
            <b>Rate:</b> &nbsp;
            <span>1 ETH = {this.state.saleRate} EDTEC</span>
          </div>
          <hr />
          <h2>Purchase EDTEC Tokens</h2>
          <div class="form-inline">
            How much Ether do you want to invest?
            <div class="input-icon">
              <i>ETH</i>
              <input className="bet-input" ref="ether-bet" type="number" placeholder="1"/>
            </div>
            <button ref="invest" className="crowdsale-invest">Invest</button>
          </div>
        </div>
      </section>
    );
  }
}

/* const CrowdSale = props =>
  (<section className="crowdsale" id="crowdsale">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h4 className="crowdsale-title">Crowdsale! Limited time!</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <ul className="crowdsale-list">
            Todo...
          </ul>
        </div>
      </div>
    </div>
  </section>); */

export default Crowdsale;
