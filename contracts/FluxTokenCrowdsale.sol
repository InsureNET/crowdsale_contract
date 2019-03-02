pragma solidity ^0.5.0;

import "/home/beach/node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";

contract FluxTokenCrowdsale is Crowdsale {
  constructor(uint256 rate, address payable wallet, IERC20 token) 
    Crowdsale(rate, wallet, token)
    public { }
}
