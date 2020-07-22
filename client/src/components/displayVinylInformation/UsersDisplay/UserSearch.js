import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import {
    searchProfile,
    resetCurrentPage
} from '../../../actions/profile';

import {
    FormGroup,
    Input,
    Row, 
    Col
} from 'reactstrap';

const UserSearch = ({
    searchProfile,
    resetCurrentPage,
    profile: { profilesCurrentPage }
}) => {

    const onChangeProfileSearch = (e) => {
        e.preventDefault()
        if(profilesCurrentPage !== 1) {
            resetCurrentPage();
        }
        searchProfile(e.target.value);
    }

    return (
        <Fragment>
            <FormGroup>
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Input
                            type="text"
                            onChange={onChangeProfileSearch}
                            placeholder="Search for users"
                        >
                        </Input>
                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    ) 
}

UserSearch.propTypes = {
    searchProfile: PropTypes.func.isRequired,
    resetCurrentPage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { searchProfile, resetCurrentPage})(UserSearch);