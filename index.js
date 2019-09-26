const Web3 = require('web3');
const EthWallet = require("ethereumjs-wallet"); // https://github.com/ethereumjs
const EthereumTx = require('ethereumjs-tx');
const ERC20 = require("./erc20abi");
const TokenAddr = "0xbdb3e0f8633b40d0c5c130862a2739f6da06e46a"; // A ERC20 contract in Ropsten-TestNet that just for your testing.
const NodeUrl = ""; // @todo write the HOST of Ethereum-Node 

/**
 * Create a KeyPair that include a private key and an address.
 * You can use the KeyPair to sign transaction.
 */
function testCreateKeypair() {

    let wallet = EthWallet.generate()

    let keyPair = {
        "priKey": wallet.getPrivateKey().toString('hex') ,
        "address": wallet.getAddress().toString('hex')
    }

    console.log("keypair : ", keyPair) ;
}

/**
 * Execute ERC20 transfer
 */
async function testSendTx(){
    let keypair =  {
        priKey: '3687c627430339623be19447dd545556aeea8b6c6fa5fbd9d5f8534316e4a09b', // @todo write your private key here
        address: '0x53a6dd5641cbe2201949d5bb8d0babbab69c0da4' // @todo write your address of from here
    } ; // You can use testCreateKeypair generate the KeyPair

    let sendToAddr = "0x30056a9d28f768aA0363604660301481B30e5f34";

    let web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(NodeUrl)); // Use the base HttpProvider is quite simple

    var calcContract = web3.eth.contract(ERC20.abi); // Determine the ABI of the contract, so WEB3 know that how to generate the Code of the Method
    var contractInstance = calcContract.at(TokenAddr);
    let tokenVal = web3.toWei(10, "ether") ;
    var txData = contractInstance.transfer.getData(sendToAddr, tokenVal); // Call the method 'transfer' to send a ERC20 transaction.
    // the function 'getData' means that I don't want to execute the 'transfer' immediately but I just want to get the content of the invoking
    // the TxData will be committed with a Transaction later.

    console.log("the tx data is ",txData) // '0x25434534534'

    var gasLimit = 60000 ;
    var gasPrice = 0 ;

    try{
        gasPrice = parseFloat(web3.eth.gasPrice)*1.8;
    }catch(e){
        console.log("get gas price failed");
        return false;
    }

    let txCount = web3.eth.getTransactionCount(keypair.address) ;
    var txParams = {
        nonce: txCount , // We recommand that let NODE to determine the NONCE of TX.
        from: keypair.address,
        to: TokenAddr,
        value: "0x0",
        gas: web3.toHex(gasLimit),
        gasPrice: web3.toHex(gasPrice),
        data: txData
    }; // This is a Transaction. The Data is the content of the invoking of ERC20.transfer, so it will send some Token to the "sendToAddr"

    const privateKey = Buffer.from(
        keypair.priKey,
        'hex',
    ) // Transform the format of private-key from HEX to a Nodejs.Buffer . 

    const tx = new EthereumTx(txParams) ; // Create a Transaction object.
    tx.sign(privateKey) // Sign the Transaction, the content of the Sign will be attached to the TX in this function
    let serializedTx = tx.serialize()
    let txstr = serializedTx.toString("hex")
    if (txstr.substr(0,2)!='0x'){
        txstr = '0x'+txstr ;
    }

    console.log("the TX is ", txstr) // '0x25434534534'

    let txhash = await (async ()=>{
        return new Promise(function (resole, reject) {
            
            web3.eth.sendRawTransaction(txstr, function(err, hash) {
                if (!err){
                    console.log(hash); // 
                    resole(hash);
                }else{
                    console.error(err) ;
                    resole(false);
                }
            }); // Commit the TX to a Ethereum-NODE, and return the Hash of the TX
        }) ;
    })() ;

    return txhash;
}

function testQueryTx(txHash){
    let web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(NodeUrl));
    web3.eth.getTransaction(txHash, function(err, result) {
        if (!err){
            console.log(result); // 

        }else{
            console.error(err) ;

        }
    });
}

async function testQueryERC20Balance(address){
    let web3 = new Web3();
    web3.setProvider(new Web3.providers.HttpProvider(NodeUrl)); // Use the base HttpProvider is quite simple

    var calcContract = web3.eth.contract(ERC20.abi); // Determine the ABI of the contract, so WEB3 know that how to generate the Code of the Method
    var contractInstance = calcContract.at(TokenAddr);


    let balance = await (async ()=>{
        return new Promise(function (resole, reject) {
            
            contractInstance.balanceOf.call(address,
                function (err, value) {
                    if (err) {
                        console.error('Get ERC20 token error: ' + err.message);
                        return resole(false);
                    } else {
                        let token_value = web3.fromWei(value.toNumber(), "ether");
                        console.log(token_value);
                        return resole(token_value);
                    }
                }
            )
        }) ;
    })() ;

    return balance;
}

testCreateKeypair();
// testSendTx();
// testQueryTx("0xfb4e7b6e8e73939d590dcff64146aaf7997e841471ccd048ba22ef560202aa5c");
// testQueryERC20Balance("0x30056a9d28f768aA0363604660301481B30e5f34");