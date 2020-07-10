import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateArtistPerPage
} from '../../../../actions/artistPagination';

import {
    FormGroup,
    Label,
    Input,
    Row, 
    Col
} from 'reactstrap';


const ArtistPerPage = ({ updateArtistPerPage }) => {

    const onChangeArtistPerPage = (e) => {
        updateArtistPerPage(e.target.value);
    }
    
    return (
        <Fragment>
            <FormGroup>
                <Row>
                    <Col>
                        <Label>Per Page:</Label>
                    </Col>
                    <Col>
                    <Input 
                        type="select" 
                        name="select"
                        onChange={onChangeArtistPerPage}
                    >
                        <option hidden value="">Select</option>
                        <option value={3}>3</option>
                        <option value={9}>9</option>
                        <option value={18}>18</option>
                        <option value={27}>27</option>
                    </Input>

                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    )
}

ArtistPerPage.propTypes = {
    updateArtistPerPage: PropTypes.func.isRequired
}

export default connect(null, { updateArtistPerPage })(ArtistPerPage);
