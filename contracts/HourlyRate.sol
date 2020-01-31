pragma solidity >=0.4.0 <0.7.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract HourlyRate {

	address PNKaddr = "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d"; // https://etherscan.io/address/0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d
	address DAIaddr = "0x6b175474e89094c44da98b954eedeac495271d0f"; // https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f

	ERC20 PNK;
	ERC20 DAI;
	PNKDAI PNKDAIamalgam;

	address employer; // Kleros
	address beneficiary; // me

	uint public hourlyRateDAI;
	uint public hourlyRatePNK;

	constructor(uint _hourlyRateDAI, uint _hourlyRatePNK) public {
		hourlyRateDAI = _hourlyRateDAI;
		hourlyRatePNK = _hourlyRatePNK;

		PNK = ERC20(PNKaddr);
		DAI = ERC20(DAIaddr);
		PNKDAIamalgam = new PNKDAI("PNK DAI amalgam", "PNKDAI", 18);
	}

	function approvePNK(uint amount) public {
		PNK.approve(address(this), amount);
	}

	function approveDAI(uint amount) public {
		DAI.approve(address(this), amount);
	}

	// PNK and DAI are owned by the HourlyRate contract
	// in the functions above we enabled PNK and DAI for transfers
	function mintPNKDAI() public {
		PNK.transferFrom(msg.sender);
		DAI.transferFrom(msg.sender);
		PNKDAI.mint(msg.sender);
	}

	function redeem() public {
		PNKDAI.transferFrom(msg.sender);
		PNK.send(msg.sender);
		DAI.send(msg.sender);
	}

}

contract PNKDAI is ERC20Burnable, ERC20Mintable, ERC20Detailed {
	constructor (string name, string symbol, uint decimals) public ERC20Detailed(name, symbol, decimals) {
        // solhint-disable-previous-line no-empty-blocks
    }
}