import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    sortArtist
} from '../../../../actions/artistQuery';

import {
    FormGroup,
    Label,
    Input,
    Row, 
    Col
} from 'reactstrap'; 

const ArtistSort = ({ 
    sortArtist
}) => {

    const onChangeSortArtist = (e) => {
        e.preventDefault();
        sortArtist(e.target.value);
    }
    return (
        <Fragment>
            <FormGroup>
                <Row>
                    <Col style={{textAlign:"center"}}>
                        <Label style={{color:"black"}}>Sort</Label>
                    </Col>
                    <Col>
                        <Input
                            type="select"
                            name="select"
                            onChange={onChangeSortArtist}
                        >
                            <option hidden value="">Select</option>
                            <option value="AZ">A to Z</option>
                            <option value="ZA">Z to A</option>
                            <option value="mostAlbums">Most Albums</option>
                        </Input>
                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    ) 
}

ArtistSort.propTypes = {
    sortArtist: PropTypes.func.isRequired
}



export default connect( null, { sortArtist })(ArtistSort);