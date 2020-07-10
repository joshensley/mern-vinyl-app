import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
// import AlertComponent from "../layout/AlertComponent";
import { connect } from 'react-redux';

import {
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    deleteSong
} from '../../actions/vinylCollection';

import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    FormGroup,
    Label,
    Input,
    Table
} from 'reactstrap';


const SongDeleteModal = ({ 
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    deleteSong,
    vinylCollection: { loading, artist, oneArtist }
}) => {

    const [artistId, setArtistId] = useState("");
    const [albumId, setAlbumId] = useState("");

    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
        setAlbumId("");
        setArtistId("");
        if(!modal) { getArtistsWithAlbums() };
        if(modal) { clearOneArtist() };
    }

    const onChangeSelectArtist = (artistId) => {
        setArtistId(artistId);
        setAlbumId("");
        getOneArtist(artistId);
    }

    const onChangeSelectAlbum = (albumId) => {
        setAlbumId(albumId);
    }

    const onClickDeleteSong = (songId) => {
        console.log("artist " + artistId);
        console.log("album " + albumId);
        console.log("song " + songId);

        async function main() {
            try {
                await deleteSong(artistId, albumId, songId);
                await getOneArtist(artistId);
            } catch(err) {
                console.log(err);
            }
        }
        main();
    }

    let filteredAlbum = "";
    if (oneArtist && albumId) {
        filteredAlbum = oneArtist.albums
            .filter(album => { return (album._id === albumId) })[0].songs
            .sort(function(a, b) {
                if (a.trackNumber < b.trackNumber) { return -1; }
                if (a.trackNumber > b.trackNumber) { return 1; }
                return 0
            })
    }
   
    return (
        <Fragment>
            <Button color="info" onClick={toggle}>Delete Songs</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Delete Songs
                    <br></br>
                    <small><strong>Note:</strong> Artists that have albums are listed.</small>
                </ModalHeader>
                <ModalBody>
                    <form>
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
                            </FormGroup>
                        }

                        {
                            filteredAlbum !== "" && albumId !== "" &&
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Track #</th>
                                        <th>Title</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        
                                        filteredAlbum.map((song, index) => { return (
                                            <Fragment key={index}>
                                                <tr>
                                                    <th>
                                                        {song.trackNumber}
                                                    </th>
                                                    <td>
                                                        {song.trackTitle}
                                                    </td>
                                                    <td>
                                                        <Button color="danger" onClick={e => onClickDeleteSong(song._id)}>
                                                            <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                                                <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                                            </svg>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        )})
                                    }
                                </tbody>
                            </Table>
                        }
                    </form>
                </ModalBody>
            </Modal>

        </Fragment>
    )
}

SongDeleteModal.propTypes = {
    getArtistsWithAlbums: PropTypes.func.isRequired,
    getOneArtist: PropTypes.func.isRequired,
    clearOneArtist: PropTypes.func.isRequired,
    deleteSong: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    deleteSong
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
})

export default connect(mapStateToProps, mapDispatchToProps)(SongDeleteModal);
