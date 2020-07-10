import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    searchArtist
} from '../../../../actions/artistQuery';
import {
    resetCurrentPage
} from '../../../../actions/artistPagination';

import {
    FormGroup,
    Label,
    Input,
    Row, 
    Col
} from 'reactstrap';

const ArtistSearch = ({ 
    searchArtist, 
    resetCurrentPage,
    artistPagination: { artistCurrentPage }
}) => {

    const onChangeArtistSearch = (e) => {
        e.preventDefault()
        if(artistCurrentPage !== 1) {
            resetCurrentPage();
        }
        searchArtist(e.target.value);
    }

    return (
        <Fragment>
            <FormGroup>
                <Row>
                    <Col>
                        <Label>Search</Label>
                    </Col>
                    <Col>
                        <Input
                            type="text"
                            onChange={onChangeArtistSearch}
                        >
                        </Input>
                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    )
}

ArtistSearch.propTypes = {
    searchArtist: PropTypes.func.isRequired,
    resetCurrentPage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    artistPagination: state.artistPagination
}) 

export default connect(mapStateToProps, { searchArtist, resetCurrentPage })(ArtistSearch);