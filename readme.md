### WORK ~IN PROGRESS~ PAUSED

Have some troubles instantiating the contracts in tests.

Something silly nitty gritty technical.

In fact, human solutions to technical problems are the best because do not require coding.

Spent a few exciting hours working on the code but unlikely I'll use it at the moment.


----


Already deployed dummy ERC20:
* DAI Kovan: https://kovan.etherscan.io/address/0x311fabae9000f246cf34ac47ff3de76ebaa3609a#readContract
* PNK Kovan: https://kovan.etherscan.io/address/0xec25392e13ea5a3a43bda3279d11ab533e7b12f0#readContract

How to deploy your own:
* `npm install truffle-flattener`
* `truffle-flattener contracts/dummyERC20.sol > PNKkovan.sol`
* `truffle-flattener contracts/dummyERC20.sol > DAIkovan.sol`
* in constructor parameters define `name`, `symbol`, `decimals`

### Deploying hourly rate

* `truffle-flattener contracts/HourlyRate.sol > hourly.sol`
* go to https://remix.ethereum.org
* configure DAI and PNK addresses
