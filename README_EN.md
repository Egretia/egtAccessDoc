### Foreword

> Ethereum Dapp development requires a basic Ethereum foundation, such as blockchain, Ethereum, smart contracts, web3, nodes, infura, etc.

If you want to study in depth, it is recommended to read: https://learnblockchain.cn/2018/01/11/guide/#more

> Note: For best compatibility, this example is written in nodejs, use nodejs to operate Ethereum on the server side. Of course, you can also write Ethereum code in other languages.

### How to connect to web3

First register infura.io or other services that can connect to web3.

After registering, you can create the first project, then you can get the project ID, and you can connect to the web3 service through the project ID. Of course, you can also view your call interface data in the management background. For detailed tutorials please refer to: https://infura.io/docs

#### How to set the project ID

Please open index.js, find line 6, and change the URL to the following URL:

> https://mainnet.infura.io/v3/YOUR-PROJECT-ID

Note that the YOUR-PROJECT-ID is the project ID you get.

### How to generate an address

Please open index.js and find the 12th line method testCreateKeypair.

```
Function testCreateKeypair() {

    Let wallet = EthWallet.generate()

    Let keyPair = {
        "priKey": wallet.getPrivateKey().toString('hex') ,
        "address": wallet.getAddress().toString('hex')
    }

    Console.log("keypair : ", keyPair) ;
}
```

The above method is the method of generating the Ethereum address and the private key. The player's recharge address can be generated by this method, and the transfer can be carried out using the private key. The specific business logic should be adjusted according to the game business.

### How to detect recharge

Please open index.js and find line 115 method testQueryERC20Balance.

This method can detect the current address balance. Through our practice, the best way is to set a button in the game, click the button to check whether the address balance is received, and then update the database, and finally refresh the user balance.

### How to transfer money

When the user needs to transfer money, they need to use the private key and address generated when we generated the address. Only with the private key can we transfer the money. Of course, we also need EGT's smart contract address 0x8e1b448ec7adfc7fa35fc2e885678bd323176e34. The TokenAddr in line 5 of the source code is the EGT smart contract address.

Please open index.js and find line 27 method testSendTx.

```
    Let keypair = {
        priKey: '', @todo write your private key here
        Address: '' // @todo write your address of from here
    } ; // You can use testCreateKeypair generate the KeyPair
```

Modify the private key and address of the keypair.

Line 33 sendToAddr is the destination address.
