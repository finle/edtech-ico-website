pragma solidity ^0.4.21;

import "./Crowdsale.sol";
import "./MintedCrowdsale.sol";
import "./TimedCrowdsale.sol";
import "./CappedCrowdsale.sol";
import "./EdTechToken.sol";


/**
 * @title EdTechCrowdsale
 * @dev This is an example of a fully fledged crowdsale.
 * The way to add new features to a base crowdsale is by multiple inheritance.
 * In this example we are providing following extensions:
 * CappedCrowdsale - sets a max boundary for raised funds
 * RefundableCrowdsale - set a min goal to be reached and returns funds if it's not met
 *
 * After adding multiple features it's good practice to run integration tests
 * to ensure that subcontracts works together as intended.
 *
 * Reference: https://github.com/OpenZeppelin/zeppelin-solidity
 */
contract EdTechCrowdsale is MintedCrowdsale, CappedCrowdsale, TimedCrowdsale {

  function EdTechCrowdsale(
      uint256 _rate,
      address _wallet,
      EdTechToken _token,
      uint256 _openingTime,
      uint256 _closingTime,
      uint256 _cap)

      public  Crowdsale(_rate, _wallet, _token)
      CappedCrowdsale(_cap)
      TimedCrowdsale(_openingTime, _closingTime) {}
}
