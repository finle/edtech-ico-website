import React from 'react';
import { Circle } from 'rc-progress';
import { ProgressBar } from 'react-bootstrap';


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
      balance = JSON.parse(httpGet(url)).result / (10 ** 18);
      percentage = balance / goal;
    }
  });
  console.log(percentage);


  return (
    <section className="progressbar" id="progressbar">
      <div className="container">
        <div className="row">
          <progress value="22" max="100"></progress>
          <h4>hello there!</h4>
          <Circle percent="20" strokeWidth="40" strokeColor="#D3D3D3" />
        </div>
      </div>
    </section>
  );
}

export default CrowdsaleProgressBar;
