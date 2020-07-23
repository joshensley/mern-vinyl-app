import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getGenre } from '../../actions/genre';
import { addArtist } from '../../actions/vinylCollection';

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

const ArtistModal = ({ addArtist, getGenre, genre: { genre, loading } }) => {
  
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal)
        setGenre('');
        setArtist('');
    };

    const [genreState, setGenre] = useState('');
    const [artistState, setArtist] = useState('');

    useEffect(() => {
        getGenre();
    }, [getGenre]);
  
    return (
      <Fragment>
        <Button color="info" onClick={toggle}>Add Artist</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Artist</ModalHeader>
          <ModalBody>
            <form onSubmit={e => {
              e.preventDefault();
              addArtist({ artist: artistState, genre: genreState });
              setArtist('');
            }}> 
                <FormGroup>
                    <Label>Genre</Label>
                    <Input type="select" name="select" onChange={e => setGenre(e.target.value)}>
                        <option hidden value="">Choose Genre (required)</option>
                        <option disabled="disabled" default>Choose Genre (required)</option>
                        {
                            !loading && genre !== null && genre.map((genreMap, index) => {
                                return (
                                    <option 
                                      key={index} 
                                      value={genreMap.genre}
                                    >
                                            {genreMap.genre}
                                    </option>
                                )
                                
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label>Artist</Label>
                    <Input 
                        type="text" 
                        placeholder="Add Artist (required)"
                        value={artistState}
                        onChange={e => setArtist(e.target.value)}
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
    );
  }

ArtistModal.propTypes = {
  getGenre: PropTypes.func.isRequired,
  addArtist: PropTypes.func.isRequired,
  genre: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    genre: state.genre
})

const mapDispatchToProps = {
  getGenre,
  addArtist
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ArtistModal);