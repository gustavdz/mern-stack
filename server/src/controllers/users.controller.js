const usersCtrl = {};
const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.createUser = async (req, res) => {
    const { username } = req.body;
    const newUser = new User({
        username: username
    });
    await newUser.save();
    res.json({message: "User created!"});
};

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

usersCtrl.updateUser = async (req, res) => {
    const { username } = req.body;
    await User.findOneAndUpdate({ _id: req.params.id}, {
        username: username
    });
    res.json({message: "User Updated!"});
};

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: "User deleted!"});
};

module.exports = usersCtrl;
