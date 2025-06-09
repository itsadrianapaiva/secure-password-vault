import express, { json } from 'express';
import { config } from './config/env.js';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import passwordRoutes from './routes/passwordRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

app.use(json()); //parse json in request body
app.use(helmet()); //add security headers
app.use(cors()); //allow cross-origin requests

//Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1/passwords', passwordRoutes);

app.use(errorHandler);
app.use(apiLimiter);

app.get('/', (req, res) => {
  res.send('Password Vault API is running');
});

const startServer = async () => {
  try {
    await connectDB(); //wait for db connection before moving on

    app.listen(config.port, () => {
      console.log(`Password Vault API is running on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1); //exit process if startup fails
  }
};

startServer();
