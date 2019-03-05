pragma solidity ^0.5.0;

import "../openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "../openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";

// Do not alter the order of the imported extensions
// Got no idea why Linerization error pops out for changing order
contract SlotheeTokenCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, Ownable {
  // Crowdsale contructor
  // Capped crowdsale constructor
  constructor(uint256 rate, address payable wallet, IERC20 token, uint256 cap) 
    Crowdsale(rate, wallet, token)
    CappedCrowdsale(cap)
    public { }


   /* Crowdsale stages */
   enum CrowdsaleStages { PreSale, StageOne, StageTwo, StageThree, StageFour }
   
   // Crowdsale stage
   CrowdsaleStages public stage = CrowdsaleStages.PreSale;

   /* Only allow admin to chage the crowdsale stages
    * This change in stage is initiated manually by admin 
    * Rate is fixed randomly
    * DONT FORGET TO CHANGE RATE WHILE PRODUCTION DEPLOYMENT *MAN*
    */
   function setCrowdsaleStage(uint stages) public onlyOwner {
     // Presale
     if (uint(CrowdsaleStages.PreSale) == stages) {
       stage = CrowdsaleStages.PreSale;
       setRate(4105);
     }
     // Stage One
     else if (uint(CrowdsaleStages.StageOne) == stages) {
       stage = CrowdsaleStages.StageOne;
       setRate(3934);
     }
     // Stage Two
     else if (uint(CrowdsaleStages.StageTwo) == stages) {
       stage = CrowdsaleStages.StageTwo;
       setRate(3763);
     }
     // Satge Three
     else if (uint(CrowdsaleStages.StageThree) == stages) {
       stage = CrowdsaleStages.StageThree;
       setRate(3592);
     }
     // Stage Four
     else if (uint(CrowdsaleStages.StageFour) == stages) {
       stage = CrowdsaleStages.StageFour;
       setRate(3421);
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
    // Initial  limit for buying tokens is set
    require(weiAmount >= investor_min_cap);
    // Shit this error always comes while applying maximum investor limit
    // PENDING CODE 
  }
  
}
