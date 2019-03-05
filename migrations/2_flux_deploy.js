const flux_token = artifacts.require("FluxToken");
  /* Dummy Token Parameter */ 
  const name = "Flux Token";
  const symbol = "FT";
  const decimals = 18;

module.exports = function(deployer) {
  /* Passing constructor value */
  deployer.deploy(flux_token, name, symbol, decimals);
};
