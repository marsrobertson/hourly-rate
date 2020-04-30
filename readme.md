### Work ~paused~ resumed

Fixed broken tests!

Hurray, happy, accomplishment :)


### Deploying

How to deploy your own:
* `npm install truffle-flattener`
* `truffle-flattener contracts/dummyERC20.sol > PNKkovan.sol`
* `truffle-flattener contracts/dummyERC20.sol > DAIkovan.sol`
* in constructor parameters define `name`, `symbol`, `decimals`
* verify code on Etherscan, it is always handy for future reference
* `truffle-flattener contracts/HourlyRate.sol > hourly.sol`
* go to https://remix.ethereum.org
* deploy using previously deployed DAI and PNK addresses
* choose your hourly rate...