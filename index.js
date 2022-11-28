const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.json());

const usersRouter = require('./src/routes/Users');
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});