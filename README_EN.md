# egtAccessDoc

> How to access Egretia token (EGT)?          

## Notice    
> This Example is a course for operating ERC20 token                

## install        
> npm install              

## run       
> npm start   

### How to generate an address?
EGT is a token contract published on the Ethereum network. Using the Ethereum address, nodejs can use the Ethereumjs library to implement public& private keys and generate new address. It is recommended that the generated private key be symmetrically encrypted and saved.

Reference: https://github.com/Egretia/ethSefSer

### How to detect a deposit?

Deposit can be detected via the interfaces provided by infura.io and etherscan.io

1. Detect new blocks with block subscriptions provided by infura.io. After waiting for confirmation of 5 blocks, it can be determined that the block has reached the main chain (That is, when the number of each block is reduced by 5)
2. Through the transaction list of etherscan.io, you can confirm the user's deposit amount:
 
  * After detecting the block header, you can decompress the transaction (parameter 2 of getBlock is set to “True”, then you can directly get the detailed data of the transaction)
  * Parse the transaction in which the EGT transaction condition is met: the “To” field of the transaction is the transaction of the EGT contract address, and the data field method signature is 0xa9059cbb, which represents an ERC20 transfer call.
  * Through the contract data parsing function provided by web3, you can get the specific transfer amount and transfer destination address.
  * Transfer destinations via ERC20, will be updated incrementally within etherscan.io, and its record will be saved continuously through the database.
  * When receiving a request for a balance inquiry, the total deposit will be calculated by adding up the history amounts of this destination address.

Reference: https://github.com/Egretia/ethService


### Withdrawal

Since the Ethereum transfer requires the consumption of Ethereum, the withdrawal is recommended to use a separate large wallet for a more uniform operation. Cash withdrawal can make use of the ERC20.transfer method.
