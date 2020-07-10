import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArtistsWithNoAlbums, deleteArtist } from '../../actions/vinylCollection';

import {
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody,
    Table
} from 'reactstrap';

const ArtistDeleteModal = ({  
    getArtistsWithNoAlbums,
    deleteArtist,
    vinylCollection: { artist, loading }
}) => {

    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);

        if(!modal) {
            getArtistsWithNoAlbums()
        }
    }

    // Returns artists with no albums and sorts them alphabetically
    let artistWithNoAlbums = "";
    if (artist !== null && !loading) {
        artistWithNoAlbums = artist.filter(artistfilter => artistfilter.albums.length === 0)

        artistWithNoAlbums.sort(function(a, b){
            if(a.artist < b.artist) { return -1; }
            if(a.artist > b.artist) { return 1; }
            return 0;
        })
    }

    return (
        <Fragment>
            <Button color="info" onClick={toggle}>Delete Artist</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Delete Artist
                    <br></br>
                    <small><strong>Note:</strong> Artists that currently do not have albums are listed.</small>
                </ModalHeader>
                {/* <AlertComponent /> */}
                <ModalBody>
                    <Table size="sm" hover style={{textAlign: "center"}}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Artist</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && artistWithNoAlbums !== null && artistWithNoAlbums.map((artistMap, index) => {
                                return (
                                    <Fragment key={index}>
                                        <tr>
                                            <th style={{verticalAlign: "middle"}}>{index + 1}</th>
                                            <td style={{verticalAlign: "middle"}}>{artistMap.artist}</td>
                                            <td style={{verticalAlign: "middle"}}>
                                                <Button color="danger" onClick={e => deleteArtist(artistMap._id)}>
                                                    <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                                                        <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                                                    </svg>
                                                </Button>
                                            </td>
                                        </tr>       
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

ArtistDeleteModal.propTypes = {
    getArtistsWithNoAlbums: PropTypes.func.isRequired,
    deleteArtist: PropTypes.func.isRequired,
    vinylCollection: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection
});

const mapDispatchToProps = {
    getArtistsWithNoAlbums,
    deleteArtist
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDeleteModal);