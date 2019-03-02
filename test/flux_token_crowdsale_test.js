/* BDD/TDD assertion library */
require('chai')
  .should()

/* Importing contracts */
const flux_token_crowdsale = artifacts.require('FluxTokenCrowdsale');
const flux_token = artifacts.require('FluxToken');

// Accounts represent array of accounts created by ganache
contract('flux_token_crowdsale', function(accounts) {

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
    this.wallet = '';
    this.token = '';
    // Deploying new instance of Crowdsale contract
    this.token = await flux_token_crowdsale.new(this.rate, 
                                                this.wallet, 
                                                this.token);
  });
     

});
