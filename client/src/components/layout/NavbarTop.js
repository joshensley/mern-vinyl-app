import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'reactstrap';

const NavbarTop = ({ auth: { isAuthenticated, loading }, logout }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const authLinks = (
        <Fragment>
            <NavItem>
                <NavLink to="/dashboard" tag={Link}>
                    Dashboard
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/forms" tag={Link}>
                    Forms
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/users">
                    Users  
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink onClick={logout} to="#!" tag={Link}>
                    <svg className="bi bi-arrow-bar-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z"/>
                        <path fillRule="evenodd" d="M6 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8zm-2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z"/>
                    </svg>{' '}
                    Logout
                </NavLink>
            </NavItem>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <NavItem>
                <NavLink tag={Link} to="/users">
                    Users  
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/login">
                    Login  
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/register">
                    Register
                </NavLink>
            </NavItem>
        </Fragment>
    );

    return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        { !loading && (<Fragment> {isAuthenticated ? authLinks : guestLinks} </Fragment>) }
                        

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Settings
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem to="/avatar" tag={Link}>
                                Edit User Avatar
                            </DropdownItem>
                            <DropdownItem>
                                Edit User Information
                            </DropdownItem>
                            <DropdownItem divider />
                            
                        </DropdownMenu>
                        </UncontrolledDropdown>
                        
                    </Nav>
                </Collapse>
            </Navbar>
    )
}


NavbarTop.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarTop);