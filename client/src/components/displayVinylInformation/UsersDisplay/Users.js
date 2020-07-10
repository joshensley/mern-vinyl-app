import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { 
  getAllProfiles  
} from '../../../actions/profile';

import { 
  clearVinylCollection 
} from '../../../actions/vinylCollection'

import UserCard from './UserCard';

import {
  Row,
  Col,
  Container,
  Jumbotron,
  Spinner
} from 'reactstrap';


const Users = ({ 
  getAllProfiles,
  clearVinylCollection,
  profile: { profiles }
}) => {

  useEffect(() => {
    clearVinylCollection();
    getAllProfiles();
    
  }, [getAllProfiles, clearVinylCollection]);

  return (
    <Container>
      <Jumbotron>
        <Row>
            {
              profiles ? profiles.map((profile, index) => {
                return (
                  <Fragment key={index}>
                    <Col md={{size: 4}}>
                      <UserCard profile={profile} />
                    </Col>
                  </Fragment>
                )
              }) : <Spinner />
            }
        </Row>
      </Jumbotron>
    </Container>
  );
};

Users.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  clearVinylCollection: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {
  getAllProfiles,
  clearVinylCollection
})(Users);