pragma solidity ^0.5.0;

/* Defining token attributes */
import "../openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SlotheeToken is ERC20Mintable, ERC20Pausable, ERC20Detailed {
  constructor(string memory name, string memory symbol, uint8 decimals) 
     ERC20Detailed(name, symbol, decimals)
     public {}
}
