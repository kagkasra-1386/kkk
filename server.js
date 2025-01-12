const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    res.json({ message: 'کاربر با موفقیت ثبت شد!' });
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ message: 'ورود موفقیت‌آمیز بود!' });
    } else {
        res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است.' });
    }
});

// Start Server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
