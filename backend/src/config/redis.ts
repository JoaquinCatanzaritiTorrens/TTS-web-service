import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
    console.error('Error in Redis:', err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
};

export { redisClient, connectRedis };
