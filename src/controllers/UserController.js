const User = require('../models/Users');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Users fetched successfully',
            data: users
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json({
            message: 'User fetched successfully',
            data: user
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    const user = req.body;

    // check if user exists
    const emails = await User.findOne({ email: user.email });

    if (emails) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    const userExists = await User.findById(id);

    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { ...user, id }, { new: true });

    res.status(200).json({
        message: 'User updated successfully',
        data: updatedUser
    });
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    const userExists = await User.findById(id);

    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    const user = await User.findByIdAndRemove(id);

    res.status(200).json({
        message: 'User deleted successfully',
        data: user
    });
}