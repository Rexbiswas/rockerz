const router = require('express').Router();
const User = require('../models/User');
const jsonController = require('../controllers/jsonController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        // Validation
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        if (global.useMongoDB) {
            // MONGODB LOGIC
            const emailExist = await User.findOne({ email: req.body.email });
            if (emailExist) return res.status(400).json({ message: "Email already exists" });

            const usernameExist = await User.findOne({ username: req.body.username });
            if (usernameExist) return res.status(400).json({ message: "Username already exists" });

            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            });

            await user.save();
            res.status(201).json({ user: user._id, message: "User created successfully (DB)" });

        } else {
            // JSON FILE LOGIC
            const emailExist = jsonController.findUserByEmail(req.body.email);
            if (emailExist) return res.status(400).json({ message: "Email already exists" });

            const usernameExist = jsonController.findUserByUsername(req.body.username);
            if (usernameExist) return res.status(400).json({ message: "Username already exists" });

            const newUser = {
                _id: Date.now().toString(),
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                createdAt: new Date()
            };

            jsonController.saveUser(newUser);
            res.status(201).json({ user: newUser._id, message: "User created successfully (JSON)" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        // Validation
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ message: "Please enter email and password" });
        }

        let user;

        if (global.useMongoDB) {
            user = await User.findOne({ email: req.body.email });
        } else {
            user = jsonController.findUserByEmail(req.body.email);
        }

        if (!user) return res.status(400).json({ message: "Email is not found" });

        // Check password
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({ message: "Invalid password" });

        // Create and assign token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'rokerz_secret_key');
        res.header('auth-token', token).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
