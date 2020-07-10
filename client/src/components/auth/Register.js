import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth'
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

const Register = ({ setAlert, register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger')
        } else {
            register({ name, email, password });
        }
    }

    // Redirect to dashboard
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <Container className="mt-3">
                <Jumbotron>
                    <Row>
                        <Col>
                            <h1 className="text-primary" style={{textAlign: "center"}}>Sign-up</h1>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            
                            <h3 className="text-dark" style={{textAlign: "center"}}>
                                <svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>{' '}
                                Create Your Account
                            </h3>
                        </Col>
                    </Row>
                    
                    <Form className="mt-2" onSubmit={e => onSubmit(e)}>
                        <Row>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Input 
                                        type="text" 
                                        name="name"
                                        value={name}
                                        placeholder="Enter Name"
                                        onChange={e => onChange(e)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
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
                                    <small>*6 or more characters</small>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <FormGroup>
                                    <Input 
                                        type="password" 
                                        name="password2"
                                        value={password2}
                                        placeholder="Verify Password" 
                                        onChange={e => onChange(e)} 
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="12" md={{ size: 4, offset: 4 }}>
                                <Button color="primary" style={{textAlign: "left"}}>
                                    Register
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                   
                    <Row className="mt-2">
                        <Col sm="12" md={{ size: 4, offset: 4 }}>
                            <small style={{textAlign: "left"}}>Already have an account? <Link to="/login">Sign-in</Link></small>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapDispatchToProps = {
    setAlert,
    register
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);