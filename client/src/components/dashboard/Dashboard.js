import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { clearVinylCollection } from '../../actions/vinylCollection';

import GenreModal from  '../vinylInformation/GenreModal';
import GenreDeleteModal from '../vinylInformation/GenreDeleteModal';
import ArtistModal from '../vinylInformation/ArtistModal';
import ArtistDeleteModal from '../vinylInformation/ArtistDeleteModal';
import AlbumModal from '../vinylInformation/AlbumModal';
import AlbumDeleteModal from '../vinylInformation/AlbumDeleteModal';
import SongModal from '../vinylInformation/SongModal';
import SongDeleteModal from '../vinylInformation/SongDeleteModal';

import { 
    Container,
    Jumbotron,
    Row,
    Col,
    Button,
    Spinner
} from 'reactstrap';

const Dashboard = ({ 
    getCurrentProfile,
    clearVinylCollection,
    auth: {user}, 
    profile: { profile, loading} 
}) => {

    useEffect(() => {
        clearVinylCollection();
        getCurrentProfile();
    }, [getCurrentProfile, clearVinylCollection])

    return (
       <Container>
           <Jumbotron>
               <Row>
                   <Col>

                   {
                        loading && profile === null ? 
                            <Spinner color="primary" /> : 
                            <Fragment>
                                <h1>Dashboard</h1>
                                <p>Welcome {user && user.name}</p>
                            </Fragment>
                    }

                    {
                        profile !== null ? 
                        <Fragment>has</Fragment> : 
                        <Fragment>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to="create-profile">
                                <Button>
                                    Create Profile
                                </Button>
                            </Link>
                        </Fragment>
                    }
                   </Col>
               </Row>

               <GenreModal />
               <GenreDeleteModal />
               <br></br>
               <ArtistModal />
               <ArtistDeleteModal />
               <br></br>
               <AlbumModal />
               <AlbumDeleteModal />
               <br></br>
               <SongModal />
               <SongDeleteModal />
           
           </Jumbotron>
        </Container>

    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    clearVinylCollection: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});


export default connect(mapStateToProps, { 
    getCurrentProfile, clearVinylCollection
})(Dashboard);