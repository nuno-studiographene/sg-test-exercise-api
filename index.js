import express from 'express';
import bodyParser from 'body-parser';

import foodsRoutes from './routes/foods.js';

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json());

app.use('/foods', foodsRoutes);

app.get('/', (req, res) => res.send('Welcome to the studiographene test exercise. Please access the /foods route to call the apis.'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));