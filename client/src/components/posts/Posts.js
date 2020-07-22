import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostsForm from './PostsForm';
import PostItem from './PostItem';
import { 
    clearPosts,
    getPostsByUserId 
} from '../../actions/post';

import PostPagination from './PostPagination';

import {
    Container,
    Jumbotron,
    Spinner,
    Col,
    Row
} from 'reactstrap';

const Posts = ({ 
    clearPosts,
    getPostsByUserId, 
    post: {
        posts,
        postsCurrentPage,
        postsPerPage,
        loading
    },
    profile,
    match
}) => {

    useEffect(() => {
        clearPosts();
        getPostsByUserId(match.params.userId);
    }, [match, getPostsByUserId, clearPosts]);

    const indexOfLastPost = postsCurrentPage * postsPerPage;
    const indexOfFirstPost= indexOfLastPost - postsPerPage;

    let currentPosts = "";
    if(!loading && posts.length > 0) {
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    }

    return (
        <Fragment>
            <Container>
                <Jumbotron>
                    {
                        loading ? 

                        <div style={{textAlign:"center"}}><Spinner /></div> :
                        <div>
                            
                            { match.params.userId === profile.user._id && <PostsForm /> } 

                            { currentPosts.length > 0 && (
                                <div>
                                    <br />
                                        <PostPagination postsFilter={posts} />
                                    <br />
                                </div>
                            )}
                            
                            {
                                currentPosts.length > 0 ?
                                    currentPosts.map(post => (
                                        <div key={post._id}>
                                            <PostItem post={post} />
                                            <br />
                                        </div>))
                                        :
                                        <Row>
                                            <Col className="text-center">
                                                <br/>
                                                User has not posted yet
                                            </Col>
                                        </Row>
                            }

                            { currentPosts.length > 0 && (
                                <div>
                                    <br />
                                        <PostPagination postsFilter={posts} />
                                    <br />
                                </div>
                            )}
                        </div>     
                    }
                </Jumbotron>
            </Container>
        </Fragment>
    )
}

Posts.propTypes = {
    match: PropTypes.object.isRequired,
    clearPosts: PropTypes.func.isRequired,
    getPostsByUserId: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    profile: state.profile.profile
})

export default connect(mapStateToProps, { getPostsByUserId, clearPosts })(Posts);
