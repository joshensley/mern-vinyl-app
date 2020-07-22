import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    Button
} from 'reactstrap';

const DashboardActions = () => {
    return (
        <Fragment>
            <Link to="edit-profile">
                <Button>
                    Edit Profile
                </Button>
            </Link>
        </Fragment>
    )
}

export default DashboardActions;