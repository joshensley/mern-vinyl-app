import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Pagination, 
    PaginationItem, 
    PaginationLink 
} from 'reactstrap';

import {
    updateProfileCurrentPage
} from '../../../actions/profile';


const UserPagination = ({
    profilesFilter,
    updateProfileCurrentPage,
    profile: {
        profiles, 
        profilesCurrentPage,
        profilesPerPage,
        loading
    }
}) => {

    let pagesArray = [];
    let lastPageNumber = 0;
    if(!loading && profiles !== null) {
        lastPageNumber = Math.ceil(Number(profilesFilter.length) / Number(profilesPerPage));

        if(Number(profilesCurrentPage) === 1 || Number(profilesCurrentPage) === 2) {
            for (let i = 1; i <= 3; i++) {
                if (i > lastPageNumber) {
                    break;
                } else {
                    pagesArray.push(i);
                }
                
            }
        } else if(Number(profilesCurrentPage) > 2) {
            let i = profilesCurrentPage - 1;
            let number = Number(profilesCurrentPage) + 1;
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
        updateProfileCurrentPage(Number(e.target.value));
    }

    const onClickPreviousPage = () => {
        if (profilesCurrentPage > 1) {
            updateProfileCurrentPage(Number(profilesCurrentPage - 1))
        }
    }

    const onClickNextPage = () => {
        if(profilesCurrentPage < lastPageNumber) {
            updateProfileCurrentPage(Number(profilesCurrentPage + 1))
        }
    }

    const onClickFirstPage = () => {
        updateProfileCurrentPage(1)
    }
    const onClickLastPage = () => {
        updateProfileCurrentPage(lastPageNumber);
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
                    profilesCurrentPage !== null && profilesCurrentPage > 2 ? (
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
                                active={pageNumber === profilesCurrentPage ? true : false}
                            >
                                <PaginationLink onClick={onClickCurrentPage} value={pageNumber}>
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>

                        )
                    })
                }

                {
                    profilesCurrentPage !== null && profilesCurrentPage < lastPageNumber - 1 && profilesCurrentPage !== 1 ? (
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

UserPagination.propTypes = {
    updateProfileCurrentPage: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    profilesFilter: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { updateProfileCurrentPage })(UserPagination);