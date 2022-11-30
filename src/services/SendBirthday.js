const { createLogger, format, transports } = require('winston')
const moment = require('moment');
const Users = require('../models/Users');
const BirthdaySend = require('../models/BirthdaySend');
const SendMail = require('./SendMail');
const { sendEmail } = require('../api')


async function SendBirthday() {
    const logger = await createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.json()
        ),
        transports: [
            new transports.File({ filename: `src/logs/birthday-${moment().format('YYYY-MM-DD')}.log` })
        ]
    });

    let users = await Users.find();

    let failedSend = await BirthdaySend.find({ sent: false });

    if (failedSend.length > 0) {
        const usersFailed = users.filter(user => failedSend.some(failed => failed.user.toString() === user._id.toString()));
        for (const user of usersFailed) {
            const message = `Hey, Happy Birthday ${user.name}!, I hope you have a great day!. I'm sorry I couldn't send you a birthday message yesterday, but I'm sending it today!`;

            const response = await sendEmail({ email: user.email, message });

            if (response.status === 200) {
                logger.info(`API: Birthday message sent to ${user.email} successfully`);
            } else {
                logger.error(`API: Birthday message failed to send to ${user.email}`);
            }

            const result = await SendMail(user.email, 'Happy Birthday', message);

            if (result) {
                await BirthdaySend.findOneAndUpdate({ user: user._id }, { sent: true, message: message });
                logger.info(`Birthday message sent to ${user.email} successfully but failed yesterday`);
            }
        }
    }

    users = users.filter(user => moment(user.birthday).format('MM-DD') === moment().format('MM-DD'));

    if (users.length > 0) {
        for (const user of users) {
            const message = `Hey, ${user.name} it's your birthday`;

            const response = await sendEmail({ email: user.email, message: message });

            if (response.status === 200) {
                logger.info(`API: Birthday message sent to ${user.email} successfully`);
            } else {
                logger.error(`API: Birthday message failed to send to ${user.email}`);
            }

            const result = await SendMail(user.email, 'Happy Birthday', message);

            const birthdaySend = new BirthdaySend({
                user: user._id,
                birthday: user.birthday,
                message: message,
                sent: result.accepted.length > 0,
            })
            await birthdaySend.save();

            logger.info(`Birthday message sent to ${user.name} ${result.accepted.length > 0 ? 'on time' : 'but it was not sent'}`);
        }

    }

}

module.exports = SendBirthday;