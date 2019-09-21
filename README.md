# egtAccessDoc

> Egretia token（EGT） 接入方法

### 如何生成地址
EGT 是发布在 Ethereum 网络中的代币合约，使用以太坊地址，nodejs可以使用 Ethereumjs 库实现公私钥以及地址生成，建议将生成的私钥经过对称加密后保存

参考：
https://github.com/Egretia/ethSefSer

### 如何检测充值

可以通过 infura.io 和 etherscan.io 提供的接口实现充值检测
通过 infura.io 提供的区块订阅检测新区块。等待5个区块确认后，才能确定该区块已经到达主链（既每次区块的number减5后获取）
通过 etherscan.io 的交易列表，可以确认用户已充值金额：
检测到区块头之后，解压交易（getBlock 的参数2设置为true，可以直接获取交易的详细数据）
将其中符合 EGT 交易条件的交易进行解析：交易的to字段为EGT合约地址的交易，data字段方法签名为 0xa9059cbb ，代表这是一个 ERC20 的transfer调用 
通过 web3 提供的合约数据解析功能，可以获取具体的转账金额和转账目标地址 
通过ERC20转账目标地址，从 etherscan.io 进行增量式更新，并将记录持久化，可以使用数据库进行记录
当收到余额查询的请求，通过对目标地址为请求地址的条目的金额进行SUM聚合，即可得到改地址历史充值的总数量

参考：
https://github.com/Egretia/ethService

### 提现

由于以太坊转账是需要消耗以太币的，提现建议使用独立大钱包统一操作。
提现通过 ERC20.transfer 方法进行操作
