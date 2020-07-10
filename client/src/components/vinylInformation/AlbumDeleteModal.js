import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    getArtistsWithAlbums, 
    getOneArtist,
    clearOneArtist,
    deleteAlbum 
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

const AlbumDeleteModal = ({ 
    getArtistsWithAlbums, 
    getOneArtist,
    clearOneArtist,
    deleteAlbum, 
    vinylCollection: { artist, oneArtist, loading } 
}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
        if(!modal) { getArtistsWithAlbums() };
        if(modal) { clearOneArtist() };
    }

    // Gets the album information for the selected artist
    const [artistIdState, setArtistIdState] = useState('');
    const toggleArtist = (artistIdInput) => {
        setArtistIdState(artistIdInput);
        getOneArtist(artistIdInput)
    }

    // Sorts artist alphabetically
    if (artist !== null && !loading) {
        artist.sort(function(a, b){
            if(a.artist < b.artist) { return -1; }
            if(a.artist > b.artist) { return 1; }
            return 0;
        })
    }

    // Sorts albums chronologically
    if (oneArtist !== null && !loading) {
        oneArtist.albums.sort(function(a, b){
            if(a.releaseYear < b.releaseYear) { return -1; }
            if(a.releaseYear > b.releaseYear) { return 1; }
            return 0;
        })
    }

    // Deletes selected album and then gets the updated artist information
    const onClickDeleteAlbum = (artistId, albumId) => {
        async function main() {
            try {
                await deleteAlbum(artistId, albumId);
                await getOneArtist(artistId);
            } catch(err) {
                console.log(err);
            }
        }
        main();
    }

    return (
        <Fragment>
            <Button color="info" onClick={toggle}>Delete Album</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Delete Album
                    <br></br>
                    <small><strong>Note:</strong> Artists that have albums are listed</small>
                </ModalHeader>
                <ModalBody>

                    <FormGroup>
                        <Label>Select</Label>
                        <Input type="select" name="artist" onChange={e => toggleArtist(e.target.value)}>
                                <option hidden value="">Choose Artist (required)</option>
                                <option disabled="disabled" default>Choose Artist (required)</option>
                                {
                                    !loading && artist !== null && artist.map((artistMap, index) => {
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
                        oneArtist !== null &&
                        <Table size="sm" hover style={{textAlign: "center"}}>
                            <thead>
                                <tr>
                                    <th>Year</th>
                                    <th>Album</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    oneArtist.albums.map((album, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <tr>
                                                    <th style={{verticalAlign: "middle"}}>
                                                        {album.releaseYear}
                                                    </th>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        {album.title}
                                                    </td>
                                                    <td style={{verticalAlign: "middle"}}>
                                                        
                                                        <Button color="danger" onClick={() => onClickDeleteAlbum(artistIdState, album._id)}>
                                                            <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                                                <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                                            </svg>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </Fragment>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    }
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

AlbumDeleteModal.propTypes = {
    getArtistsWithAlbums: PropTypes.func.isRequired,
    getOneArtist: PropTypes.func.isRequired,
    clearOneArtist: PropTypes.func.isRequired,
    deleteAlbum: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
});

const mapDispatchToProps = {
    getArtistsWithAlbums,
    getOneArtist,
    clearOneArtist,
    deleteAlbum
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDeleteModal);