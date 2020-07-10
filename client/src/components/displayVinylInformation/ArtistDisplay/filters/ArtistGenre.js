import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    changeGenre
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


const ArtistGenre = ({
    genre,
    changeGenre,
    resetCurrentPage
}) => {

    const onChangeGenre = (e) => {
        e.preventDefault()
        resetCurrentPage();
        changeGenre(e.target.value);
       
    }

    return (
        <Fragment>
            <FormGroup>
                <Row>
                    <Col>
                        <Label>Genre</Label>
                    </Col>
                    <Col>
                    <Input 
                        type="select" 
                        name="select"
                        onChange={onChangeGenre}
                    >
                        <option hidden value="">Select</option>
                        <option value="">All</option>
                        {
                            genre.genre !== null && genre.genre.map( genreMap => {
                                return (
                                    <Fragment key={genreMap._id}>
                                        <option
                                            value={genreMap.genre}
                                        >
                                            {genreMap.genre}
                                        </option>
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

const mapStateToProps = state => ({
    userId: state.profile,
    genre: state.genre
})

ArtistGenre.propTypes = {
    userId: PropTypes.object.isRequired,
    genre: PropTypes.object.isRequired,
    changeGenre: PropTypes.func.isRequired,
    resetCurrentPage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { changeGenre, resetCurrentPage })(ArtistGenre);