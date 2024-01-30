const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//for web3
// Initialize Web3 with  GETH provider
let { Web3 } = require("web3");

const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8546");//port specified during start of geth node. this can vary
const web3 = new Web3(provider);

// Load the deployed contract ABI and address
const contractABI = require('./build/contracts/DataStorage_gNb2.json').abi;
const contractAddress = '0x67019E07974369202c039398f7dFF249d395e1f0';
console.log("Contract Address is : "+contractAddress); // current deployed contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);
// Define a storage object to hold UE identities
const ueIdentityStorage = {};

// async function storeDataEVM(ueId, crnti) {
//     const accounts = await web3.eth.getAccounts();
//     const sender = accounts[0];

//     try {
//         const result = await contract.methods.storeData(ueId, crnti).send({ from: sender });
//         // console.log('Transaction hash:', result.transactionHash);
//     } catch (error) {
//         console.error('Error:', error);
//         console.error('error from storeDataEVM - due to incorrect nonce ');
//         throw error;        
//     }
// }


async function storeDataEVM(ueId, crnti) {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    try {
        // const nonce = await web3.eth.getTransactionCount(sender, 'pending');
        // const gasEstimate = await contract.methods.storeData(ueId, crnti).estimateGas({ from: sender });
        const gasPrice = await web3.eth.getGasPrice();
        const result = await contract.methods.storeData(ueId, crnti).send({
            from: sender,
            gas: 200000,
            gasPrice: gasPrice,
            // nonce: nonce
        });

        // console.log('Transaction hash:', result.transactionHash);
    } catch (error) {
        console.error('\nError: occuring from DApp to EVM interaction. . . . ');
        console.error('Error:', error);
        throw error;
    }
}

// start route
app.get('/api/', (req, res) => {
    res.json({ message: 'RACH sim api\'s' });
  });
  
  //home
  app.get('/', (req, res) => {
      res.json({ message: 'Start at /api end points' });
    });

    
const tempCRNTIMap = {}; // Store Temporary C-RNTIs for UE identification

function clearTempCRNTIMap() {
    // console.log('Clearing tempCRNTIMap');
    for (const tempCRNTI in tempCRNTIMap) {
        if (tempCRNTIMap.hasOwnProperty(tempCRNTI)) {
            //clear mapped data
            delete tempCRNTIMap[tempCRNTI];
        }
    }
}

// Clear tempCRNTIMap every x _ milliseconds
setInterval(clearTempCRNTIMap, 500);


app.post('/msg1', (req, res) => {
    const preambleIndex = req.body.PreambleIndex;
    const rcvSubFrame = req.body.RcvSubFrame;

    // Check if preambleIndex is present in tempCRNTIMap    
    for (const tempCRNTI in tempCRNTIMap) {
        if (tempCRNTIMap.hasOwnProperty(tempCRNTI)) {
            if (tempCRNTIMap[tempCRNTI].preambleIndex === preambleIndex) {
                // PreambleIndex already present, send error
                return res.status(400).json({
                    status: 'Error',
                    message: 'PreambleIndex already in use',
                });
            }
        }
    }


    if (preambleIndex >= 0 && preambleIndex <= 63 && rcvSubFrame >= 0 && rcvSubFrame <= 9) {
        const tempCRNTI = Math.floor(Math.random() * Math.pow(10, 3)); // Simulating C-RNTI assignment

        tempCRNTIMap[tempCRNTI] = {
            preambleIndex: preambleIndex,
            rcvSubFrame: rcvSubFrame
        };

        // Log the request under "Random Access Preamble"
        // console.log('Random Access Preamble Request:', {
        //     preambleIndex: preambleIndex,
        //     rcvSubFrame: rcvSubFrame
        // });

        const response = {
            temporaryCRNTI: tempCRNTI,
            timingAdvance: Math.floor(Math.random() * 10) // Simulating timing advance
        };

        // console.log('Random Access Response:', response);

        res.json(response);
    } else {
        const errorResponse = {
            status: 'Error',
            message: 'Invalid parameters'
        };
        res.status(400).json(errorResponse);
    }
});


app.post('/msg3', async(req, res) => {
    const tempCRNTI = req.body.temporaryCRNTI;

    if (tempCRNTIMap[tempCRNTI]) {
        const ue_Identity = req.body.ue_Identity;
        const establishmentCause = req.body.establishmentCause;
        const spare = req.body.spare;

        // console.log('Scheduled Transmission Request:', {
        //     temporaryCRNTI: tempCRNTI,
        //     ue_Identity: ue_Identity,
        //     establishmentCause: establishmentCause,
        //     spare: spare
        // });

        const msg4Response = {
            status: 'Success',
            message: 'Contention resolved, connection established',
            crnti: {
                "rrcConnectionnSetup-r8": {
                    "radioResourceConfigDedicated": {
                        "srb-ToAddModList": "srb-ToAddModList",
                        "drb-ToAddModList": "drb-ToAddModList",
                        "drb-ToReleaseList": "drb-ToReleaseList"
                    },
                    "mac-MainConfig": 123245,
                    "sps-Config": 123,
                    "physicalConfigDedicated": true
                },
                "nonCriticalExtension": false
            }
        };
        // console.log('Contention Resolution Response:', msg4Response);

        // Store the ue_Identity along with the status "Success"
        ueIdentityStorage[tempCRNTI] = {
            ue_Identity: ue_Identity,
            status_msg3: 'Success'
        };

        //  store data in the smart contract
        try {
            await storeDataEVM(ue_Identity, establishmentCause);
            res.json(msg4Response);
        } catch (error) {
            //  debugging : If an error occurs during interaction/storing with EVM
            // console.error('Error storing data in EVM:cought inside /msg3');

            const errorMsg4Response = {
                status: 'Error',
                message: 'An error occurred while storing data in the blockchain'
            };
            res.status(500).json(errorMsg4Response);
        }
    } else {
        const msg4Response = {
            status: 'Error',
            message: 'Temporary C-RNTI not found'
        };
        res.status(400).json(msg4Response);
    }
});

const port = 5002;
app.listen(port, () => {
    console.log(`gNodeB server is listening on port ${port}`);
});
