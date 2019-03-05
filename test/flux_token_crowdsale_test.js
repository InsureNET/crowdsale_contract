/* Importing manual helper file as a Export using babel library */
// import ether_to_wei from '../helper/ether_to_wei';

/* BDD/TDD assertion library */
require('chai')
  .use(require('chai-as-promised'))
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
    
    // Hardcap value
    // one_token == 10^18
    // number_of_token = 100
    // total token = one_token * number_of_tokens 
    this.cap = web3.utils.toBN(web3.utils.toWei('100', 'ether'));
    
    // Investor minimum ether to buy token
    this.investor_min_cap = 200000000000000;

    // ICO stages
    this.PreICO = 0;
    this.MainICO = 1;
    
    // Getting the time of last mined block in seconds
    // this.latest_block = web3.eth.getBlock("latest").timestamp;
    // Deploying new instance of Crowdsale contract
    // Passing deployed tokens as third parameter
    this.crowdsale = await flux_token_crowdsale.new(this.rate, 
                                                this.wallet, 
                                                this.token.address,
                                                this.cap);

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
    it('sending_ether_getting_token', async function() {
      // Convert value passed in to equivalent wei and finally convert to big number
      const value = web3.utils.toBN(web3.utils.toWei('5', 'ether'));
      // Now the FluxTokenCrowdsale contract try to mint the requested token
      // This contract can only mint the token and sent to beneficiary if it has ownership permission
      // This permission is granted within beforeEach function
      await this.crowdsale.sendTransaction({value: value, from: investor_1});    
    });

   /* Testing the purchase of token on behalf of someone else */
   it('buying_token_on_behalf_of_someone_else_address', async function() { 
     const value = web3.utils.toBN(web3.utils.toWei('5', 'ether'));
     // Buying token on the given address behalf
     // This account is not buying token on its own
     const buyer = investor_2;

     await this.crowdsale.buyTokens(investor_1, {value: value, from: buyer}).should_be_fulfilled;
   });
  });



  /* Begin Assertion Three */
  describe('Testing_Minted_Crowdsale_functionality', function() { 
  
    /* Testing rise in totalSupply after minting token */
    it('testing_increase_in_total_supply_after_minting', async function() { 
      // Getting initial totalSupply value
      const initial_total_supply = await this.token.totalSupply();

      // Makeing a transaction and getting token
      const value = web3.utils.toBN(web3.utils.toWei('5', 'ether'));
      await this.crowdsale.sendTransaction({value: value, from: investor_1});

      // Getting final totalSuply value
      const final_total_supply = await this.token.totalSupply();

      assert.isTrue(final_total_supply > initial_total_supply);
    });
  });



  /* Begin Assertion Four */
  describe('Testing_minimum_invesment_amount', function() { 
  
    /* Testing min invesment value */
    it('testing_invesment_minimum', async function() { 
      const value = this.investor_min_cap - 1;
      
      await this.crowdsale.buyTokens(investor_1, {value: value, from: investor_2}).should.be.rejectedWith("revert"); 
    });      
  });  


  /* Begin Assertion Five */
  describe('testing_crowdsale_stages', function() { 
    /* Testing default stage */
    it('testing_default_stage', async function() { 
      const stage = await this.crowdsale.stage();

      assert.equal(stage, this.PreICO);
    });

    /* Testing inital rate of crowdsale stage */
    it('testing_rate_of_default_ico', async function() { 
      const value = await this.crowdsale.rate();

      assert.equal(value, 500);
    });

    /* Testing admin can change ICO stages */
    it('testing_admin_can_alter_ico_stage', async function() { 
      await this.crowdsale.setCrowdsaleStage(this.MainICO, {from: _});
      const stage = await this.crowdsale.stage();
      
      assert.equal(stage, this.MainICO);
    });

    /* Testing change in rate after altering ico stage */
    it('testing_change_in_rate', async function() {
      await this.crowdsale.setCrowdsaleStage(this.MainICO, {from: _});
      const value = await this.crowdsale.rate();

      assert.equal(value, 250);
    });

    /* Testing non-admin can change ICO stages or not */
    it('testing_non_admin_alter_ICO_stages', async function() { 
      await this.crowdsale.setCrowdsaleStage(this.MainICO, {from: investor_1}).should.be.rejectedWith("revert");
    });
  });

});
