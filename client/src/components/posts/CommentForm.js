import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

import {
    Form,
    FormGroup,
    Input,
    Button,
    Card,
    Row,
    Col
} from 'reactstrap';

const CommentForm = ({
    postId,
    addComment
}) => {
    const [text, setText] = useState('');

    return (
        <Fragment>
            <Row>
                <Col md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 6, offset: 3 }}>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                addComment(postId, { text });
                                setText('');
                            }}
                        
                        >
                            <FormGroup>
                                <Input 
                                    type="textarea" 
                                    name="text" 
                                    placeholder="Add Comment..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)} 
                                />
                            </FormGroup>
                            <Button value="Submit" block>Submit</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}

CommentForm.propTypes = {
    postId: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm);