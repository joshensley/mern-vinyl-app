const mongoose = require('mongoose');

const VinylCollectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    genre: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    albums: [
        {
            title: {
                type: String,
                required: true
            },
            albumCover: {
                data: Buffer,
                type: String
            },
            releaseYear: {
                type: Number,
                required: true
            },
            songs: [
                {
                    trackNumber: {
                        type: Number,
                        required: true
                    },
                    trackTitle: {
                        type: String,
                        required: true
                    },
                    trackArtist: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = VinylCollection = mongoose.model('VinylCollection', VinylCollectionSchema);