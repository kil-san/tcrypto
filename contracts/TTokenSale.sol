// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TTokenSale is Ownable {

  TToken tokenContract;

  uint256 public tokensPerEth = 100;

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

  constructor(address tokenAddress) {
    tokenContract = TToken(tokenAddress);
  }

  function buyTokens() public payable {
    require(msg.value > 0, "Send ETH to buy some tokens");

    uint256 amountToBuy = msg.value * tokensPerEth;

    uint256 contractBalance = tokenContract.balanceOf(address(this));
    require(contractBalance >= amountToBuy, "Not enough TTokens to buy");

    (bool sent) = tokenContract.transfer(msg.sender, amountToBuy);
    require(sent, "Failed to transfer token to user");

    emit BuyTokens(msg.sender, msg.value, amountToBuy);
  }
}
