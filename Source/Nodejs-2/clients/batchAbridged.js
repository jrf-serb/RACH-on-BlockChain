const axios = require('axios');
const fs = require('fs');

let errorThrown = 0; // Global variable to track errors

async function simulateClient(index) {

    const startTime = Date.now(); // Record the start time

    const preambleIndex = Math.floor(Math.random() * 64); // Random int between 0 and 63
    const rcvSubFrame = Math.floor(Math.random() * 10);   // Random int between 0 and 9
    const imei = Math.floor(Math.random() * 10000000000); // Random 10-digit number


    try {
        // console.log(`Client ${index + 1}: Starting`);
        const msg1Request = {
            PreambleIndex: preambleIndex,
            RcvSubFrame: rcvSubFrame,
            PreambleCounter: 1,
            Reserve: "00000"
        };

        const msg1Response = await axios.post('http://localhost:5002/msg1', msg1Request);
        const temporaryCRNTI = msg1Response.data.temporaryCRNTI;

        const msg3Request = {
            temporaryCRNTI: temporaryCRNTI,
            ue_Identity: imei,
            establishmentCause: 'uplink synchronization',
            spare: '0000'
        };

        const msg3Response = await axios.post('http://localhost:5002/msg3', msg3Request);

        // Calculate end-to-end latency
        const endTime = Date.now();
        const latencyMillis = endTime - startTime;
        // Log transaction details in CSV format
        const startTimeISO = new Date(startTime).toISOString().split('T')[1];
        const endTimeISO = new Date(endTime).toISOString().split('T')[1];

        const logInfo = `${index + 1},${startTimeISO},${endTimeISO},${latencyMillis}`;
        // console.log(logInfo);
        fs.appendFileSync(logFileName, logInfo + '\n');

        // console.log(`Client ${index + 1}: with preamble ${preambleIndex} /msg3 response received - Success`);
    } catch (error) {
        errorThrown++;
        // console.log(`Client ${index + 1}: with preamble ${preambleIndex} /msg3 response received - Error - ${error.message}`);
    }
}



async function sendRequestsConcurrently(numClients, numConcurrent, interval) {
    const clients = [];
    for (let index = 0; index < numClients; index++) {
        clients.push(() => simulateClient(index));
    }

    const batches = Math.ceil(numClients / numConcurrent);

    for (let batch = 1; batch <= batches; batch++) {
        const startIndex = (batch - 1) * numConcurrent;
        const endIndex = Math.min(startIndex + numConcurrent, numClients);

        console.log(`Sending batch ${batch} (${startIndex + 1}-${endIndex})...`);
        const batchPromises = clients.slice(startIndex, endIndex).map(client => client());
        await Promise.all(batchPromises);

        console.log(`Batch ${batch} (${startIndex + 1}-${endIndex})...completed - Col: ${errorThrown}`);
        
        if (batch < batches) {
            console.log(`Waiting for ${interval}x100 milliseconds before next batch...`);
            await new Promise(resolve => setTimeout(resolve, interval * 100));
        }
    }

    console.log(`All requests completed. . . Success: ${numClients - errorThrown}, Col: ${errorThrown}`);
}


async function main() {
    const numClients = 150*120; // Total number of clients 
    const numConcurrent = 120; // Number of concurrent clients per batch
    const interval = 2; // Interval in 100x milliseconds between batches

    try {
        fs.writeFileSync(logFileName, 'Client Index,Start_time,End_time,Latency (ms)\n'); // CSV header

        await sendRequestsConcurrently(numClients, numConcurrent, interval);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

const logFileName = `latencyforclients.csv`;

main();
