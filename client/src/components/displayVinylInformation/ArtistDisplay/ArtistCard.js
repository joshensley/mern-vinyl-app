import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

import {
    Card, 
    Button, 
    CardTitle, 
    CardText, 
    CardSubtitle, 
    CardBody,
  } from 'reactstrap';

const ArtistCard = ({ artistMap }) => {

    const { artist, genre, albums, user, _id } = artistMap;

    return (
        <Card>
            <Carousel albums={albums} artistId={_id} />
            <CardBody style={{textAlign:"center"}}>
                <CardTitle style={{ fontSize:"24px"}}>{artist}</CardTitle>
                <div style={{display:"inline"}}>
                    <CardSubtitle 
                        style={{display:"inline-block"}}>
                            {genre}
                    </CardSubtitle>
                    {' | '}
                    <CardText 
                        style={{display:"inline-block"}}>
                            Albums: {albums.length}
                    </CardText>
                </div>
               <br/>
               <br/>
                <Link to={{ pathname: `/albums/${user}/${_id}` }}>
                    <Button color="info" block>View Albums</Button>
                </Link>
            </CardBody>
        </Card>
    )
}

export default ArtistCard;