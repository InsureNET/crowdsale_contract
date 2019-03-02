/* BDD/TDD assertion library */
require('chai')
  .should()

/* Importing contracts */
const flux_token_crowdsale = artifacts.require('FluxTokenCrowdsale');
const flux_token = artifacts.require('FluxToken');

// Accounts represent array of accounts created by ganache
// Since its required an default account to deploy the contract
// and a wallet address to store received funds
// _ denotes default account and wallet holds address of 
// second account which is used by Crowdsale contract
contract('flux_token_crowdsale', function([_, wallet]) {

  beforeEach(async function() {
    // Token attribues for constructor
    this.name = 'Flux Token';
    this.symbol = 'FT';
    // Ether has 18 decimal place ie. 1Ether = 10^18 wei
    // FluxToken has 18 decimal place ie. 1FT = 10^18 smallest denomination
    this.decimals = 18;
    // Deploying new instance of token
    this.token = await flux_token.new(this.name, 
                                      this.symbol,
                                      this.decimals);
    
    // Crowdsale contract attributes for contructor
    // rate - denots how much token is received for 1Ether
    // 500 tokens are received for one ether 
    this.rate = 500;
    this.wallet = wallet;
    // Deploying new instance of Crowdsale contract
    // Passing deployed tokens as third parameter
    this.token = await flux_token_crowdsale.new(this.rate, 
                                                this.wallet, 
                                                this.token);
  });
     

});
