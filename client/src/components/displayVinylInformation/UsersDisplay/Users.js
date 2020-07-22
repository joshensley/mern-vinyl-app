import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  getAllProfiles,
  resetSearchProfile  
} from '../../../actions/profile';
import { 
  clearVinylCollection 
} from '../../../actions/vinylCollection'
import UserCard from './UserCard';
import UserPagination from './UserPagination';
import UserSearch from './UserSearch';

import {
  Row,
  Col,
  Container,
  Jumbotron,
  Spinner
} from 'reactstrap';


const Users = ({ 
  resetSearchProfile,
  getAllProfiles,
  clearVinylCollection,
  profile: { 
    profiles,
    profilesCurrentPage,
    profilesPerPage,
    profilesSearch,
    loading
  }
}) => {

  useEffect(() => {
    resetSearchProfile();
    clearVinylCollection();
    getAllProfiles();
    
  }, [getAllProfiles, clearVinylCollection, resetSearchProfile]);

  const indexOfLastProfile = profilesCurrentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  let currentProfiles = "";
  if(!loading && profiles !== null) {

    // Searches the profiles
    if (profilesSearch !== "") {
      
      let profilesSearchLowerCase = profilesSearch.toLowerCase();
      profiles = profiles.filter( profile => {
          let profilesLowerCase = profile.user.name.toLowerCase();
          return  profilesLowerCase.indexOf(profilesSearchLowerCase) > -1

      })  
    }

    currentProfiles = profiles.slice(indexOfFirstProfile, indexOfLastProfile);
  }


  return (
    <Container>
      <Jumbotron>
        <h1 style={{textAlign:"center"}}>User Search</h1>
        <UserSearch />
        <UserPagination profilesFilter={profiles} />
        <Row>
            {
              profiles && !loading ? currentProfiles.map((profile, index) => {
                return (
                  <Fragment key={index}>
                    <Col sm={{size: 6}} md={{size: 4}}>
                      <UserCard profile={profile} />
                      <br/>
                    </Col>
                  </Fragment>
                )
              }) : <Spinner />
            }
        </Row>
        <br />
        <UserPagination profilesFilter={profiles} />
      </Jumbotron>
    </Container>
  );
};

Users.propTypes = {
  resetSearchProfile: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  clearVinylCollection: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {
  resetSearchProfile,
  getAllProfiles,
  clearVinylCollection
})(Users);