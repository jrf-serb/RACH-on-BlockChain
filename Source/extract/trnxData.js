
const fs = require('fs');
const {Web3} = require('web3');
const web3 = new Web3('http://localhost:8545');



const getAllTransactionData = async () => {
    try {
        const lastBlkNum = await web3.eth.getBlockNumber();
        let csvContent = "Block Number,Transaction Hash,Value,GasUsage,Gas Price,Nonce,Transaction Index\n";

        for (let blockNumber = 439 ; blockNumber <= lastBlkNum; blockNumber++) {
            const block = await web3.eth.getBlock(blockNumber, true);
            if (block && block.transactions) {
                for (const tx of block.transactions) {
                    const receipt = await web3.eth.getTransactionReceipt(tx.hash);
                    let gasUsed = receipt ? receipt.gasUsed : '0';
                    let row = `${block.number},${tx.hash},${tx.value},${gasUsed},${tx.gasPrice},${tx.nonce},${tx.transactionIndex}\n`;
                    csvContent += row;
                }
            }
        }

        fs.writeFileSync('transactionData.csv', csvContent);
        console.log('Transaction data written to transactionData.csv');
    } catch (error) {
        console.error(error);
    }
};


getAllTransactionData();

