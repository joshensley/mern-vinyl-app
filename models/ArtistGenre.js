const mongoose = require('mongoose');

const ArtistGenreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    genreArray: [
        {
            genre: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = ArtistGenre = mongoose.model('ArtistGenre', ArtistGenreSchema);