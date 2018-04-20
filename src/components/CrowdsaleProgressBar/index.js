import React from 'react';
import Web3 from 'web3';
import { Progress } from 'reactstrap';
import './_progressbar.scss';

class CrowdsaleProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raised: 0,
      cap: 0
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
    setInterval(this.updateState.bind(this), 10e3);
  }

  updateState() {
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

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<h1>Something went wrong. Install Metamask plugin, connect account and refresh this page.</h1>);
    }
    return (
      <section className="progressbar" id="progressbar">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="progressbar-title">Crowdsale Progress</h4>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center">{this.state.raised}/{this.state.cap} ETH</div>
              <div className="blank_row">
              </div>
              <div className="text-center">{percentage(this.state)}% completed!</div>
              <div className="blank_row">
              </div>
              <div>
                <Progress className="progressbar-size" animated color="info" value={percentage(this.state)}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

function percentage(state) {
  return ((state.raised / state.cap) * 100).toFixed(2);
}

export default CrowdsaleProgressBar;
