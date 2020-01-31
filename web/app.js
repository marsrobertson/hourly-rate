async function init() {

    // same ABI for both PNK and DAI (ERC20 interface, no need for all the "funky" methods)
    ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"amount","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"},{"name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isMinter","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
    addressPNK = "0xec25392e13ea5a3a43bda3279d11ab533e7b12f0";
    addressDAI = "0x311FABaE9000F246cf34Ac47FF3dE76ebAA3609A";

    PNK = new web3.eth.Contract(ABI, addressPNK);
    DAI = new web3.eth.Contract(ABI, addressDAI);

    account = (await web3.eth.getAccounts())[0];
    console.log("Account from Metamask: " + account);

    let balancePNKwei = await PNK.methods.balanceOf(account).call();
    let balancePNK = parseFloat(web3.utils.fromWei(balancePNKwei)).toFixed(3);
    $("#pnk").val(balancePNK);

    let balanceDAIwei = await DAI.methods.balanceOf(account).call();
    let balanceDAI = parseFloat(web3.utils.fromWei(balanceDAIwei)).toFixed(3);
    $("#dai").val(balanceDAI);

}







// validTo = await contract.methods.validTo().call(); 
// $("#validTo").val(new Date(validTo * 1000).toUTCString());

// rate = await contract.methods.rate().call(); 
// $("#rate").val(rate); 
// $("#rateLabel").text(`Current rate 1 ETH = ${rate} ERC:`)
// $("#eth").trigger("input");


// $("#trade").on("submit", async function(event) {
//     let wei = web3.utils.toWei( $("#eth").val() );
//     console.log("ETH: " +  $("#eth").val() + " " + wei);
//     contract.methods.kamikaze().send({value: wei, from: account})
//     event.preventDefault();
//     return false;
// })

// $("#eth").on("input", function() {
//     let float = parseFloat($(this).val());
//     if (isNaN(float) || float < 0) {
//         float = 0; 
//         $(this).addClass("error"); 
//     } else { 
//         $(this).removeClass("error"); 
//     }
//     let pnk = rate * float;
//     console.log(`With ${float} you can get ${pnk.toFixed(2)} PNK`);
//     $("#pnk").val(pnk.toFixed(3));
// })