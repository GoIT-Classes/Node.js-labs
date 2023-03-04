const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
require('colors');

const connectDB = require('../config/db');

const configPath = path.join(__dirname, '..', 'config', '.env');

dotenv.config({ path: configPath });

const app = express();

// console.log(process.env.andrew);
// console.log(process.env.vova);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set Routes

app.use('/api/v1', require('./routes/moviesRoutes'));

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

app.use('*', notFound);
app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}, Mode: ${process.env.NODE_ENV}`
      .green.italic.bold
  );
});
