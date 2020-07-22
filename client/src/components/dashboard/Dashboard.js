import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { clearVinylCollection } from '../../actions/vinylCollection';
import DashboardActions from './DashboardActions';

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
                   <Col style={{textAlign:"center"}}>

                   {
                        loading && profile === null ? 
                            <Spinner color="primary" /> : 
                            <Fragment>
                                <h1>Dashboard</h1>
                                <p>Welcome {user && user.name}</p>
                            </Fragment>
                    }

                    {
                        !loading && profile !== null ? 
                        <Fragment>
                            <DashboardActions />
                        </Fragment> : 
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