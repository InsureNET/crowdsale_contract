pragma solidity ^0.5.0;

import "/home/beach/node_modules/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "/home/beach/node_modules/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "/home/beach/node_modules/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract FluxTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale {
  // Crowdsale contructor
  // Capped crowdsale constructor
  constructor(uint256 rate, address payable wallet, IERC20 token, uint256 cap) 
    Crowdsale(rate, wallet, token)
    CappedCrowdsale(cap)    
    public { }
}
