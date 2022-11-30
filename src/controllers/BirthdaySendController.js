const BirthdaySend = require('../models/BirthdaySend');
const User = require('../models/Users');
const moment = require("moment");

exports.getAllBirthdaySends = async (req, res) => {
    try {
        const birthdaySends = await BirthdaySend.find();
        res.status(200).json({
            message: 'BirthdaySends fetched successfully',
            data: birthdaySends
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.viewSendBirthday = async (req, res) => {

    const birthdaySends = await BirthdaySend.find();
    const users = await User.find();

    const datas = birthdaySends.map(birthdaySend => {
        const user = users.find(user => user._id.toString() === birthdaySend.user.toString());
        return {
            ...birthdaySend._doc,
            birthday: moment(user.birthday).format('DD MMMM YYYY'),
            user_name: user.name,
        }
    })

    res.render('birthday', { datas });
}