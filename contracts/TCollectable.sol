pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import "hardhat/console.sol";

contract TCollectable is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping(uint256 => uint256) public itemSupply;
  mapping(address => uint[]) public itemOwners;
  mapping(uint256 => uint256) public itemLevel;

  constructor() ERC721('TCollectable', 'UC') {
    itemSupply[1] = 3;
    itemSupply[2] = 2;
    itemSupply[3] = 1;
  }

  function buyItem(uint level) public returns (uint256) {
    require(level > 0 && level <= 3);
    require(itemSupply[level] > 0, 'No more items available');
    _tokenIds.increment();

    uint256 newCollectableId = _tokenIds.current();
    _mint(msg.sender, newCollectableId);
    itemSupply[level] = itemSupply[level] - 1;
    itemLevel[newCollectableId] = level;
    itemOwners[msg.sender].push(newCollectableId);
    return newCollectableId;
  }

  function getItemSupply(uint level) public view returns (uint256) {
    require(level > 0 && level <= 3);
    return itemSupply[level];
  }

  function getMyItems() public view returns (uint256[] memory) {
    return itemOwners[msg.sender];
  }

  function getItemLevel(uint256 tokenId) public view returns (uint256) {
    require(tokenId > 0 && tokenId <= _tokenIds.current(), "pass the error message here");
    return itemLevel[tokenId];
  }
}
