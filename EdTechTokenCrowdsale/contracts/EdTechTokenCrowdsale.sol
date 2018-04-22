pragma solidity ^0.4.21;

import './Crowdsale.sol';
import './MintableToken.sol';
import './EdTechToken.sol';

contract EdTechTokenCrowdsale is Crowdsale{

  function EdTechTokenCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet)
    Crowdsale(_startTime, _endTime, _rate, _wallet)

  {

  }

  function createTokenContract() internal returns (MintableToken) {
    return new EdTechToken();
  }
}
