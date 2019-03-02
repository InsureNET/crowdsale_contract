/* Utilising file */
const flux_token = artifacts.require('FluxToken');

/* A BDD/TDD assertion library */
require('chai')
  .should()

contract('flux_token', accounts => {

  /* Deploying new version of contract */
  beforeEach(async function() {
    // Passing arguments while deploying contract 
    this.token = await flux_token.new('Flux Token', 'FT', 18);
  });
  
  /* Begin Assertion */
  describe('token_details', function() {     
    /* Testing name of token */
    it('testing_for_correct_name', async function() { 
      // Getting token name
      const token_name = await this.token.name();

      // Checking if name is correct
      // assert.equal(token_name, 'Tree Token');
      // Alternate for above code line
      token_name.should.equal('Flux Token');
    });


    /* Testing symbol of token */
    it('testing_for_correct_symbol', async function() { 
      const token_symbol = await this.token.symbol();

      assert.equal(token_symbol, 'FT');
    });
    

    /* Testing decimals of token */
    it('testing_for_decimals', async function() { 
      const token_decimals = await this.token.decimals();

      assert.equal(token_decimals, 18);
    });

  
  });
  

});
