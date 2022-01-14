const Web3 = require('web3');
const web3 = new Web3('http://3.1.103.217:8545')

async function main(){
    console.log(await web3.eth.getBlockNumber())
}

main()