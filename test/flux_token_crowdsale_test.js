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
    this.decimals = 18;
    // Deploying new instance of token
    this.token = await flux_token.new(this.name, 
                                      this.symbol,
                                      this.decimals);
    
    // Crowdsale contract attributes for contructor
    this.rate = '';
    this.wallet = wallet;
    // Deploying new instance of Crowdsale contract
    // Passing deployed tokens as third parameter
    this.token = await flux_token_crowdsale.new(this.rate, 
                                                this.wallet, 
                                                this.token);
  });
     

});
