// src/index.js
// Entry point of the StockMaster backend (JavaScript version)

import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected');

    app.listen(PORT, () => {
      console.log(`🚀 StockMaster backend running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

async function shutdown() {
  console.log('\n🛑 Shutting down server...');
  await disconnectDB();
  console.log('🔌 DB disconnected. Goodbye!');
  process.exit(0);
}

startServer();
