pragma solidity ^0.5.0;

/* Defining token attributes */
import "/home/beach/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
/* Defining all ERC20 functions */
import "/home/beach/node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract FluxToken is ERC20Detailed, ERC20 {
  constructor(string memory name, string memory symbol, uint8 decimals) 
     ERC20Detailed(name, symbol, decimals)
     public {}
}
