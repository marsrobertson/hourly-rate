pragma solidity >=0.4.0 <0.7.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";


contract HourlyRate {

	using SafeMath for uint256;

	// Not hardcoding these parameters as we need to allow testing
	// MAINNET
	// address PNKaddr = 0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d; // https://etherscan.io/address/0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d
	// address DAIaddr = 0x6b175474e89094c44da98b954eedeac495271d0f; // https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f
	// KOVAN
	// address PNKaddr = 0xec25392E13eA5a3a43BDA3279D11ab533e7B12f0; // https://etherscan.io/address/0x93ed3fbe21207ec2e8f2d3c3de6e058cb73bc04d
	// address DAIaddr = 0x311FABaE9000F246cf34Ac47FF3dE76ebAA3609A; // https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f

	address PNKaddr;
	address DAIaddr;
	ERC20 public PNK;
	ERC20 public DAI;
	PNKDAIamalgam public PNKDAI;
	address public PNKDAIaddress; // FIXME: I have some issues accesssing this variable in tests (explicitly exposing it)

	uint public hourlyRateDAI;
	uint public hourlyRatePNK;

	constructor(address _PNKaddr, uint _hourlyRatePNK, address _DAIaddr, uint _hourlyRateDAI) public {
        PNKaddr = _PNKaddr;
		DAIaddr = _DAIaddr;

		hourlyRatePNK = _hourlyRatePNK;
		hourlyRateDAI = _hourlyRateDAI;

		PNK = ERC20(PNKaddr);
		DAI = ERC20(DAIaddr);
		PNKDAI = new PNKDAIamalgam("PNK DAI amalgam", "PNKDAI", 0);
		PNKDAIaddress = address(PNKDAI);
	}

	// function approvePNK(uint amount) public {
	// 	PNK.approve(address(this), amount);
	// }

	// function approveDAI(uint amount) public {
	// 	DAI.approve(address(this), amount);
	// }

	// function approvePNKDAI(uint amount) public {
	// 	PNKDAI.approve(address(this), amount);
	// }

	// PNK and DAI are owned by the HourlyRate contract
	// in the functions above we enabled PNK and DAI for transfers
	function mintPNKDAI(uint hoursNumber) public {
		PNK.transferFrom(msg.sender, address(this), hoursNumber.mul(hourlyRatePNK));
		DAI.transferFrom(msg.sender, address(this), hoursNumber.mul(hourlyRateDAI));
		PNKDAI.mint(msg.sender, hoursNumber);
	}

	function redeemPNKDAI(uint hoursNumber) public {
		PNKDAI.burnFrom(msg.sender, hoursNumber);
		PNK.transfer(msg.sender, hoursNumber.mul(hourlyRatePNK));
		DAI.transfer(msg.sender, hoursNumber.mul(hourlyRateDAI));
	}

}

contract PNKDAIamalgam is ERC20Burnable, ERC20Mintable, ERC20Detailed {
	constructor (string memory name, string memory symbol, uint8 decimals) public ERC20Detailed(name, symbol, decimals) {
        // solhint-disable-previous-line no-empty-blocks
    }
}