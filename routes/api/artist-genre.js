const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const ArtistGenre = require('../../models/ArtistGenre');

// @route   POST api/artist-genre
// @desc    Create new genre
// @access  Private
router.post('/', [ auth, 
    [
        check('genre', 'Genre is required').not().isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { genre } = req.body;

    try {
        const databaseArtistGenre = await ArtistGenre.findOne({ user: req.user.id })

        // Creates a new genre document in MongoDB for the user
        if(!databaseArtistGenre) {

            newGenre = new ArtistGenre({
                user: req.user.id,
                genreArray: [{ genre: genre }]
            });

            await newGenre.save();

            return res.json(newGenre)
        }

        // If the user exists. Check if the genre request is a duplicate.
        if (databaseArtistGenre.genreArray.filter(
            genreDB => 
                genreDB.genre.toLowerCase() === genre.trim().toLowerCase()
                ).length > 0) {
            return res.status(400).json({ errors: [{msg: 'Genre already exists'}] });
        }
        
        databaseArtistGenre.genreArray.unshift({ genre });

        await databaseArtistGenre.save();

        res.json(databaseArtistGenre);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   DELETE api/artist-genre/remove/:id
// @desc    Removes genre
// @access  Private
router.post('/remove/:id', auth, async (req, res) => {

    try {
        
        const databaseArtistGenre = await ArtistGenre.findOne({ user: req.user.id });

        if(!databaseArtistGenre) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if(databaseArtistGenre.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Finds the index of the genre, removes it, saves the new array to MongoDB
        const indexOfGenre = databaseArtistGenre.genreArray.map(
            function(genre) { 
                return genre._id
            }).indexOf(req.params.id);
        databaseArtistGenre.genreArray.splice(indexOfGenre, 1)

        await databaseArtistGenre.save();

        res.json(databaseArtistGenre);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
   
})

// @route   GET api/artist-genre
// @desc    Gets the artist genre array
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const databaseArtistGenre = await ArtistGenre.findOne({ user: req.user.id });

        if(!databaseArtistGenre) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if(databaseArtistGenre.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(databaseArtistGenre.genreArray);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/artist-genre/:userId
// @desc    Gets the artists genre from a specfic user Id
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        const databaseArtistGenre = await ArtistGenre.findOne({ user: req.params.userId });

        if(!databaseArtistGenre) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(databaseArtistGenre.genreArray);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;