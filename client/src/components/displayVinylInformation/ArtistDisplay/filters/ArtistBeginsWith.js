import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    beginsWith
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

const ArtistBeginsWith = ({ beginsWith, resetCurrentPage }) => {

    const alpha = [
        'A','B','C','D','E',
        'F','G','H','I','J',
        'K','L','M','N','O',
        'P','Q','R','S','T',
        'U','V','W','X','Y',
        'Z','1','2','3','4',
        '5','6','7','8','9','0'
    ]

    const onChangeBeginsWith = (e) => {
        e.preventDefault();
        resetCurrentPage();
        beginsWith(e.target.value);
        
    }

    return (
        <Fragment>
            <FormGroup>
                <Row>
                    <Col style={{textAlign:"center"}}>
                        <Label style={{color:"black"}}>Begins With</Label>
                    </Col>
                    <Col>
                        <Input
                            type="select"
                            name="select"
                            onChange={onChangeBeginsWith}
                        >
                            <option hidden>Select</option>
                            <option value="All">All</option>
                            {
                                alpha.map((letter, index) => {
                                    return (
                                        <Fragment key={index}>
                                             <option value={letter}>{letter}</option>
                                        </Fragment>
                                    )
                                })
                            }
                        </Input>
                    </Col>
                </Row>
            </FormGroup>
        </Fragment>
    )
}

ArtistBeginsWith.propTypes = {
    beginsWith: PropTypes.func.isRequired,
    resetCurrentPage: PropTypes.func.isRequired
}

export default connect(null, { beginsWith, resetCurrentPage })(ArtistBeginsWith);