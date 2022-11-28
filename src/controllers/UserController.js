const User = require('../models/Users');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

exports.createUser = async (req, res) => {
    const user = req.body;

    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    const updatedUser = await User.findByIdAndUpdate(id, { ...user, id }, { new: true });

    res.json(updatedUser);
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndRemove(id);

    res.json({ message: 'User deleted successfully.' });
}