pragma solidity ^0.8.0;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint public rate = 100;

    constructor(Token _token) public {
        token = _token; //we do this in order to get the local value stored into the blockchain
    }
    
    function buyTokens() public payable {
        //Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
    }
}

