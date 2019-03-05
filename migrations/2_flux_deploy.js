const flux_token = artifacts.require("SlotheeToken");
  /* Dummy Token Parameter */ 
  const name = "Slothee Token";
  const symbol = "SLT";
  const decimals = 18;

module.exports = function(deployer) {
  /* Passing constructor value */
  deployer.deploy(flux_token, name, symbol, decimals);
};
