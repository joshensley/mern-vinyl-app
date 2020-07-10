import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGenre, removeGenre } from '../../actions/genre';

import { 
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody,
    Table
} from 'reactstrap';

const GenreDeleteModal = ({ 
    getGenre, 
    removeGenre, 
    genre: { genre, loading} 
}) => {
  
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);

        if(!modal) {
            getGenre();
        }
    }

    // Sorts genre alphabetically
    if(genre !== null && !loading) {
        genre.sort(function(a, b){
            if(a.genre < b.genre) { return -1; }
            if(a.genre > b.genre) { return 1; }
            return 0;
        })
    }

    
    return (
      <Fragment>
        <Button color="info" onClick={toggle}>Delete Genre</Button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Delete Genre</ModalHeader>
            <ModalBody>
                <Table size="sm" hover style={{textAlign: "center"}}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Genre</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading && genre !== null && genre.map((genreMap, index) => {
                            return (
                                <Fragment key={index}>
                                    <tr>
                                        <th style={{verticalAlign: "middle"}}>{index + 1}</th>
                                        <td style={{verticalAlign: "middle"}}>{genreMap.genre}</td>
                                        <td style={{verticalAlign: "middle"}}>
                                            <Button color="danger" onClick={e => removeGenre(genreMap._id)}>
                                            
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
    );
  }

GenreDeleteModal.propTypes = {
    getGenre: PropTypes.func.isRequired,
    removeGenre: PropTypes.func.isRequired,
    genre: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    genre: state.genre
})

const mapDispatchToProps = {
    getGenre,
    removeGenre
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreDeleteModal);