// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

library StructLib {
    struct SetHacker {
        bytes account;
        bool isHacked;
        uint8 issuerCode;
    }

    struct SetValue {
        string key;
        bytes value;
    }
}
contract Hackerlist is
    Initializable, AccessControl
{
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR");

    // accountHash => isHackAccount
    mapping(bytes => bool) public isHackAccount;
    // issuerCode: 0 - OFAC, 1 - other
    mapping(bytes => uint8) public issuer; // 0: ofac

    // key => value
    mapping(string => bytes) public values;

    event SetHacker(bytes indexed accountHash, bool indexed isHackAccount, uint8 issuerCode, bytes account);
    event SetValue(string indexed keyHash, string key, bytes value);

    modifier onlyAdminOrOperator() {
        require(hasRole(OPERATOR_ROLE, msg.sender) || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "not admin or operator");
        _;
    }

    function initialize(address _admin, address _operator) public initializer {
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        _grantRole(OPERATOR_ROLE, _operator);
    }

    function setHacker(bytes calldata _account, bool _isHacked, uint8 _issuerCode) external onlyAdminOrOperator {
        isHackAccount[_account] = _isHacked;
        issuer[_account] = _issuerCode;
        emit SetHacker(_account, _isHacked, _issuerCode, _account);
    }

    function setHackers(StructLib.SetHacker[] calldata params) external onlyAdminOrOperator {
        for (uint256 i = 0; i < params.length; i++) {
            isHackAccount[params[i].account] = params[i].isHacked;
            issuer[params[i].account] = params[i].issuerCode;
            emit SetHacker(params[i].account, params[i].isHacked, params[i].issuerCode, params[i].account);
        }
    }

    function setValues(StructLib.SetValue[] calldata params) external onlyAdminOrOperator {
        for (uint256 i = 0; i < params.length; i++) {
            values[params[i].key] = params[i].value;
            emit SetValue(params[i].key, params[i].key, params[i].value);
        }
    }

}
