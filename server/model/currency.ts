import mongoose, { Schema, Document } from 'mongoose';

interface ICurrency extends Document {
  coin: string;
  price: number;
  marketCap: number;
  change24h: number;
  createdAt: Date;
  updatedAt: Date;
}

const currencySchema = new Schema({
  coin: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum']
  },
  price: {
    type: Number,
    required: true
  },
  marketCap: {
    type: Number,
    required: true
  },
  change24h: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

currencySchema.index({ coin: 1, timestamp: -1 });

export default mongoose.model<ICurrency>('Currency', currencySchema);
