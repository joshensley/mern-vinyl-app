import React from 'react';
import { Link } from 'react-router-dom';

import {
    Card, 
    Button, 
    CardImg, 
    CardTitle,
    CardSubtitle, 
    CardBody,
  } from 'reactstrap';

const AlbumsCard = ({
    _id,
    user,
    artistId,
    albumsMap,
}) => {

    const albumCoverUrl = `/api/vinyl-collection/get-album-cover/${artistId}/${albumsMap._id}`

    return (
        <Card>
            <CardImg top width="70%" src={albumCoverUrl} alt="Card image cap" />
            <CardBody style={{textAlign:"center"}}>
                <CardTitle style={{ fontSize:"24px"}}>{albumsMap.title} ({albumsMap.releaseYear})</CardTitle>
                <CardSubtitle>Songs</CardSubtitle>
                <br/>
                <Link to={{ pathname: `/songs/${user}/${_id}/${albumsMap._id}` }}>
                    <Button color="info" block>View Songs</Button>
                </Link>
            </CardBody>
        </Card>
    )
}

export default AlbumsCard;