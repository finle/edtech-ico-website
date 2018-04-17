import React from 'react';
import Web3 from 'web3';
import './_crowdsale.scss';

class Crowdsale extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
          symbol: result,
        });
      }
    });
    this.state.EdTechTokenInstance.balanceOf(web3.eth.accounts[0], (err, result) => {
      if (result != null) {
        this.setState({
          balance: parseFloat(result) / 1e18,
        });
      }
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
    const liNodes = this.refs.numbers.querySelectorAll('li');
    liNodes.forEach((number) => {
      number.addEventListener('click', (event) => {
        event.target.className = 'number-selected';
        this.buyTokens(parseInt(event.target.innerHTML), (done) => {
          // Remove the other number selected
          for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].className = '';
          }
        });
      });
    });
  }

  buyTokens(number, cb) {
    let bet = this.refs['ether-bet'].value;
    if (!bet) bet = 1;
    if (parseFloat(bet) < this.state.minimumBet) {
      alert('You must bet more than the minimum');
      cb();
    } else {
      this.state.EdTechCrowdsaleInstance.buyTokens(web3.eth.accounts[0], {
        gas: 300000,
        from: web3.eth.accounts[0],
        value: web3.toWei(bet, 'ether'),
      }, (err, result) => {
        cb();
      });
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1>EDTEC Crowdsale</h1>
        <div className="block">
          <b>Symbol:</b> &nbsp;
          <span>{this.state.symbol}</span>
        </div>
        <div className="block">
          <b>ETH raised:</b> &nbsp;
          <span>{this.state.raised}</span>
        </div>
        <div className="block">
          <b>Rate:</b> &nbsp;
          <span>1 ETH = {this.state.saleRate} EDTEC</span>
        </div>
        <div className="block">
          <b>Purchased:</b> &nbsp;
          <span>{this.state.balance} EDTEC Tokens</span>
        </div>
        <hr />
        <h2>Purchase EDTEC Tokens</h2>
        <label>
          <b>How much Ether do you want to spend? <input className="bet-input" ref="ether-bet" type="number" placeholder="1" /></b> ETH
          <br />
        </label>
        <ul ref="numbers">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </div>
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
