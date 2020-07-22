const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Posts');


// @route   GET api/posts/:userId
// @desc    Get posts by user ID
// @access  Public
router.get('/:userId', async (req, res) => {

    try {
        const post = await Post.find({user: req.params.userId}).sort({ date: -1 });

        if(!post) {
            return res.status(404).json({ msg: 'Posts not found'});
        }

        res.json(post);

    } catch(err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found'});
        }

        res.status(500).send('Server Error');
    }
});




// @route   POST api/users
// @desc    Create a Post
// @access  Private
router.post('/', [ auth, [
    check('text', 'Text is required').not().isEmpty()
] ], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(400).json({msg: 'Post not found' });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Post not found' });
        }

        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch(err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg: 'Post already liked'});
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   POST api/posts/comments/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', [ auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @router  GET api/posts/comments/:id
// @desc    Get a post by post id
// @access  Private
router.get('/comment/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
  
        res.json(post);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/posts/comment/delete/:postId/:commentId
// @desc    Delete a post comment
// @access  Private
router.put('/comment/delete/:postId/:commentId', auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.postId);

        if(!post) {
            return res.status(400).json({msg: 'Post not found' });
        }

        const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments);

    } catch(err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});





// MIGHT NEED TO DELETE

// @route   GET api/post/recent
// @desc    Get the most recent hundred posts
// @access  Private
// router.get('/recent', auth, async (req, res) => {
//     try {
//         const post = await Post.find({});
//         res.json(post)
//     } catch(err) {
//         if (err.kind === 'ObjectId') {
//             return res.status(404).json({ msg: 'Post not found'});
//         }
//         res.status(500).send('Server Error');
//     }
// })


module.exports = router;