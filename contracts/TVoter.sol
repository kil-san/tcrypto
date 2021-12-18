pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract TVoter is ERC721URIStorage {

    address owner;

    struct Proposal {
        string slug;
        uint votesOption1;
        uint votesOption2;
        bool open;
        bool initialized;
    }

    mapping(string => mapping(address => bool)) voted;
    mapping(string => Proposal) public proposals;

    constructor() ERC721("TToken", "$UT") {
        owner = msg.sender;
    }


    modifier onlyOwner {
        require(msg.sender == owner, "You need to be the Owner.");
        _;
    }

    function isOwner() public view returns(bool) {
        // console.log("Sender %s Owner %s comparison %s", msg.sender, owner, msg.sender == owner);
        return msg.sender == owner;
    }

    function openProposalForVotes(string memory slug) public onlyOwner {
        if(!proposals[slug].initialized){
            proposals[slug] = Proposal(slug, 0, 0, true, true);
        }else{
            proposals[slug].open = true;
        }
    }
    function closeProposalForVotes(string memory slug) public onlyOwner {
        if(proposals[slug].initialized){
            proposals[slug].open = false;
        }
    }
    function getProposal(string memory slug) public view returns (Proposal memory) {
        return proposals[slug];
    }
    function checkIfAddressAlreadyVoted(string memory slug) public view returns (bool) {
        return voted[slug][msg.sender] == true;
    }
    function voteOption1(string memory slug) public {
        require(proposals[slug].open, "Proposal not accepting votes.");
        require(voted[slug][msg.sender] != true, "You already voted");
        proposals[slug].votesOption1 = proposals[slug].votesOption1 + 1;
        voted[slug][msg.sender] = true;
    }
    function voteOption2(string memory slug) public {
        require(proposals[slug].open, "Proposal not accepting votes.");
        require(voted[slug][msg.sender] != true, "You already voted");
        proposals[slug].votesOption2 = proposals[slug].votesOption1 + 1;
        voted[slug][msg.sender] = true;
    }

}