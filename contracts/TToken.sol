pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TToken is ERC20  {
    constructor() ERC20("T.Token", "$TT") public {
        _mint(msg.sender, 100000000 * 10 ** uint(decimals()));
    }
    function decimals() public view virtual override returns (uint8) {
        return 16;
    }
}