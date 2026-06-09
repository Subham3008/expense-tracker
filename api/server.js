import { env } from './src/config/env.js';
import app from './src/app.js';
import connectDB from './src/config/db.js';

connectDB().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
});