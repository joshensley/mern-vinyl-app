import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    Card, 
    Button, 
    CardImg, 
    CardTitle,
    CardBody,
  } from 'reactstrap';

const UserCard = ({ 
    profile,
    isAuth
}) => {
    
    const photoUrl = profile.user._id ? `/api/users/${profile.user._id}`: ""
    
    return (
        <Card>
            <br/>
            <div style={{textAlign:"center"}}>
                <CardImg 
                    top  
                    src={photoUrl} 
                    alt="Card image cap"
                    style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />
            </div>
            
            <CardBody style={{textAlign:"center"}}>
                <CardTitle style={{fontSize:"20px"}}>{profile.user.name}</CardTitle>

                { profile.social !== undefined && (
                    Object.keys(profile.social).map(social => {
                        switch(social) {
                            case "youtube":
                                return (
                                    <a href={profile.social[social]} target="_blank" rel="noopener noreferrer">
                                        <i style={{padding:"10px"}} className="fa fa-youtube" ariaHidden="true"></i>
                                    </a>
                                )
                            case "twitter":
                                return (
                                    <a href={profile.social[social]} target="_blank" rel="noopener noreferrer">
                                        <i style={{padding:"10px"}} className="fa fa-twitter" ariaHidden="true"></i>
                                    </a>
                                )
                            case "facebook":
                                return (
                                    <a href={profile.social[social]} target="_blank" rel="noopener noreferrer">
                                        <i style={{padding:"10px"}} className="fa fa-facebook-official" ariaHidden="true"></i>
                                    </a>
                                )
                            case "linkedin":
                                return (
                                    <a href={profile.social[social]} target="_blank" rel="noopener noreferrer">
                                        <i style={{padding:"10px"}} className="fa fa-linkedin" ariaHidden="true"></i>
                                    </a>
                                )
                            case "instagram":
                                return (
                                    <a href={profile.social[social]} target="_blank" rel="noopener noreferrer">
                                        <i style={{padding:"10px"}} className="fa fa-instagram" ariaHidden="true"></i>
                                    </a>
                                )
                            default:
                                return ""
                        }
                    })
                )}

                <br />
                <Link to={{ pathname: `/artist/${profile.user._id}` }}>
                    <Button block outline color="primary">View Vinyl</Button>
                </Link>
                <br />
                { isAuth && (
                    <Link to={{ pathname: `/posts/${profile.user._id}` }}>
                        <Button block outline color="primary">View Posts</Button>
                    </Link>
                )}
                
            </CardBody>
        </Card>
    )
}

UserCard.propTypes = {
    profile: PropTypes.object.isRequired,
    isAuth: PropTypes.object
}

const mapStateToProps = state => ({
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(UserCard);