require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db/connect');
const titlesRoutes = require('./routes/titles');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/titles', titlesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

start();