import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { 
    Container,
    Jumbotron,
    Row,
    Col,
    Button
} from 'reactstrap';
import { connect } from 'react-redux';


const Landing = ({ isAuthenticated }) => {

    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <Fragment>
            <Container className="mt-5">
                <Jumbotron>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }} >
                            <h1 style={{textAlign: "center"}}>
                                Vinylify
                            </h1>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col sm="12" md={{ size: 6, offset: 3 }} >
                            <h4 style={{textAlign: "center"}}>
                               Catalog Your Music
                            </h4>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col style={{textAlign: "right"}}>
                            <Link to="/login">
                                <Button color="primary" size="lg">
                                    Login
                                </Button>
                            </Link>
                        </Col>
                        <Col style={{textAlign: "left"}}>
                            <Link to="/register">
                                <Button color="secondary" size="lg">
                                    Register
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    
                </Jumbotron>
            </Container>
        </Fragment>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);