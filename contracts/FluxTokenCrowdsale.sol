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


  /* Setting max and min invesment an investor can contribute
   * Maximum Contribution Limit = 30 Ether
   * Minimum Contribution Limit = 0.002 Ether
   * 
   * This Limit is set not based on per transaction basics but
   * on total transaction made by a individual account 
   */
   uint256 public investor_min_cap = 2000000000000000         // 0.002 * 10^18  --> Expressed in Wei
   uint256 public investor_max_cap = 30000000000000000000     // 30 * 10^18
   // Mapping to keep track of which account contribute howmuch wei
   mapping(address => uint256) public contributions;

   
  
}
