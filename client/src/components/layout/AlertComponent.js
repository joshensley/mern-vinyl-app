import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Container } from 'reactstrap';


const AlertComponent = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <Container key={alert.id} className="mt-3">
            <Alert color={alert.alertType}>
                {alert.msg}
            </Alert>
        </Container>
));

AlertComponent.propTypes = {
    alert: PropTypes.object
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(AlertComponent);