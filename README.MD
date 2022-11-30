# BOT BIRTHDAY EMAIL
this is a bot that sends an email to a list of people on their birthday

# HOW TO USE
1. clone the repo
2. run `npm install` || `yarn install`
3. create a `.env` file and add the following variables
    - `MAIL FROM` = your email address
    - `MAIL_PASSWORD` = your secret email password
    - `MONGO_URI` = your mongo db uri
    - `API_URL` = your api url
4. run `npm start` || `yarn start`
5. open your browser and go to `localhost:5000/send-birthday` for checking log send email


# REQUIREMENTS
- nodejs
- mongodb
- nodemailer
- express
- mongoose
- dotenv
- cron
- moment
- nodemon
- cors
- axios