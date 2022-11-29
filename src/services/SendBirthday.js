const moment = require('moment');
const Users = require('../models/Users');
const BirthdaySend = require('../models/BirthdaySend');
const SendMail = require('./SendMail');

async function SendBirthday() {

    let users = await Users.find();

    let failedSend = await BirthdaySend.find({ sent: false });

    if (failedSend.length > 0) {
        const usersFailed = users.filter(user => failedSend.some(failed => failed.user.toString() === user._id.toString()));
        for (const user of usersFailed) {
            const result = await SendMail(user.email, 'Happy Birthday', `Hey, Happy Birthday ${user.name}, sorry for the late message`);

            if (result) {
                await BirthdaySend.findOneAndUpdate({ user: user._id }, { sent: true });
                console.log('Birthday message sent to ' + user.name + ' But it was late');
            }
        }
    }

    users = users.filter(user => moment(user.birthday).format('MM-DD') === moment().format('MM-DD'));

    if (users.length > 0) {
        for (const user of users) {
            const result = await SendMail(user.email, 'Happy Birthday', `Hey, ${user.name} it’s your birthday`)

            const birthdaySend = new BirthdaySend({
                user: user._id,
                birthday: user.birthday,
                message: `Hey, ${user.name} it’s your birthday`,
                sent: result.accepted.length > 0,
            })

            await birthdaySend.save();

            console.log('Birthday message sent to ' + user.name + ` ${result.accepted.length > 0 ? 'on time' : 'but it was not sent'}`);
        }

    }

    return true
}

module.exports = SendBirthday;