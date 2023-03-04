//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract is AccessControl {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");

    // State Variables
    address[] public borrowers;

    constructor(address[] memory _owners, address[] memory _borrowers) {
        for (uint256 i = 0; i < _owners.length; ++i) {
            _grantRole(OWNER_ROLE, _owners[i]);
        }
        borrowers = _borrowers;
    }

    function getWhitelistedBorrowers() public view returns (address[] memory) {
        return borrowers;
    }

    function addWhitelistedBorrower(address _borrower) public onlyRole(OWNER_ROLE) {
        borrowers.push(_borrower);
    }

    function addOwner(address[] memory _owners) public onlyRole(OWNER_ROLE) {
        for (uint256 i = 0; i < _owners.length; ++i) {
            _grantRole(OWNER_ROLE, _owners[i]);
        }
    }
}
