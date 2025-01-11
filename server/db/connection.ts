import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const uri = process.env.DATABASE_URI || '';
export async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
    try {
      await mongoose.connection.close();
      console.log('Database connection closed successfully.');
    } catch (error) {
      console.error('Error closing database connection:', error);
      throw error;
    }
  }
