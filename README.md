# egtAccessDoc

> Egretia token（EGT） 接入方法               

## Notice    
> This Example is a course for operating ERC20 token                

## install        
> npm install              

## run       
> npm start   

### 如何生成地址
> EGT 是发布在 Ethereum 网络中的代币合约，使用以太坊地址，nodejs可以使用 Ethereumjs 库实现公私钥以及地址生成，建议将生成的私钥经过对称加密后保存            
> 参考代码示例中 testCreateKeypair 函数              

### 如何检测充值
> 检测充值通过 ERC20.balanceOf 方法实现
> 参考代码示例中 testQueryERC20Balance 函数             

### 转账
> 提现通过 ERC20.transfer 方法进行操作                   
> 参考代码示例中 testSendTx 函数             