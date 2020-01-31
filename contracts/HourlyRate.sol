pragma solidity >=0.4.0 <0.7.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HourlyRate {

	address PNK = "0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d"; // https://etherscan.io/address/0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d
	address DAI = "0x6b175474e89094c44da98b954eedeac495271d0f"; // https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f

	address employer; // Kleros
	address beneficiary; // me

	uint hourlyRateDAI;
	uint hourlyRatePNK;

	constructor(uint _hourlyRateDAI, uint _hourlyRatePNK) public {
		hourlyRateDAI = _hourlyRateDAI;
		hourlyRatePNK = _hourlyRatePNK;
	}

	function approvePNK(uint amount) public {
		PNK.approve(address(this), amount);
	}

	function approvePNK(uint amount) public {
		DAI.approve(address(this), amount);
	}

	// PNK and DAI are owned by the HourlyRate contract
	// in the functions above we enabled PNK and DAI for transfers
	public mintPNKDAI() public {
		PNK.transferFrom(msg.sender)
		DAI.transferFrom(msg.sender)
		PNKDAI.mint(msg.sender) // sender received PNKDAI
	}

	public redeem()  {
		PNKDAI.transferFrom(msg.sender) // and burn it
		PNK.send(msg.sender);
		DAI.send(msg.sender)
	}

}