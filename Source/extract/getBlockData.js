const fs = require('fs');
const {Web3} = require('web3');
const web3 = new Web3('http://localhost:8545');

const getAllBlockData = async () => {
	try {
		const lastBlkNum = await web3.eth.getBlockNumber();
		let csvContent = "Block Number,Difficulty,Gas Limit,Gas Used,BlockHash,BlockSize,Time (hh-mm-ss-ms),Transaction Count\n";
		
		for (let blockNumber = 439; blockNumber <= lastBlkNum; blockNumber++) {
		    const blockData = await web3.eth.getBlock(blockNumber);
		    const { number, difficulty, gasLimit, gasUsed, hash, size, timestamp, transactions } = blockData;
		    let transactionCount = transactions ? transactions.length : 0;

		    // Convert Unix timestamp to Date object
		    let date = new Date(Number(timestamp) * 1000);

		    // Format the date into a human-readable format
		    let formattedTime = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)} `;
		    formattedTime += `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(-2)}`;

		    // Convert BigInt to string
		    let difficultyStr = difficulty.toString();
		    let gasLimitStr = gasLimit.toString();
		    let gasUsedStr = gasUsed ? gasUsed.toString() : '0'; // Handle if gasUsed is null or undefined

		    let row = `${number},${difficultyStr},${gasLimitStr},${gasUsedStr},${hash},${size},${formattedTime},${transactionCount}\n`;
		    csvContent += row;
		}


		fs.writeFileSync('blockchainData.csv', csvContent);
		console.log('Data written to blockchainData.csv');
	} catch (error) {
		console.error(error);
	}
};

getAllBlockData();

