import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGenre } from '../../actions/genre';

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

const GenreModal = ({ addGenre }) => {
  
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [genre, setGenre] = useState('');

    return (
      <Fragment>
        <Button color="info" onClick={toggle}>Add Genre</Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Add Genre</ModalHeader>
          <ModalBody>
            <form onSubmit={e => {
              e.preventDefault();
              addGenre({ genre });
              setGenre('');
            }}> 
              <FormGroup>
                <Label>Genre</Label>
                <Input 
                  type="text" 
                  placeholder="Add Genre (required)"
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
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

GenreModal.propTypes = {
  addGenre: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addGenre
}
  
export default connect(null, mapDispatchToProps)(GenreModal);