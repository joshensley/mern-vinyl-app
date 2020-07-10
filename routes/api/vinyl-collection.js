const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const VinylCollection = require('../../models/VinylCollection');

// For file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/album-covers');
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


// @route   POST api/vinyl-collection/artist
// @desc    Create New Artist
// @access  Private
router.post('/artist', [ auth,
    [ 
        check('artist', 'Artist is required').not().isEmpty(),
        check('genre', 'Genre is required').not().isEmpty()
    ]
], 
    async (req, res) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { artist, genre } = req.body;

        try {

            let newArtist = await VinylCollection.findOne({ artist: artist.trim(), user: req.user.id });

            if(newArtist) {
                return res.status(400).json({ errors: [{ msg: 'Artist already exists' }]})
            }

            newArtist = new VinylCollection({
                user: req.user.id,
                artist: artist.trim(),
                genre: genre
            })

            await newArtist.save()

            return res.json(newArtist);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});

// @route   GET api/vinyl-collection/artist
// @desc    Get user artists
// @access  Private
router.get('/artist', auth, async (req, res) => {

    try {
        
        let artist = await VinylCollection.find({ user: req.user.id });

        if(!artist) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        // if(artist.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        return res.json(artist);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   GET api/vinyl-collection/artist/no-albums
// @desc    Get user artists with no current albums
// @access  Private
router.get('/artist/no-albums', auth, async (req, res) => {

    try {
        
        let artist = await VinylCollection.find(
            { 
                user: req.user.id, 
                $and: [{ "albums.0": {$exists: false }}] 
            },
        );

        if(!artist) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        // if(artist.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        return res.json(artist);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/vinyl-collection/artist/with-albums
// @desc    Get user artists with albums
// @access  Private
router.get('/artist/with-albums', auth, async (req, res) => {

    try {
        
        let artist = await VinylCollection.find(
            { 
                user: req.user.id, 
                $and: [{ "albums.0": {$exists: true }}] 
            },
        );

        if(!artist) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        // if(artist.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        return res.json(artist);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/vinyl-collection/artist-from-other-users/:userId
// @desc    Get artist information that have albums from other users
// @access  Public
router.get('/other-user-artist-with-albums/:userId', async (req, res) => {

    try {
        let artist = await VinylCollection.find({ 
            user: req.params.userId,
            $and: [{ "albums.0": {$exists: true }}]
        });


        if(!artist) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        return res.json(artist);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/vinyl-collection/artist/:artistId
// @desc    Get one artist
// @access  Private
router.get('/artist/:artistId', auth, async (req, res) => {

    try {

        let artist = await VinylCollection.findOne(
            {
                user: req.user.id,
                _id: req.params.artistId
            }
        )

        if(!artist) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        // if(artist.user.toString() !== req.user.id) {
        //     return res.status(401).json({ msg: 'User not authorized' });
        // }

        return res.json(artist);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/vinyl-collection/artist/:userId/:artistId
// @desc    Get one artist from other user
// @access  Private
router.get('/other-user-artist/:userId/:artistId', async (req, res) => {

    try {

        let artist = await VinylCollection.findOne(
            {
                user: req.params.userId,
                _id: req.params.artistId
            }
        )

        if(!artist) {
            return res.status(400).json({errors: [{ msg: 'User not found' }]});
        }

        return res.json(artist);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/vinyl-collection/artist/delete/:id
// @desc    Delete user artist with no current albums
// @access  Private
router.delete('/artist/delete/:id', auth, async (req, res) => {

    try {
        const artist = await VinylCollection.findById(req.params.id);

        if(!artist) {
            return res.status(404).json({ msg: 'Artist not found'});
        }

        if(artist.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User not authorized' });
        }

        await artist.remove()
        res.json({msg: 'Artist removed'});
        
    } catch(err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Artist not found'});
        }
        res.status(500).send('Server Error');
    }
});


// @route   PUT api/vinyl-collection/album
// @desc    Add an Album to Artist
// @access  Private
router.put('/albums', [ auth, 
    [
        check('artist', 'Artist is required').not().isEmpty(),
        check('albums.title', 'Album title is required').not().isEmpty(),
        check('albums.releaseYear', 'Release Year is required').not().isEmpty()
    ]
], 
    // upload.single('album-covers'),
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
        }
   
        try {

            const { artist, albums } = req.body;

            // New
            // const albumCover = req.file.path;
            
            const databaseArtist = await VinylCollection.findOne({ artist: artist, user: req.user.id });

            if( databaseArtist.albums.filter(databaseAlbum => databaseAlbum.title.trim() === albums.title.trim()).length > 0 ) {
                return res.status(400).json({ errors: [{msg: 'Album already exists'}]})
            }

            databaseArtist.albums.unshift({
                title: albums.title.trim(),
                albumCover: "",
                releaseYear: albums.releaseYear
            });

            await databaseArtist.save()

            res.json(databaseArtist)
        

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
})

// @route   POST api/vinyl-collection/album-cover/:artistId/:albumId
// @desc    Add an Album Cover Image to Album
// @access  Private
router.post('/album-cover/:artistId/:albumId', auth, 
    upload.single('album-covers'), 
    async (req, res) => {

    try {
        const albumCover = req.file.path;

        let databaseArtist = await VinylCollection.findOne({
            _id: req.params.artistId
        })

        let index = databaseArtist.albums.findIndex(
            album => album._id.toString() === req.params.albumId.toString());

        databaseArtist.albums[index].albumCover = albumCover;
        databaseArtist.save();
        res.json(databaseArtist.albums);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/vinyl-collection/get-album-cover/:artistId/:albumId
// @desc    Get an Album Cover Image
// @access  Private
router.get('/get-album-cover/:artistId/:albumId', async (req, res) => {

    try {
        let databaseArtist = await VinylCollection.findOne({
            _id: req.params.artistId
        })

        let album = databaseArtist.albums.filter(album => {
            return (album._id.toString() === req.params.albumId.toString());
        })

        const appDir = path.dirname(require.main.filename);
        res.sendFile(path.join(appDir, album[0].albumCover));



    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

// @route   DELETE api/vinyl-collection/artist/:artistId/albums/:albumsId/remove
// @desc    Removes an album
// @access  Private
router.post('/artist/:artistId/albums/:albumsId/remove', auth, async (req, res) => {

    try {

        const databaseArtist = await VinylCollection.findOne({
            user: req.user.id, 
            _id: req.params.artistId
        })

        indexOfAlbum = databaseArtist.albums.map(
            function(album) {
                return album._id
            }).indexOf(req.params.albumsId);

        const albumCoverPath = databaseArtist.albums[indexOfAlbum].albumCover;
    
        databaseArtist.albums.splice(indexOfAlbum, 1)

        await databaseArtist.save()

        fs.unlinkSync(path.join(process.cwd(), albumCoverPath));

        res.json(databaseArtist)

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/vinyl-collection/songs/:userId/:artistId/:albumId
// @desc    Get One Artist Information
// @access  Public
router.get('/songs/:userId/:artistId/:albumId', async (req, res) => {

    try {
        const { userId, artistId } = req.params;
        const databaseArtist = await VinylCollection.findOne({ _id: artistId, user: userId });

        res.json(databaseArtist);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    
})

// @route   PUT api/vinyl-collection/songs
// @desc    Add Songs to Album
// @access  Private
router.put('/songs', [ auth, 
    [
        check('artistId', 'Artist is required').not().isEmpty(),
        check('albumId', 'Album is required').not().isEmpty()
    ] 
],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { artistId, albumId, songs } = req.body;
            const databaseArtist = await VinylCollection.findOne({ _id: artistId, user: req.user.id });

            databaseArtist.albums.forEach(albumDB => {
                if(albumDB._id.toString() === albumId.toString()) {
                    songs.forEach(song => albumDB.songs.unshift(
                        {
                            trackNumber: song.trackNumber,
                            trackTitle: song.trackTitle.trim(),
                            trackArtist: song.trackArtist.trim()
                        }
                    ))
                }
            })

            await databaseArtist.save();

            res.json(databaseArtist);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
})

// @route   DELETE api/vinyl-collection/artist/:artistId/albums/:albumsId/song/:songId/remove
// @desc    Removes a song
// @access  Private
router.post('/artist/:artistId/albums/:albumsId/song/:songId/remove', auth, async (req, res) => {

    try {

        const databaseArtist = await VinylCollection.findOne({
            user: req.user.id, 
            _id: req.params.artistId
        })

        let indexOfAlbum = databaseArtist.albums.map(
            function(album) {
                return album._id
            }).indexOf(req.params.albumsId);
        
        let indexOfSong = databaseArtist.albums[indexOfAlbum].songs.map(
            function(song) {
                return song._id
            }).indexOf(req.params.songId);
       
        databaseArtist.albums[indexOfAlbum].songs.splice(indexOfSong, 1);

        await databaseArtist.save()

        res.json(databaseArtist)

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;