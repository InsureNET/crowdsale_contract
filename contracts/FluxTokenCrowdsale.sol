pragma solidity ^0.5.0;

import "../openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract FluxTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, Ownable {
  // Crowdsale contructor
  // Capped crowdsale constructor
  constructor(uint256 rate, address payable wallet, IERC20 token, uint256 cap) 
    Crowdsale(rate, wallet, token)
    CappedCrowdsale(cap)
    public { }


   /* Crowdsale stages */
   enum CrowdsaleStages { PreICO, MainICO }
   
   // Crowdsale stage
   CrowdsaleStages public stage = CrowdsaleStages.PreICO;

   /* Only allow admin to chage the crowdsale stages */
   function setCrowdsaleStage(uint stages) public onlyOwner {
     if (uint(CrowdsaleStages.PreICO) == stages) {
       stage = CrowdsaleStages.PreICO;
       setRate(500);
     }
     else if (uint(CrowdsaleStages.MainICO) == stages) {
       stage = CrowdsaleStages.MainICO;
       setRate(250);
     }
  }


  
  /* Setting max and min invesment an investor can contribute
   * Maximum Contribution Limit = 30 Ether
   * Minimum Contribution Limit = 0.002 Ether
   * 
   * This Limit is set not based on per transaction basics but
   * on total transaction made by a individual account 
   */
   uint256 public investor_min_cap = 2000000000000000;         // 0.002 * 10^18  --> Expressed in Wei
   uint256 public investor_max_cap = 30000000000000000000;     // 30 * 10^18
    
  /* Extending _perValidatePurchase() function to revoke transaction if invesment amount 
   * is out of min and max cap
   */
  function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view { 
    super._preValidatePurchase(beneficiary, weiAmount);

    // Custom code begins
    require(weiAmount >= investor_min_cap);
  }
  
}
