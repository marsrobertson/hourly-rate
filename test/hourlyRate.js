const { expectThrow, increaseTime, latestTime, toWei, fromWei } = require('./helpers')

const HourlyRate = artifacts.require('HourlyRate')
const ERC20 = artifacts.require('DummyERC20')
const PNKDAIamalgam = artifacts.require('PNKDAIamalgam')

contract('Hourly Rate', async function(accounts) {

    const creator = accounts[0]
    const employer = accounts[1];
    const worker = accounts[2];

    let PNK;
    let DAI;

    beforeEach(async function() {
        PNK = await ERC20.new("PNK for testing", "PNKT", 18, { from: creator } ); 
        DAI = await ERC20.new("DAI for testing", "DAIT", 18, { from: creator } ); 

        await PNK.mint(employer, toWei("200000"), { from: creator })
        await DAI.mint(employer, toWei("1000"), { from: creator })
    })

    it('10k PNK and 50 DAI per hour', async () => {

        let hourlyRate = await HourlyRate.new(PNK.address, toWei("10000"), DAI.address, toWei("50"), { from: creator } );

        await PNK.approve(hourlyRate.address, toWei("200000"), { from: employer });
        await DAI.approve(hourlyRate.address, toWei("10000"), { from: employer });

        await hourlyRate.mintPNKDAI(20, { from: employer });


        let PNKDAIaddress = await hourlyRate.PNKDAIaddress.call();

        console.log("hourlyRate.PNKDAI: \n-----------------")
        console.log(hourlyRate.PNKDAI);
        console.log(hourlyRate.PNKDAI.address);
        console.log(hourlyRate.address);
        console.log(PNKDAIaddress);
        console.log("-----------------")

        let PNKDAI = await PNKDAIamalgam.at(PNKDAIaddress);
        let employerPNKDAI = await PNKDAI.balanceOf(employer);
        assert.equal(employerPNKDAI.toNumber(), 20, "Employer should have 20 tokens of PNKDAI");

        await PNKDAI.transfer(worker, 10, {from: employer});
        await PNKDAI.approve(hourlyRate.address, 10, { from: worker });  
        await hourlyRate.redeemPNKDAI(10, { from: worker });

        assert.equal(await PNK.balanceOf(worker), toWei("100000"), "Worker should have 100k PNK")
        assert.equal(await DAI.balanceOf(worker), toWei("500"), "Worker should have 500 DAI")
        assert.equal(await PNKDAI.balanceOf(worker), 0, "Worker should have 0 PNKDAI")
        assert.equal(await PNKDAI.balanceOf(employer), 10, "Employer should have 10 PNKDAI")

    });

  })