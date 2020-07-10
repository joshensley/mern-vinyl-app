import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { 
    Container,
    Jumbotron,
    Form,
    FormGroup,
    Input,
    Row,
    Col,
    Button
} from 'reactstrap';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login({ email, password });
    }

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <Container className="mt-3">
                <Jumbotron>
                    <Row>
                        <Col>
                            <h1 className="text-primary" style={{textAlign: "center"}}>Sign In</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            
                            <h3 className="text-dark" style={{textAlign: "center"}}>
                                <svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>{' '}
                                Sign Into Your Account
                            </h3>
                        </Col>
                    </Row>
                    
                    <Form className="mt-2" onSubmit={e => onSubmit(e)}>
                        <Row>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Input 
                                        type="email" 
                                        name="email"
                                        value={email}
                                        placeholder="Enter Email" 
                                        onChange={e => onChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Input 
                                        type="password" 
                                        name="password"
                                        value={password}
                                        placeholder="Enter Password" 
                                        onChange={e => onChange(e)} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <Button color="primary" style={{textAlign: "left"}}>
                                    Login
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    
                    <Row className="mt-2">
                        <Col sm="12" md={{ size: 4, offset: 4 }}>
                            <small style={{textAlign: "left"}}>Don't have an account? <Link to="/register">Sign Up</Link></small>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapDispatchToProps = {
    login
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);