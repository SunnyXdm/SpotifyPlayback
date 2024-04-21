import mongoose from 'mongoose';
import { Worker } from 'worker_threads';
import ngrok from '@ngrok/ngrok';
import { CLIENT_SECRET, MONGODB_URI } from '../config.js';
import './services/express/server.js';
import updateWebhook from './services/telegram/updateWebhook.js';

const db = mongoose.connect(MONGODB_URI);

db.then(() => {
  console.log('MongoDB connected');
}).catch((error) => console.log(error));

const ngrokListener = await ngrok.connect({
  proto: 'http',
  addr: 4000,
  authtoken_from_env: true,
});

await updateWebhook(`${ngrokListener.url()}/webhook${CLIENT_SECRET}`);

const worker = new Worker('./src/workers/loop.js', {
  workerData: {},
});

// Function to gracefully terminate the loop
const terminate = async () => {
  console.log('Terminating worker...');
  await worker.terminate();
  console.log('Worker terminated');
};

// Listen for process termination signals
process.on('SIGINT', async () => {
  await terminate();
  process.exit(0); // Exit the process
});

process.on('SIGTERM', async () => {
  await terminate();
  process.exit(0); // Exit the process
});

// You can also listen for the 'exit' event of the process
process.on('exit', async () => {
  await terminate();
});
