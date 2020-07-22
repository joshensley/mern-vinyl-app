import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getCurrentProfile,
    editUserAvatar
} from '../../actions/profile'

import {
    Container,
    Jumbotron,
    Row,
    Col,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

const EditUserAvatar = ({ profile, getCurrentProfile, editUserAvatar }) => {

    const [file, setFile] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', file);
        editUserAvatar(formData);
        getCurrentProfile();

        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    }

    let photoUrl = "";
    if(profile) {
        photoUrl = profile.user._id ? `/api/users/${profile.user._id}` : "";
    }

    return (
        <Container>
            <Jumbotron>
                <Row>
                    <Col>
                        <div style={{textAlign: "center"}}>
                            <h1>Edit User Avatar</h1>
                            <img 
                                src={photoUrl} 
                                alt="Avatar" 
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                    
                                }}
                            />
                        </div>
                    </Col>
                </Row> 
                <hr/>
                <br/>  
                <Row>
                    <Col 
                        xs={{size:12}} 
                        sm={{size:12}} 
                        md={{offset:2, size:5}} 
                        lg={{offset:4, size:4}} 
                        xl={{offset:4, size:4}}
                    >
                        <form 
                            encType="multipart/form-data"
                            onSubmit={onSubmit}
                        >
                            <FormGroup>
                            <div style={{textAlign: "center", margin: "auto"}}>
                                <Input 
                                    color="info"
                                    type="file" 
                                    name="file" 
                                    id="file"
                                    onChange={onChange}
                                >
                                </Input> 
                            </div>  
                            </FormGroup>
                            <Button color="primary" type="submit" value="submit">
                                Submit
                            </Button>
                           
                        </form>
                    </Col>
                </Row>
            </Jumbotron>
        </Container>
    )
}

EditUserAvatar.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    editUserAvatar: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, { editUserAvatar, getCurrentProfile })(EditUserAvatar);