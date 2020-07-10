import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import AlertComponent from '../layout/AlertComponent';
import { connect } from 'react-redux';

import { 
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    addSongs
} from '../../actions/vinylCollection';

import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    FormGroup,
    Label,
    Input
} from 'reactstrap';


const SongModal = ({ 
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    addSongs,
    vinylCollection: { artist, oneArtist, loading}

}) => {

    const [disableButtons, setDisableButtons] = useState(true);
    const [artistId, setArtistId] = useState("");
    const [albumId, setAlbumId] = useState("");
    const [songCount, setSongCount] = useState(1);
    const [songs, setSongs] = useState([{
            trackNumber: "",
            trackTitle: "",
            trackArtist: ""
        }]
    );
    
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setDisableButtons(true);
        setArtistId("");
        setAlbumId("");
        setSongCount(1);
        setSongs([{
                trackNumber: "",
                trackTitle: "",
                trackArtist: ""
            }]
        );
        setModal(!modal);
        if(!modal) { getArtistsWithAlbums() };
        if(modal) { clearOneArtist() };
    };

    const addSong = () => { 
        setSongCount(songCount + 1);
        setSongs(songs => [
            ...songs, 
            {
                trackNumber: "",
                trackTitle: "",
                trackArtist: ""
            }
        ])
    }

    const removeSong = () => {
        if(songs.length > 1) {
            setSongCount(songCount - 1);
            setSongs(songs.filter((song, index) => index !== (songs.length - 1)));
        }
    }

    const updateSongs = index => e => {
        let newSongsArray = [...songs];
        newSongsArray[index][e.target.name] = e.target.value;
        setSongs(newSongsArray);
    }

    const clearSongs = () => {
        setSongCount(1);
        setSongs([{
            trackNumber: "",
            trackTitle: "",
            trackArtist: ""
        }]);
    }

    const onChangeSelectArtist = (artistId) => {
        setArtistId(artistId);
        setAlbumId("");
        setDisableButtons(true);
        getOneArtist(artistId);
    }

    const onChangeSelectAlbum = (albumId) => {
        setAlbumId(albumId);

        if(albumId !== "") {
            setDisableButtons(false);
        }
    }

    let formData = {
        artistId: artistId,
        albumId: albumId,
        songs: songs
    }

    return (
        <Fragment>
            <Button color="info" onClick={toggle}>Add Songs</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Add Songs
                    <br></br>
                    <small><strong>Note:</strong> Artists that have albums are listed.</small>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={e => {
                        e.preventDefault();
                        addSongs(formData);
                    }}>

                        <FormGroup>
                            <Label>Select Artist</Label>
                            <Input type="select" name="artist" onChange={e => onChangeSelectArtist(e.target.value)}>
                                <option hidden value="">Choose Artist (required)</option>
                                <option value="" disabled default>Choose Artist (required)</option>
                                {
                                    !loading && artist !== null && artist.map((artistMap , index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={artistMap._id}
                                            >
                                                {artistMap.artist}
                                            </option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>

                        {
                            !loading && oneArtist !== null && 
                            <FormGroup>
                                <Label>Select Album</Label>
                                <Input type="select" name="album" onChange={e => onChangeSelectAlbum(e.target.value)}>
                                    <option hidden value="">Choose Album (required)</option>
                                    <option value="" default>Choose Album (required)</option>
                                    {
                                        oneArtist.albums.map((albumsMap, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={albumsMap._id}
                                                >
                                                    {albumsMap.title}
                                                </option>
                                            )
                                        })
                                    }
                                    
                                </Input>
                                <ModalFooter>

                                    <Button
                                        color="warning"
                                        type="button"
                                        onClick={e => clearSongs()}
                                        disabled={disableButtons}
                                        >
                                            Clear All Songs
                                    </Button>
                                    <Button
                                        color="danger"
                                        type="button"
                                        onClick={e => removeSong()}
                                        disabled={disableButtons}
                                        >
                                            Remove Song
                                    </Button>
                                    <Button
                                        color="info"
                                        type="button"
                                        onClick={e => addSong()}
                                        disabled={disableButtons}
                                        >
                                            Add Song ({songCount})
                                    </Button>
                                    
                                </ModalFooter> 
                            </FormGroup>
                        }

                        {
                            !disableButtons && !loading && oneArtist !== null &&
                            songs.map((song, index) => {

                                const songLabel = `Song Information ${index + 1}`

                                return (
                                    <Fragment key={index}>
                                        <hr></hr>
                                        <Label>{songLabel}</Label>
                                        <FormGroup>
                                            <Input 
                                                type="text"
                                                name="trackNumber"
                                                value={song.trackNumber}
                                                onChange={updateSongs(index)}
                                                placeholder="Track Number"
                                            />
                                            
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                type="text"
                                                name="trackTitle"
                                                value={song.trackTitle}
                                                onChange={updateSongs(index)}
                                                placeholder="Track Title"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Input 
                                                type="text"
                                                name="trackArtist"
                                                value={song.trackArtist}
                                                onChange={updateSongs(index)}
                                                placeholder="Track Artist"
                                            />
                                        </FormGroup>
                                    </Fragment>
                                )   
                            })
                        }
                        <AlertComponent />
                        <ModalFooter>    
                            <Button
                                color="primary"
                                type="submit"
                                value="submit"
                                disabled={disableButtons}
                                >
                                    Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </Fragment>
    )  
}

SongModal.propTypes = {
    getArtistsWithAlbums: PropTypes.func.isRequired,
    getOneArtist: PropTypes.func.isRequired,
    clearOneArtist: PropTypes.func.isRequired,
    addSongs: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    addSongs
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
})

export default connect(mapStateToProps, mapDispatchToProps)(SongModal);