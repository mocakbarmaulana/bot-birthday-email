const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const {viewSendBirthday} = require("./src/controllers/BirthdaySendController");
app.get('/send-birthday', viewSendBirthday)

const usersRouter = require('./src/routes/Users');

app.use('/api/users', usersRouter);
const SendBirthday = require('./src/services/SendBirthday');

cron.schedule('* 9 * * *', async () => {
    await SendBirthday();
    console.log("Running task every 9 AM");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});