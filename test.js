const Web3 = require('web3');
const web3 = new Web3('https://speedy-nodes-nyc.moralis.io/eab63686b28a1d9bdec08dc7/bsc/mainnet')

async function main(){
    console.log(await web3.eth.getBlockNumber())
}

main()