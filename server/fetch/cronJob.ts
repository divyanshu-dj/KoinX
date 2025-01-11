import cron from 'node-cron';
import { fetchPrices } from './fetchPrices';

export function initializeCronJobs() {
cron.schedule('0 */2 * * *', async () => {
    console.log('Cron job started: Fetching prices...');
    try {
        await fetchPrices();
        console.log('Prices fetched successfully.');
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
});
  console.log('Cron jobs initialized.');
}
