import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { 
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    Button
} from 'reactstrap';

import {
    deleteComment
} from '../../actions/post';

const CommentItem = ({
    postId,
    comment,
    profile,
    deleteComment
}) => {

    const onClickDeleteComment = (postId, commentId) => {
        deleteComment(postId, commentId);
    }


    return (
        <Fragment>
            <Row>
                <Col md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 6, offset: 3 }}>
                    <Card body outline color="secondary">
                        <div style={{ display: "inline" }}>
                            <div style={{ display: "inline-block" }}>
                                <img
                                    src={`/api/users/${comment.user}`}
                                    alt="avatar"
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginTop: "-10px"
                                    }} />
                            </div>{' '}
                            <div style={{ display: "inline-block" }}>
                                <CardTitle style={{marginBottom:"-5px"}}>{comment.name}</CardTitle>
                                <small>Posted on <Moment format={'YYYY/MM/DD'}>{comment.date}</Moment></small>
                            </div>

                            {
                                profile.user._id === comment.user &&
                                <Fragment>
                                    <Button
                                        outline
                                        color="danger"
                                        onClick={() => onClickDeleteComment(postId, comment._id)}
                                        style={{ float: "right" }}
                                    >
                                        <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
                                            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
                                        </svg>
                                    </Button>
                                </Fragment>
                            }

                        </div>

                        <br />
                        <CardText>{comment.text}</CardText>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

CommentItem.propTypes = {
    comment: PropTypes.object,
    profile: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile.profile
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);