import express from 'express';
import cors from 'cors';
import { env } from './config/env.config';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import linkRoutes from './routes/link.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const PORT = env.PORT || 3000;

app.use(helmet());

app.use(compression());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { status: 'error', message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút' }
});
app.use('/api/', apiLimiter);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/', linkRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
