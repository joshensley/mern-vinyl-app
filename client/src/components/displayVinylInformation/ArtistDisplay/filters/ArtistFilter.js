import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Collapse, 
    Button,
    ListGroup,
    ListGroupItem,
    Col,
    Row
} from 'reactstrap';

import ArtistPerPage from './ArtistPerPage';
import ArtistGenre from './ArtistGenre';
import ArtistSort from './ArtistSort';
import ArtistBeginsWith from './ArtistBeginsWith';
import ArtistSearch from './ArtistSearch';

import { 
    clearGenre,
    clearBeginsWith,
    clearSearchArtist
} from '../../../../actions/artistQuery';

const ArtistFilter = ({
    clearGenre,
    clearBeginsWith,
    clearSearchArtist,
    artistQuery: { genre, beginsWith, searchArtist }
    
}) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const onClickClearGenre = () => {
        clearGenre();
    }

    const onClickClearBeginsWith = () => {
        clearBeginsWith();
    }

    const onClickClearSearchArtist = () => {
        clearSearchArtist();
    }

    return (
        <Fragment>
            <Row>
               
                <Col xs="12" sm="12" style={{textAlign: "center", display:"inline-block"}}>
                    <Button 
                        color="primary" 
                        size="sm"
                        onClick={toggle} 
                        style={{ marginBottom: '1rem', display: "inline" }}
                        >
                           <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-filter-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM3.5 5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
                            </svg>{' '}
                            Filters
                    </Button>{' '}

                    {
                        genre !== "" &&
                        <Fragment>
                            <Button 
                                style={{ 
                                    marginBottom: '1rem', 
                                    display: "inline" }}
                                onClick={onClickClearGenre}
                                size="sm"
                                color="warning"
                                >
                                Clear: {genre}
                            </Button>{' '}
                        </Fragment>
                    }
                    
                    {
                        beginsWith !== "All" &&
                            <Fragment>
                            <Button
                                style={{ 
                                    marginBottom: '1rem', 
                                    display: "inline" }}
                                onClick={onClickClearBeginsWith}
                                size="sm"
                                color="warning"
                            >
                                Clear: {beginsWith}
                            </Button>{' '}
                        </Fragment>
                    }

                    {
                        searchArtist !== "" &&
                            <Fragment>
                            <Button
                                style={{ 
                                    marginBottom: '1rem', 
                                    display: "inline" }}
                                onClick={onClickClearSearchArtist}
                                size="sm"
                                color="warning"
                            >
                                Clear: {searchArtist}
                            </Button>{' '}
                        </Fragment>
                    }
               </Col>
            </Row>
            
            <Collapse isOpen={isOpen}>
                <ListGroup>
                    <ListGroupItem>
                        <ArtistSearch />
                    </ListGroupItem>
                    <ListGroupItem>
                        <ArtistBeginsWith />
                    </ListGroupItem>
                    <ListGroupItem>
                        <ArtistSort />
                    </ListGroupItem>
                    <ListGroupItem>
                        <ArtistGenre />
                    </ListGroupItem>
                    <ListGroupItem>
                        <ArtistPerPage />
                    </ListGroupItem>
                </ListGroup>
            </Collapse>
            <br></br>
        </Fragment>
    )
}

ArtistFilter.propTypes = {
    clearGenre: PropTypes.func.isRequired,
    clearBeginsWith: PropTypes.func.isRequired,
    clearSearchArtist: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    artistQuery: state.artistQuery
})


export default connect(mapStateToProps, { 
    clearGenre, 
    clearBeginsWith,
    clearSearchArtist
})(ArtistFilter);