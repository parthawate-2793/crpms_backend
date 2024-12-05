const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req,res) => {
    const { name, email, password, role} = req.body;

    console.log(name);
    console.log(email, `Type: ${typeof email}`);
    console.log(password, `Type: ${typeof password}`);
    console.log(role, `Type: ${typeof role}`)
    try {
        if (typeof email !== "string" || typeof password !== "string" || typeof role !== "string") {
            return res.status(400).json({message: 'Invalid input data type'});
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: 'User already exists' });
        } else {
            const user = await User.create({ name, email, password,role });
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        }
    } catch (error) {
        console.error('Error in registration:',error.message);
        res.status(500).json({ message: 'Registration Failed' });
    }
};

const loginUser = async(req,res) => {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);
    try {
        const user = await User.findOne({ email });
        if(user && (await user.matchPassword(password))) {
            res.status(200).json({
                id:user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Login failed'});
    }
};

const getUserProfile = async(req,res) => {
    const user = await User.findById(req.user.id);
    if(user) {
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
        });
    } else {
        res.status(404).json({message: 'User not found'});
    }
}

module.exports = {registerUser,loginUser,getUserProfile};