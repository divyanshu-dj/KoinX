import axios from 'axios';
import Currency from '../model/currency';

const COINGECKO_API_BASE = process.env.COINGECKO_API_BASE || '';
const API_KEY = process.env.COINGECKO_API_KEY || '';
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

export async function fetchPrices() {
  try {
    const response = await axios.get(`${COINGECKO_API_BASE}/simple/price`, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
        include_last_updated_at: true,
        precision: 2
      },
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': API_KEY
      }
    });
    console.log('Response:', response.data);

    const updates = COINS.map(async (coinId) => {
      const data = response.data[coinId];
      
      const priceData = {
        coin: coinId,
        price: data.usd,
        marketCap: data.usd_market_cap,
        change24h: data.usd_24h_change
      };
      
      await Currency.create(priceData);
    });

    await Promise.all(updates);
    console.log('Crypto prices updated successfully');
  } catch (error : any) {
      console.error('Error fetching crypto prices:', error.message);
      throw error;
  }
}