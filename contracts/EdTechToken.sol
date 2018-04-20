pragma solidity ^0.4.21;


import "./MintableToken.sol";


/**
 * @title EdTechToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `MintableToken` functions.
 *
 * Reference: https://github.com/OpenZeppelin/zeppelin-solidity
 */
contract EdTechToken is MintableToken {

  string public constant name = "EdTechToken";
  string public constant symbol = "EDTEC";
  uint8 public constant decimals = 18;
}
