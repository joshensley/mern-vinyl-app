import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updateArtistCurrentPage
} from '../../../actions/artistPagination';
import { 
    Pagination, 
    PaginationItem, 
    PaginationLink 
} from 'reactstrap';

const ArtistPagination = ({
    artistFilter,
    updateArtistCurrentPage, 
    vinylCollection: { loading, artist },
    artistPagination: {  
        artistCurrentPage, 
        artistPerPage 
    }
}) => { 

    let pagesArray = [];
    let lastPageNumber = 0;
    if(!loading && artist !== null) {
        lastPageNumber = Math.ceil(Number(artistFilter.length) / Number(artistPerPage));

        if(Number(artistCurrentPage) === 1 || Number(artistCurrentPage) === 2) {
            for (let i = 1; i <= 3; i++) {
                if (i > lastPageNumber) {
                    break;
                } else {
                    pagesArray.push(i);
                }
                
            }
        } else if(Number(artistCurrentPage) > 2) {
            let i = artistCurrentPage - 1;
            let number = Number(artistCurrentPage) + 1;
            for(i; i <= number ; i++) {
                if (i > lastPageNumber) {
                    break;
                } else {
                    pagesArray.push(i);
                }
                
            }
        }
    }

    const onClickCurrentPage = e => {
        updateArtistCurrentPage(Number(e.target.value));
    }

    const onClickPreviousPage = () => {
        if(artistCurrentPage > 1) {
            updateArtistCurrentPage(Number(artistCurrentPage) - 1);
        }
    }

    const onClickNextPage = () => {
        if(artistCurrentPage < lastPageNumber) {
            updateArtistCurrentPage(Number(artistCurrentPage) + 1);
        }
    }

    const onClickFirstPage = () => {
        updateArtistCurrentPage(1);
    }

    const onClickLastPage = () => {
        updateArtistCurrentPage(lastPageNumber);
    }



    return (
        <Fragment>
            <Pagination style={{justifyContent: "center"}}>
                <PaginationItem>
                    <PaginationLink first onClick={onClickFirstPage} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous onClick={onClickPreviousPage} />
                </PaginationItem>
                {
                    artistCurrentPage !== null && artistCurrentPage > 2 ? (
                        <PaginationItem disabled>
                            <PaginationLink>
                                ...
                            </PaginationLink>
                        </PaginationItem>
                    ) : ""
                }
                {
                    pagesArray.length !== 0 && pagesArray.map((pageNumber, index) => {
                        return (
                            <PaginationItem 
                                key={index}
                                active={pageNumber === artistCurrentPage ? true : false}
                            >
                                <PaginationLink onClick={onClickCurrentPage} value={pageNumber}>
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>

                        )
                    })
                }
                {
                    artistCurrentPage !== null && artistCurrentPage < lastPageNumber - 1 && artistCurrentPage !== 1 ? (
                        <PaginationItem disabled> 
                            <PaginationLink>
                                ...
                            </PaginationLink>
                        </PaginationItem>
                    ) : ""
                }
                <PaginationItem>
                    <PaginationLink next onClick={onClickNextPage} />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last onClick={onClickLastPage} />
                </PaginationItem>
            </Pagination>
        </Fragment>
    )
}

ArtistPagination.propTypes = {
    vinylCollection: PropTypes.object.isRequired,
    artistPagination: PropTypes.object.isRequired,
    updateArtistCurrentPage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    vinylCollection: state.vinylCollection,
    artistPagination: state.artistPagination
})


export default connect(mapStateToProps, { updateArtistCurrentPage })(ArtistPagination);