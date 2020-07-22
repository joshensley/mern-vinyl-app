import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';

import {
    Container,
    Jumbotron,
    Form,
    FormGroup,
    Input,
    Button,
    Col
} from 'reactstrap';


const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        website: '',
        location: '',
        bio: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: ''
    });

    const {
        website,
        location,
        bio,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram
    } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment>
            <Container>
                <Jumbotron>
                <Col xs={{offset:1, size:10}} sm={{offset:1, size:10}} md={{offset:3, size:6}}>
                    <div style={{textAlign:"center"}}>
                        <h1>Create Profile</h1>
                    </div>
                    <br/>

                    <Form onSubmit={e => onSubmit(e)}>
                        <FormGroup>
                            <Input 
                                placeholder="Website"
                                type="text" 
                                name="website" 
                                value={website}
                                onChange={onChange}
                            />
                            <small>Your personal website</small>
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                placeholder="Location"
                                type="text" 
                                name="location" 
                                value={location}
                                onChange={onChange}
                            />
                            <small>Your current location (required)</small>
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                placeholder="Bio"
                                type="text" 
                                name="bio" 
                                value={bio}
                                onChange={onChange}
                            />
                            <small>Write a little about yourself</small>
                        </FormGroup>
                        <FormGroup>
                            <div style={{display:"flex"}}>
                                <i style={{padding:"10px"}} className="fa fa-youtube" ariaHidden="true"></i>
                                <Input 
                                    placeholder="youtube"
                                    type="text" 
                                    name="youtube" 
                                    value={youtube}
                                    onChange={onChange}
                                />
                            </div>
                            <small>Your youtube account</small>
                        </FormGroup>
                        <FormGroup>
                            <div style={{display:"flex"}}>
                                <i style={{padding:"10px"}} className="fa fa-twitter" ariaHidden="true"></i>
                                <Input 
                                    placeholder="twitter"
                                    type="text" 
                                    name="twitter" 
                                    value={twitter}
                                    onChange={onChange}
                                />
                            </div>
                            <small>Your twitter account</small> 
                        </FormGroup>
                        <FormGroup>
                            <div style={{display:"flex"}}>
                                <i style={{padding:"10px"}} className="fa fa-facebook-official" ariaHidden="true"></i>
                                <Input 
                                    placeholder="facebook"
                                    type="text" 
                                    name="facebook" 
                                    value={facebook}
                                    onChange={onChange}
                                />
                            </div>
                            <small>Your facebook account</small>
                        </FormGroup>
                        <FormGroup>
                            <div style={{display:"flex"}}>
                                <i style={{padding:"10px"}} className="fa fa-linkedin" ariaHidden="true"></i>
                                <Input 
                                    placeholder="linkedin"
                                    type="text" 
                                    name="linkedin" 
                                    value={linkedin}
                                    onChange={onChange}
                                />
                                
                            </div> 
                            <small>Your linkedin account</small>    
                        </FormGroup>
                        <FormGroup>
                            <div style={{display:"flex"}}>
                                <i style={{padding:"10px"}} className="fa fa-instagram" ariaHidden="true"></i>
                                <Input 
                                    placeholder="instagram"
                                    type="text" 
                                    name="instagram" 
                                    value={instagram}
                                    onChange={onChange}
                                />
                                
                            </div>
                            <small>Your instagram account</small>
                        </FormGroup>
                        
                        <Button 
                            type="submit"
                            color="primary"
                        >
                            Submit
                        </Button>
                        
                    </Form>
                    </Col>
                </Jumbotron>
            </Container>
        </Fragment>
    )
        
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile));