import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import {
    Card, 
    Button, 
    CardImg, 
    CardTitle, 
    CardText, 
    CardSubtitle, 
    CardBody,
  } from 'reactstrap';

const UserCard = ({ profile }) => {
    
    const photoUrl = profile.user._id ? `/api/users/${profile.user._id}`: ""
    
    return (
        <Card>
            <CardImg top width="70%" src={photoUrl} alt="Card image cap" />
            <CardBody>
                <CardTitle>{profile.user.name}</CardTitle>
                <CardSubtitle>{profile.location}</CardSubtitle>
                <CardText>{profile.bio}</CardText>
                <Link to={{ pathname: `/artist/${profile.user._id}` }}>
                    <Button>Button</Button>
                </Link>
                
            </CardBody>
        </Card>
    )
}

UserCard.propTypes = {
    profile: PropTypes.object.isRequired,
    
}

export default connect(null)(UserCard);