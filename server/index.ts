import express from 'express';
import { connectToDatabase, disconnectFromDatabase } from './db/connection';
import { initializeCronJobs } from './fetch/cronJob';
import { config } from 'dotenv';
config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initializeCronJobs();
async function startServer() {
  try {
    await connectToDatabase();
    console.log('Connected to the database.');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });


    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);;

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

async function shutdown() {
    try {
      console.log('Received kill signal. Shutting down server...');
      await disconnectFromDatabase();
      process.exit(0);
    } catch (error) {
      console.error('Error shutting down server:', error);
      process.exit(1);
    }
  }

startServer();
