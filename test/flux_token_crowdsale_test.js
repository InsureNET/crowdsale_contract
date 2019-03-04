/* Importing manual helper file as a Export using babel library */
// import ether_to_wei from '../helper/ether_to_wei';

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
// This array contatin all available accounts
contract('flux_token_crowdsale', function([_, wallet, investor_1, investor_2]) {

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
    this.crowdsale = await flux_token_crowdsale.new(this.rate, 
                                                this.wallet, 
                                                this.token.address);

    // Setting permission for FluxTokenCrowdsale contract to mint token
    // This addMinter() function exist within MinterRole.sol file
    await this.token.addMinter(this.crowdsale.address);
    
  });

  /* Begin Assertion One */
  describe('crowdsale_details', function() { 

    /* Testing rate of Crowdsale contract */
    it('testing_for_rate', async function() { 
      const rate = await this.crowdsale.rate();
      assert.equal(rate, 500);
    });

    /* Testing token of Crowdsale contract */
    it('tracking_the_token', async function() { 
      const token = await this.crowdsale.token();
      assert.equal(token, this.token.address);
    });

    /* Testing wallet of Crowdsale contract */
    it('testing_the_wallet_address', async function() {
      const wallet_address = await this.crowdsale.wallet();
      assert.equal(wallet_address, this.wallet);
    });
  });

  /* Begin Assertion Two */
  describe('checking_payment_return_token', function() { 
  
    /* Testing sending ether and getting token */
    it('getting_ether', async function() {
      // Convert value passed in to equivalent wei and finally convert to big number
      const value = web3.utils.toBN(web3.utils.toWei('5', 'ether'));
      // Now the FluxTokenCrowdsale contract try to mint the requested token
      // This contract can only mint the token and sent to beneficiary if it has ownership permission
      // This permission is granted above within beforeEach function
      // await this.crowdsale.sendTransaction({value: value, from: investor_1});    
    });
  });
     

});
