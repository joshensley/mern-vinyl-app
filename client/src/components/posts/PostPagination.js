import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    updatePostsCurrentPage
} from '../../actions/post';

import { 
    Pagination, 
    PaginationItem, 
    PaginationLink 
} from 'reactstrap';

const PostPagination = ({
    postsFilter,
    post: { 
        loading, 
        postsCurrentPage, 
        postsPerPage 
    },
    updatePostsCurrentPage
}) => {

    useEffect(() => {
        updatePostsCurrentPage(1);
    }, [updatePostsCurrentPage])
    

    let pagesArray = [];
    let lastPageNumber = 0;
    if(!loading) {
        lastPageNumber = Math.ceil(Number(postsFilter.length) / Number(postsPerPage));

        if(Number(postsCurrentPage) === 1 || Number(postsCurrentPage) === 2) {
            for (let i = 1; i <= 3; i++) {
                if (i > lastPageNumber) {
                    break;
                } else {
                    pagesArray.push(i);
                }
                
            }
        } else if(Number(postsCurrentPage) > 2) {
            let i = postsCurrentPage - 1;
            let number = Number(postsCurrentPage) + 1;
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
        updatePostsCurrentPage(Number(e.target.value));
    }

    const onClickPreviousPage = () => {
        if (postsCurrentPage > 1 ) {
            updatePostsCurrentPage(Number(postsCurrentPage) - 1);
        }
    }

    const onClickNextPage = () => {
        if(postsCurrentPage < lastPageNumber) {
            updatePostsCurrentPage(Number(postsCurrentPage) + 1);
        }
    }

    const onClickFirstPage = () => {
        updatePostsCurrentPage(1);
    }

    const onClickLastPage = () => {
        updatePostsCurrentPage(lastPageNumber);
    }

    return(
        <Fragment>
            <Pagination style={{justifyContent: "center"}}>
            <PaginationItem>
                <PaginationLink first onClick={onClickFirstPage} />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink previous onClick={onClickPreviousPage} />
            </PaginationItem>

            {
                postsCurrentPage !== null && postsCurrentPage > 2 ? (
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
                            active={pageNumber === postsCurrentPage ? true : false}
                        
                        >
                            <PaginationLink onClick={onClickCurrentPage} value={pageNumber}>
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
            }

            {
                postsCurrentPage !== null && postsCurrentPage < lastPageNumber - 1 && postsCurrentPage !== 1 ? (
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

PostPagination.propTypes = {
    post: PropTypes.object.isRequired,
    updatePostsCurrentPage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post
})

export default connect( mapStateToProps, { updatePostsCurrentPage } )(PostPagination);