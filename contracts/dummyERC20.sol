pragma solidity >=0.4.0 <0.7.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

contract PNKkovan is ERC20Burnable, ERC20Mintable, ERC20Detailed {
	constructor (string name, string symbol, uint decimals) public ERC20Detailed(name, symbol, decimals) {
        // solhint-disable-previous-line no-empty-blocks
    }
}