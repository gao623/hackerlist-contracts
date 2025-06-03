// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

interface IHackerlist {
    function isHackAccount(bytes memory account) external view returns (bool isHacker);
    function issuer(bytes memory account) external view returns (uint8 issuerCode);
}

contract HackerlistCaller is Initializable
{
    address public hackerlistAddr;


    event UserLock(bytes32 indexed smgID, uint indexed tokenPairID, uint value, bytes userAccount);
    event UserLockPure(bytes32 indexed smgID, uint indexed tokenPairID, uint value, bytes userAccount);


    modifier onlyNonHacker(bytes memory account) {
        bool isHackAccount = IHackerlist(hackerlistAddr).isHackAccount(account);

        require(!isHackAccount, "hacker caller");
        _;
    }


    function initialize(address _hackerlistAddr) public initializer {
        hackerlistAddr = _hackerlistAddr;
    }

    function addressToBytes(address addr) public pure returns (bytes memory) {
        return abi.encode(addr);
    }

    function userLock(bytes32 smgID, uint tokenPairID, uint value, bytes calldata userAccount)
        external
        payable
        onlyNonHacker(addressToBytes(tx.origin))
        onlyNonHacker(addressToBytes(msg.sender))
        onlyNonHacker(userAccount)
    {
        emit UserLock(smgID, tokenPairID, value, userAccount);
    }

    function userLockPure(bytes32 smgID, uint tokenPairID, uint value, bytes calldata userAccount)
        external
        payable
    {
        emit UserLockPure(smgID, tokenPairID, value, userAccount);
    }

}
