import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
    Container,
    Jumbotron,
    Row,
    Col, 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Card,
    CardTitle, 
    CardText
} from 'reactstrap';
// import { clearGenres } from '../../actions/genre';
import { clearVinylCollection } from '../../actions/vinylCollection';

import GenreModal from '../vinylInformation/GenreModal';
import GenreDeleteModal from '../vinylInformation/GenreDeleteModal';
import ArtistModal from '../vinylInformation/ArtistModal';
import ArtistDeleteModal from '../vinylInformation/ArtistDeleteModal';
import AlbumModal from '../vinylInformation/AlbumModal';
import AlbumDeleteModal from '../vinylInformation/AlbumDeleteModal';
import SongModal from '../vinylInformation/SongModal';
import SongDeleteModal from '../vinylInformation/SongDeleteModal';

const VinylForms = ({
    clearVinylCollection,
    clearGenres
}) => {

    useEffect(() => {
        // clearGenres();
        clearVinylCollection();
    }, [ clearVinylCollection, clearGenres])

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <Container>
            <Jumbotron>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Genre
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Artist
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Album
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '4' })}
                            onClick={() => { toggle('4'); }}
                        >
                            Songs
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Add Genre</CardTitle>
                                    <CardText>A genre must either first exist or be created to add an artist.</CardText>
                                    <GenreModal />
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Delete Genre</CardTitle>
                                    <CardText>Genres can be deleted here if needed.</CardText>
                                    <GenreDeleteModal />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Add Artist</CardTitle>
                                    <CardText>An artist must be created to add albums.</CardText>
                                    <ArtistModal />
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Delete Artist</CardTitle>
                                    <CardText>Artist that don't contain albums will be shown for removal.</CardText>
                                    <ArtistDeleteModal />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Add Album</CardTitle>
                                    <CardText>An album must be created to add songs.</CardText>
                                    <AlbumModal />
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Delete Album</CardTitle>
                                    <CardText>Albums can be deleted here if needed.</CardText>
                                    <AlbumDeleteModal />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="4">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Add Songs</CardTitle>
                                    <CardText>Songs can be created here if needed.</CardText>
                                    <SongModal />
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Delete Songs</CardTitle>
                                    <CardText>Songs can be deleted here if needed.</CardText>
                                    <SongDeleteModal />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Jumbotron>
        </Container>

    )
}

VinylForms.propTypes = {
    clearVinylCollection: PropTypes.func.isRequired,
    // clearGenres: PropTypes.func.isRequired
}

export default connect(null, { 
    clearVinylCollection, 
    // clearGenres 
})(VinylForms);