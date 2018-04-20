import React from 'react';
import Web3 from 'web3';
import Moment from 'react-moment';
import 'moment-timezone';
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
      cap: 0,
      openingTime: "",
      closingTime: "",
      hasError: false,
    };

    if (typeof web3 !== 'undefined') {
      console.log('Using web3 detected from external source like Metamask');
      this.web3 = new Web3(web3.currentProvider);
    } else {
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    if (typeof web3 === 'undefined') {
      this.state.hasError = true;
      return;
    }

    let crowdsaleContract = props.data.find(item=>item.name=="crowdsale")
    const EdTechCrowdsale = web3.eth.contract(JSON.parse(crowdsaleContract.abi));
    this.state.EdTechCrowdsaleInstance = EdTechCrowdsale.at(crowdsaleContract.address);

    let tokenContract = props.data.find(item=>item.name=="token")
    const EdTechToken = web3.eth.contract(JSON.parse(tokenContract.abi));
    this.state.EdTechTokenInstance = EdTechToken.at(tokenContract.address);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  componentDidMount() {
    if (this.state.hasError)
      return;
      
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

    this.state.EdTechCrowdsaleInstance.openingTime((err, result) => {
      if (result != null) {
        console.warn(result);

        let time = parseInt(result);
        if (!time || time <= 0) return console.error("No opening time set for crowdsale.");

        this.setState({
          openingTime:<Moment unix tz="UTC" format="YYYY/MM/DD HH:mm:ss z">{time}</Moment>,
        });
      }
    });

    this.state.EdTechCrowdsaleInstance.closingTime((err, result) => {
      if (result != null) {
        console.warn(result);

        let time = parseInt(result)
        if (!time || time <= 0) return console.error("No closing time set for crowdsale.");

        this.setState({
          closingTime: <Moment unix tz="UTC" format="YYYY/MM/DD HH:mm:ss z">{time}</Moment>,
        });
      }
    });

    this.state.EdTechCrowdsaleInstance.cap((err, result) => {
      if (result != null) {
        console.warn(result);
        this.setState({
          cap: parseFloat(result) / 1e18,
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
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<h1>Something went wrong. Install Metamask plugin, connect account and refresh this page.</h1>);
    }
    return (
      <section className="crowdsale" id="crowdsale">
        <div className="container">
          <h1 className="crowdsale-title">EDTEC Crowdsale</h1>
          <div className="block">
            <b>Start Time: </b> &nbsp;
            <span>{this.state.openingTime}</span>
          </div>
          <div className="block">
            <b>End Time: </b> &nbsp;
            <span>{this.state.closingTime}</span>
          </div>
          <div className="block">
            <b>Maximum Cap: </b> &nbsp;
            <span>{this.state.cap} ETH</span>
          </div>
          <div className="block">
            <b>Total ETH raised:</b> &nbsp;
            <span>{this.state.raised}</span>
          </div>
          <hr />
          <div className="block">
            <b>Token Symbol:</b> &nbsp;
            <span>{this.state.symbol}</span>
          </div>
          <div className="block">
            <b>Token Address:</b> &nbsp;
            <span>{this.state.EdTechTokenInstance.address}</span>
          </div>
          <div className="block">
            <b>Rate:</b> &nbsp;
            <span>1 ETH = {this.state.saleRate} EDTEC</span>
          </div>
          <div className="block">
            <b>You own:</b> &nbsp;
            <span>{this.state.balance} EDTEC Tokens</span>
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
