import React from 'react';
import { Progress } from 'reactstrap';
import './_progressbar.scss';


function httpGet(url) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', url, false);
  xmlHttp.send(null);
  return xmlHttp.response;
}

const CrowdsaleProgressBar = (props) => {
  let address;
  let url;
  let balance;
  let percentage;
  let goal = 20000;
  props.data.map((item) => {
    if (item.name === 'dummy') {
      address = item.address
      url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=YourApiKeyToken`;
      balance = (JSON.parse(httpGet(url)).result / (10 ** 18)).toFixed(2);
      percentage = ((balance / goal) * 100).toFixed(2);
    }
  });
  console.log(percentage);


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
            <div className="text-center">{balance}/{goal} ETH</div>
            <div className="blank_row">
            </div>
            <div className="text-center">{percentage}% completed!</div>
            <div className="blank_row">
            </div>
            <div>
              <Progress className="progressbar-size" animated color="info" value={percentage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrowdsaleProgressBar;
