const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config();

const INITIAL_PORT = Number(process.env.PORT) || 5001;
const MAX_PORT_ATTEMPTS = 20;

const start = async () => {
  try {
    await connectDB();
    let attempts = 0;
    let currentPort = INITIAL_PORT;

    const listenWithRetry = () => {
      const server = app.listen(currentPort, () => {
        console.log(`Backend running on port ${currentPort}`);
      });

      server.on('error', (error) => {
        if (error.code === 'EADDRINUSE' && attempts < MAX_PORT_ATTEMPTS) {
          attempts += 1;
          currentPort += 1;
          console.warn(`Port in use. Retrying on ${currentPort}...`);
          listenWithRetry();
          return;
        }

        console.error('Failed to start server:', error.message);
        process.exit(1);
      });
    };

    listenWithRetry();
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

start();
