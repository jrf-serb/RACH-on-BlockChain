# RACH-on-BlockChain

## Downloading the Source Code:

To access the source code for the RACH protocol implementation using blockchain, follow these steps:
1.	Clone the Repository:
•	Open a terminal or command prompt on your local machine.
•	Navigate to the directory where you want to store the project.
•	Run the following command to clone the repository:
git clone https://github.com/jrf-serb/RACH-on-BlockChain
2.	Navigate to the Repository:
•	Change your working directory to the newly cloned repository:
cd Source 
3.	Explore the Repository Structure:
•	Includes two codes for simulating two gNodeB, each with subdirectories for simulating clients initiating the RACH protocol. Additionally:
•	app.js file for running the Node.js server.
•	truffle-config.js file for Truffle configuration.
•	contracts directory containing Solidity contracts for deploying on the Ethereum blockchain.
•	Directory for extracting blockchain data.
•	genesis.json file providing a template for the genesis block of the blockchain.

## Setting Up Proof of Concept (POC) with Ganache

Follow these steps to set up a POC using Ganache as the blockchain environment.
1. Install Ganache:
Download and install Ganache from the official documentation: Ganache - Truffle Suite
2. Start Ganache Node:
Start the Ganache Node to simulate the Ethereum blockchain. Set the node to mine transactions instantaneously or at regular intervals (e.g., 1, 2, 5, 10 seconds).
3. Configure Node.js Server:
Configure the Node.js server to point to the HTTP port of Ganache. This ensures that the server interacts with the Ganache blockchain for transaction mining.
4. Deploy Smart Contracts:
Deploy the smart contracts written in Solidity to the Ganache blockchain. The deployment process is explained in the next section (when deploying to Geth).
5. Obtain ABI and Contract Address:
After deploying the smart contracts to Ganache, obtain the ABI (Application Binary Interface) of the deployed contract and its address on the blockchain. Update this information in the Node.js server.
6. Client Requests:
Clients acting as User Equipment (UE) can now request the RACH (Random Access Channel) protocol from the Node.js app. Each transaction initiated by the clients will be mined in the Ganache environment.
This concludes the setup for the POC using Ganache. The next section will guide through deploying the smart contracts in a private Ethereum blockchain environment using Geth.

## Setting up using Geth as EVM

Hardware Configuration for Geth Setup:
For the Geth setup, the hardware configuration is optimized to run on a VMware virtual machine with the following specifications:
•	Operating System: Ubuntu 20.04.3 LTS
•	Memory: 16GB
•	Processor: 11th Gen Intel Core i7-11700K with 16 cores
•	Disk: 80GB

##Single Node Setup:
In the single-node setup, Geth, the Ethereum Virtual Machine, is installed alongside a Node.js server, acting as the gNodeB. This configuration forms a standalone environment where clients, acting as User Equipment (UE), can request the initiation of the Random-Access Channel (RACH) protocol from the server. Upon successful completion, transactions are mined in the Ethereum blockchain, and clients are granted approval for further communication. The process involves configuring the Node.js server, deploying smart contracts to the Geth node, and updating the server with the ABI and contract address for seamless communication between the server and clients.
Initial Setup
Install required software

sudo apt-get install software-properties-common
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/5afbde45-dddc-4ec0-81a6-4aad3854779d)
sudo add-apt-repository -y ppa:ethereum/Ethereum
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/bd9806c0-719d-49b9-bc2d-e55cba44d579)
sudo apt-get update
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/c4f55828-ae0f-4e16-9139-9e7a1c78003a)
Download and install an old version of Geth for PoW mechanism

wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.8.15-89451f7c.tar.gz
tar -xvf geth-linux-amd64-1.8.15-89451f7c.tar.gz
sudo mv geth-linux-amd64-1.8.15-89451f7c/geth /usr/local/bin/
 
geth version

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/4ab12250-bffc-4835-be6a-2db5679190f2)
Genesis.json file Content:
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/7b0cf11c-94ab-4877-94d0-7f9044584b30)
Starting the blockchain
geth --datadir node1 init genesis.json
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/2b4f0c2f-11d1-4c79-9711-705f0ec7920a)
geth --datadir node1 --networkid 986 --port 3001 --nodiscover --rpc --rpcapi "admin,miner,eth,personal,web3,net,debug" --rpcport 8543
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/03c048f3-09f0-4977-900e-1339345018ab)
geth attach node1/geth.ipc
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/99123ba9-5123-4251-9a1d-d996415e7906)
This sequence of commands sets up a private Ethereum blockchain. Using geth.ipc, you can connect to the private network, transfer test ethers between accounts, and mine transactions into blocks.
Deploying Smart Contract on Geth:
Before deploying the smart contract, install Node.js and Truffle:
Install Node.js and Truffle

sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.nvm/nvm.sh
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/759c5d12-128b-461a-bf64-8e17d220e856)
nvm install 18
nvm use 18
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/ff7d2827-235e-49c2-96d2-653ad19f80ee)
npm install truffle
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/65d2faf2-83d8-47d4-a5ac-264fa88c54f5) 

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/021bf49c-5c39-4a0e-b2f5-724b247e8b85) 
These commands install Node.js, set up NVM, and install Truffle for smart contract development. The environment is now ready for deploying and testing smart contracts on the Geth blockchain.

##Simulation Procedure:

Each simulation trial involves the following steps:
1. Blockchain Setup:
In the main folder for the blockchain, execute the following commands:
Console 1:

geth --datadir node1 init genesis.json
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/28cab6ab-da71-46c6-8d3a-73e8a1e425c8)
geth --datadir node1 --networkid 672 --port 30303 --nodiscover --rpc --rpcapi "admin,miner,eth,personal,web3,net,debug" --rpcport 8545
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/1e84a658-371a-4f5e-aae4-649b0687e1fe)

Console 2:

geth attach node1/geth.ipc
Inside the console, execute the following commands:
personal.newAccount()
//provide passphrase; e.g., password
eth.coinbase
personal.unlockAccount(eth.coinbase, password, 0)
miner.start()
//after running the simulation, stop mining
miner.stop()
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/c53cad58-8572-4aa7-8476-ddbf1cde0f92)
2. Deploy Smart Contracts:
From the SmartContracts folder, deploy Smart Contracts to the Geth blockchain.

Console 3:

truffle migrate --network geth
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/9347808c-fee8-4c05-8c38-9511c86bb728)
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/863e8669-3be6-40c2-a1de-34d34cdc60b8)
After deploying the Smart Contracts from Truffle, copy build files containing the Smart Contract ABI to the Node server simulating the RACH protocol. In the app.js file of the Node server, paste the Smart Contract address at the required location.
Execute the below command to get a Smart Contract address using Truffle.
truffle networks
3. Run Node Server and Start Simulation:

Console 4:

npm start
![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/19e32fef-46bb-41d0-8233-5fcc366aac99)
 
Console 5:

node batchAbridged.js
4. Data Extraction:
After running the simulation trials, extract the required information using a specific script.
Upon completion of all trials, the data is extracted in the following format:
•	Client-side File: Contains latency information.
•	Block-related Data File: Includes Block Number, Difficulty, Gas Limit, Block Size, Time (hh-mm-ss-ms), and Transaction Count.
•	Transaction Data File: Provides information such as index, Block Number, Transaction Hash, Value, Gas Usage, Gas Price, Nonce, and Transaction Index.


## Two-Node Setup:
In the two-node setup, Geth is installed on two separate machines, each running as a node in a private Ethereum network. Two distinct Node.js servers are configured, each associated with its unique Geth node. These Geth nodes are interconnected, forming a private Ethereum network. Smart contracts are deployed individually to each Geth node, and the ABI and contract addresses are updated in their respective Node.js servers. Clients can now request RACH initiation from either server, and transactions are mined in their respective Geth nodes.


![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/6001ef29-cee9-4a1e-aca9-ed11def720fb)

Setting Up Two-Nodes Blockchain Using Geth:
Initialize Geth for Node 1:
Initialize Geth for the first node:

geth --datadir gNb1 init genesis.json

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/4fea06d9-a7ab-4fe7-8ad2-13c6d5a4c48f)
 
Run Geth for Node 1:

geth --datadir gNb1 --networkid 672 --port 30303 --nodiscover --rpc --rpcapi "admin,miner,eth,personal,web3,net,debug" --rpcport 8545 

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/a5034198-53e9-4d53-bec5-e24f6632b342)

Attach to the Geth IPC for Node 1:

geth attach gNb1/geth.ipc 
Inside the console, execute the following commands:
personal.newAccount()
eth.coinbase
personal.unlockAccount(eth.coinbase, password, 0)
admin.peers
admin.nodeInfo.enode
admin.addPeer(//enode address of Node 2)
eth.syncing
admin.peers
miner.start()
miner.stop()

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/97779c35-306a-451a-a25f-83e8bc798fb1)
 
Initialize Geth for Node 2:
Initialize Geth for the second node:

geth --datadir gNb2 init genesis.json 
//This is present in screenshot of gNb1
Run Geth for Node 2:
geth --datadir gNb2 --networkid 672 --port 30304 --nodiscover --rpc --rpcapi "admin,miner,eth,personal,web3,net,debug" --rpcport 8546 

 ![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/f93dd82e-081f-4c05-91e7-62102fc4f89c)

Attach to the Geth IPC for Node 2:
geth attach gNb2/geth.ipc 
Inside the console, execute the following commands:
personal.newAccount() 
eth.coinbase 
personal.unlockAccount(eth.coinbase, password, 0) 
admin.peers 
admin.nodeInfo.enode 
admin.addPeer(//enode address of Node 1) 
eth.syncing 
admin.peers 
miner.start() 
miner.stop() 

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/60d33f22-bc12-4f22-9d90-744ff2e53fba)


## Running Multiple Components:
In this setup, there are two Ethereum Virtual Machines (EVM) and two gNodeB/Node.js Servers, with an arbitrary number of clients requesting each server per second.
Terminal 1:
•	Tab1: Geth for Node 1 (EVM)
•	Tab2: Geth for Node 2 (EVM)
•	Tab3: Geth IPC for Node 1
•	Tab4: Geth IPC for Node 2
Terminal 2:
•	Tab1: Node.js Server 1 (gNodeB)
•	Tab2: Node.js Server 2 (gNodeB)
•	Tab3: Clients for Server 1
•	Tab4: Clients for Server 2
Terminal 3:
•	Tab1: Truffle Migrate Smart Contract
•	Tab2: Extract Data
Deploy Smart Contract using Truffle:
truffle migrate --network geth // for Node 1 and Node 2 deploy separately on 2 different EVM and using 2 different smart contract projects as we required unique ABI and contract address
And after deploying the Smart Contracts:
npm start // for Node 1 and Node 2
Follow a similar process for Node 2.
Extracting Data:
Extract data using specific scripts:

![image](https://github.com/jrf-serb/RACH-on-BlockChain/assets/156813307/85ee2796-d292-4f5d-940f-fe549d43bcd5)

## Project Code Summary:

Smart Contract Summary:
Smart Contract Name: DataStorage_gNb1
Core Functionality:
The smart contract DataStorage_gNb1 serves as a data storage contract within the context of a 5G network simulation. It is designed to store information associated with User Equipment (UE) devices, particularly the CRNTI (Cell Radio Network Temporary Identifier).
Data Structure:
The contract employs a mapping named dataStore to associate UE IDs with their respective Data structures. Each UE ID serves as the key, and the associated value is an instance of the Data struct.
Functions:
storeData(uint _ue_id, string memory _crnti) public:
•	Input Parameters:_ue_id: An integer representing the UE ID. _crnti: A string representing the CRNTI associated with the UE.
•	Functionality: Stores the CRNTI information for a specific UE ID in the dataStore mapping. Updates or creates a new Data struct for the provided UE ID, setting its crnti field with the provided value.
Key Points: The contract is intended to be a part of a larger system where multiple UEs interact with the gNodeB (gNodeB1 in this context). The contract is written in Solidity version 0.8.19.
Use Case:
This smart contract is part of a broader system that simulates interactions within a 5G network. By storing CRNTI information associated with UEs, it provides a foundational component for managing and tracking UE-specific data within the network. The storeData function enables the updating or initialization of CRNTI information, allowing for dynamic management of UE-related data.
Node.js Code Summary:
The provided Node.js code serves as the backend for a simulation of a 5G network, focusing on the gNodeB (base station) functionality. Here's a brief overview of the key elements:
1. Dependencies and Initialization:
•	Express and Body-Parser: Utilizes Express for handling HTTP requests and responses. Body-Parser middleware is used to parse incoming JSON payloads.
•	Web3 (Web3.js for Ethereum): Initializes a Web3 instance connected to a GETH (Go Ethereum) provider running on http://127.0.0.1:8545. Loads the ABI (Application Binary Interface) and contract address for the deployed smart contract.
2. Storage and Configuration: ueIdentityStorage: An object to store UE identities along with their status during the simulation. tempCRNTIMap: A map storing temporary C-RNTIs for UE identification during the simulation.
3. Endpoint Definitions:
•	/api/ and /: Informative endpoints providing messages about RACH simulation APIs.
•	/msg1 (Random Access Preamble): Handles requests related to the initial stage of the Random Access procedure. Simulates C-RNTI assignment and returns a temporary CRNTI along with a timing advance.
•	/msg3 (Contention Resolution): Manages requests related to the contention resolution phase. Resolves contention, establishes connection, and stores data in the smart contract. Uses the storeDataEVM function to interact with the Ethereum Virtual Machine (EVM).
4. storeDataEVM Function:
•	Parameters: ueId: UE identity. crnti: CRNTI associated with the UE.
•	Functionality: Retrieves Ethereum accounts and sets the sender. Sends a transaction to the smart contract, storing UE data in the blockchain. Handles gas pricing and provides error handling.
5. Simulation Setup: Sets up periodic clearing of tempCRNTIMap entries every 500 milliseconds.
6. Server Initialization:Listens on port 5001/2 for incoming connections.
7. Error Handling: Provides detailed error responses for various scenarios.


Validation and Verification in API Endpoints /msg1 and /msg3:
1. /msg1 (Random Access Preamble):
•	Input Validation: Ensures that the incoming request contains the required parameters (PreambleIndex and RcvSubFrame). Checks if the values of PreambleIndex and RcvSubFrame fall within valid ranges (0 to 63 and 0 to 9, respectively).
•	CRNTI Assignment: Simulates the assignment of a temporary C-RNTI. Generates a random C-RNTI and associates it with the provided PreambleIndex and RcvSubFrame.
•	Response Handling:Sends a JSON response containing the assigned temporary CRNTI and a simulated timing advance.
•	Error Handling: Responds with a 400-status code and an error message for invalid parameters or if the PreambleIndex is already in use.
2. /msg3 (Contention Resolution):
•	Input Validation: Ensures the presence of required parameters (temporaryCRNTI, ue_Identity, establishmentCause, spare) in the incoming request.
•	Temporary C-RNTI Check: Verifies if the provided temporaryCRNTI exists in the tempCRNTIMap.
•	Smart Contract Interaction: Calls the storeDataEVM function to store data in the Ethereum blockchain. Handles Ethereum account retrieval, gas pricing, and transaction submission.
•	UE Identity Storage: Stores UE identity along with the status if the contention is resolved successfully.
•	Response Handling: Sends a success response if contention is resolved, containing information about the established connection and stored data in the smart contract.
•	Error Handling: Responds with a 400 status code and an error message if the provided temporaryCRNTI is not found or if an error occurs during data storage in the blockchain.
3. Error Logging: In both endpoints, detailed error messages are logged using console.error to facilitate debugging.
4. Simulation Logic: The simulation logic ensures that the operations performed at each stage of the Random-Access procedure and contention resolution are consistent with the expected behaviour in a 5G network environment.

Summary of Client Simulation Code:
Overview:
The provided JavaScript code simulates the behaviour of multiple clients interacting with a gNodeB server through two API endpoints: /msg1 (Random Access Preamble) and /msg3 (Contention Resolution). The clients generate random parameters, initiate transactions, and record end-to-end latency.
Key Elements:
1.	simulateClient(index) Function: Generates random values for preambleIndex, rcvSubFrame, and imei (10-digit number). Sends asynchronous POST requests to /msg1 and /msg3 endpoints using Axios. Measures the end-to-end latency of the transactions. Logs transaction details, including client index, start time, end time, and latency, in CSV format.
2.	sendRequestsConcurrently(numClients, numConcurrent, interval) Function: Creates an array of client functions (simulateClient) based on the specified number of clients. Divides the clients into batches and sends requests concurrently within each batch. Implements a configurable interval between batches. Logs the completion of each batch, including the number of successful and erroneous transactions.
3.	main() Function: Configures the total number of clients, number of concurrent clients per batch, and the interval between batches. Initializes a CSV log file with a header. Invokes the sendRequestsConcurrently function.
Execution Flow:
1.	The main() function sets up parameters and initializes the CSV log file.
2.	The sendRequestsConcurrently function orchestrates the concurrent execution of client simulations in batches.
3.	Each client, represented by the simulateClient function, sends requests to the server, records latency, and logs transaction details.
4.	The code handles errors and logs the number of successful and erroneous transactions.
Notes:
•	The simulation is designed to mimic the behavior of clients in a 5G network, testing the gNodeB server's response to Random Access Preambles and Contention Resolution.
•	The CSV log file (latencyforclients.csv) stores detailed information about each transaction for further analysis.
Simulation Results:
•	The code provides insights into the success and failure of transactions, allowing for the assessment of the gNodeB server's performance under various conditions.

## Data Collection 
The data collection process occurs in stages, and each stage corresponds to a specific setup. In each trial, the number of clients making requests to the server varies, ranging from 10 to 80 per second. For the purpose of analysis, a group of clients requesting in a given period is considered one slot. A total of 150 slots are under consideration for each trial.

Client-Side Information
After each trial, client-side information is collected, detailing the total time it took to complete the Random-Access Channel (RACH) protocol for each client. This information provides insights into the efficiency of the protocol execution from the perspective of the clients.

EVM-Side Data Collection
Additionally, a script is implemented to collect data from the Ethereum Virtual Machine (EVM) side. This script focuses on extracting information related to blocks and transactions. By analysing this data, one can gain valuable insights into the performance and behaviour of the Ethereum blockchain during the execution of the RACH protocol.
