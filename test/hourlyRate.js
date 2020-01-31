const { expectThrow, increaseTime, latestTime, toWei, fromWei } = require('./helpers')

const HourlyRate = artifacts.require('HourlyRate')
const ERC20 = artifacts.require('DummyERC20')
const PNKDAIamalgam = artifacts.require('PNKDAIamalgam')

contract('Hourly Rate', async function(accounts) {

    const creator = accounts[0]
    const employer = accounts[1];
    const guy2 = accounts[2];
    const guy3 = accounts[3];

    let PNK;
    let DAI;

    beforeEach(async function() {
        PNK = await ERC20.new("PNK for testing", "PNKT", 18, { from: creator } ); 
        DAI = await ERC20.new("DAI for testing", "DAIT", 18, { from: creator } ); 

        await PNK.mint(employer, toWei("1000000"), { from: creator })
        await DAI.mint(employer, toWei("1000"), { from: creator })
    })

    it('10k PNK and 50 DAI per hour', async () => {

        let hourlyRate = await HourlyRate.new(PNK.address, toWei("10000"), DAI.address, toWei("50"), { from: creator } );

        hourlyRate.approvePNK(200000, { from: employer });
        hourlyRate.approveDAI(10000, { from: employer });
        hourlyRate.mintPNKDAI(20);

        console.log(hourlyRate.PNKDAI);

        console.log("-----------------")

        let PNKDAI = new PNKDAIamalgam(hourlyRate.PNKDAI)


        let employerPNKDAI = await PNKDAI.balanceOf(employer);

        console.log(employerPNKDAI);
        
        // assert.equal(employerPNKDAI, toWei("20"), "Employer shouold have 20 tokens of PNKDAI");


    });

  })