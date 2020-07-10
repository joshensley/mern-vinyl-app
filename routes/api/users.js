const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const User = require('../../models/User');

// For file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype ==='image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const avatar = "upload/default/default.png";

    try {

        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({errors: [ { msg: 'User already exists' }] });
        }

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save()

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

    
});

// @route   PUT api/user/edit-user-avatar
// @desc    Edit the user photo
// @access  Private
router.put('/edit-user-avatar', auth, upload.single('avatar'), async (req, res) => {

    const avatar = req.file.path;

    try {
        const databaseUser = await User.findOne({ _id: req.user.id });
        if(!databaseUser) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        // Deletes old avatar
        const oldAvatar = databaseUser.avatar;
        if(oldAvatar !== "upload/default/default.png") {
            const deleteOldAvatarPath = path.join(process.cwd(), oldAvatar);
            fs.unlinkSync(deleteOldAvatarPath);
        }
        
        // Saves new avatar path
        databaseUser.avatar = avatar;
        databaseUser.save()

        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


// @route   GET api/users/:userId
// @desc    Get image of user avatar 
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        const appDir = path.dirname(require.main.filename);
        res.sendFile(path.join(appDir, user.avatar));

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;