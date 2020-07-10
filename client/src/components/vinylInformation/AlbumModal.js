import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import AlertComponent from '../layout/AlertComponent';
import { connect } from 'react-redux';

import { getArtists, addAlbum } from '../../actions/vinylCollection';

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


const AlbumModal = ({ 
    getArtists, 
    addAlbum, 
    vinylCollection: { artist, loading} 
}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
        setAlbum('');
        setArtist('');
        setReleaseYear('');
        setFile('');

        if(!modal) {
            getArtists();
        }
    }

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    const [file, setFile] = useState('');
    const [artistState, setArtist] = useState('');
    const [albumState, setAlbum] = useState('');
    const [releaseYearState, setReleaseYear] = useState('');

    // Sorts artist alphabetically
    if (artist !== null && !loading) {
        artist.sort(function(a, b){
            if(a.artist < b.artist) { return -1; }
            if(a.artist > b.artist) { return 1; }
            return 0;
        })
    }

    let formData = {
        artist: artistState,
        albums: {
            title: albumState,
            releaseYear: releaseYearState
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        const multipartFormData = new FormData();
        multipartFormData.append('album-covers', file);
        addAlbum(formData, multipartFormData);
        setAlbum('');
        setReleaseYear('');
    }

    return (
        <Fragment>
            <Button color="info" onClick={toggle}>Add Album</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Album</ModalHeader>
                <AlertComponent />
                <ModalBody>
                    <form onSubmit={onSubmit}> 

                    <FormGroup>
                        <Label>Select</Label>
                        <Input type="select" name="artist" onClick={e => setArtist(e.target.value)}>
                            <option hidden value="">Choose Artist (required)</option>
                            <option disabled="disabled" default>Choose Artist (required)</option>
                            {
                                !loading && artist !== null && artist.map((artistMap, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={artistMap.artist}
                                        >
                                            {artistMap.artist}
                                        </option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>Album</Label>
                        <Input 
                            type="text" 
                            placeholder="Add Album (required)"
                            value={albumState}
                            onChange={e => setAlbum(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Release Year</Label>
                        <Input 
                            type="text" 
                            placeholder="Add Release Year (required)"
                            value={releaseYearState}
                            onChange={e => setReleaseYear(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>Album Cover</Label>
                        <Input 
                            type="file" 
                            name="file"
                            id="file"
                            onChange={onChange}
                            required
                        />
                    </FormGroup>

                    <ModalFooter>
                        <Button 
                            color="primary" 
                            type="submit" 
                            value="submit" 
                            >
                                Submit
                        </Button>{' '}
                    </ModalFooter>
                    </form>
                </ModalBody>
            </Modal>
        </Fragment>

    )
}

AlbumModal.propTypes = {
    getArtists: PropTypes.func.isRequired,
    addAlbum: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
}

const mapDispatchToProps = {
    getArtists,
    addAlbum
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
})

export default connect(mapStateToProps, mapDispatchToProps)(AlbumModal);