### 前言

> 以太坊Dapp开发需要具备基本的以太坊基础，比如什么是区块链、以太坊、智能合约、web3、节点、infura等等知识点。

如果希望深入学习的话推荐阅读：https://learnblockchain.cn/2018/01/11/guide/#more

> 注意：为了最好的兼容性，本示例使用 nodejs 编写，请在服务端使用 nodejs 操作以太坊。当然您也可以使用其他的语言编写以太坊代码。

### 如何连接web3

首先注册infura.io或者其他可以连接web3的服务。

注册后，您可以创建第一个项目，然后可以获取项目ID，通过项目ID可以连接web3服务。当然在管理后台也可以查看您的调用接口数据。详细教程请参考：https://infura.io/docs

#### 如何设置项目ID

请打开 index.js，找到第 6 行，修改URL为下方 URL：

> https://mainnet.infura.io/v3/YOUR-PROJECT-ID

注意YOUR-PROJECT-ID即为您获得的项目ID。

### 如何生成地址

请打开 index.js，找到第 12 行方法 testCreateKeypair。

```
function testCreateKeypair() {

    let wallet = EthWallet.generate()

    let keyPair = {
        "priKey": wallet.getPrivateKey().toString('hex') ,
        "address": wallet.getAddress().toString('hex')
    }

    console.log("keypair : ", keyPair) ;
}
```

上述方法即为生成以太坊地址和私钥的方法，玩家的充值地址可以使用此方法生成，转账时使用私钥即可转账。具体业务逻辑请根据游戏业务相应调整。

### 如何检测充值

请打开 index.js，找到第 115 行方法 testQueryERC20Balance。

此方法可以检测当前地址余额，通过我们的实践，最好的方式是游戏中设置一个按钮，点击按钮检测地址余额是否到账，然后进行数据库更新，最终刷新用户余额。

### 如何转账

当用户需要转账的时候，需要使用我们生成地址时生成的私钥和地址，只有有了私钥我们才能够转账。当然我们还需要EGT 的智能合约地址 0x8e1b448ec7adfc7fa35fc2e885678bd323176e34。源码第 5 行的TokenAddr即为EGT智能合约地址。

请打开 index.js， 找到第 27 行方法 testSendTx。

```
    let keypair =  {
        priKey: '', // @todo write your private key here
        address: '' // @todo write your address of from here
    } ; // You can use testCreateKeypair generate the KeyPair
```

修改keypair的私钥和地址即可。

第 33 行 sendToAddr 即为目标地址。


