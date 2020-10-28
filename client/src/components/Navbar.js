import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '/Users/melissa/Desktop/InventoryManagementApp/client/src/actions/index.action';


class Navbar extends Component {
    constructor(props) {
        super(props); 
        this.signOut = this.signOut.bind(this);
    }

    // A function to call signOut actioncreator and redirect to home page.
    signOut() {
        this.props.signOut();
        window.location = '/';
    }

    render() {
        return (
            <div>
            {/* Create navigation bar and used Link element to get route path */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark navigationBar" style={{ marginBottom: "30px" }}>
                <h3 className="navbar-brand navbarBrandHeading">Interior Design Inventory Management</h3>
                    <div className="collapse navbar-collapse">
                        { this.props.isAuth ? 
                        [<ul key="navbar" className="navbar-nav ml-auto navbarInventoryLinks">
                            { !this.props.isAdmin ?
                            [<li key="inventoryList" className="nav-item">
                                <Link className="nav-link" to="/user">Inventory List</Link>
                            </li>,
                            <li key="userProfile" className="nav-item profileNavIndicator">
                                <Link className="nav-link" to="#">User Profile</Link>
                            </li>] : null }
                            { this.props.isAdmin ? 
                            [<li key="inventory" className="nav-item">
                                <Link className="nav-link" to="/admin">Inventory List</Link>
                            </li>,
                            <li key="addItem" className="nav-item">
                                <Link className="nav-link" to="/create">Add Item
                                    <span> +</span></Link>
                            </li>,
                            <li key="adminProfile" className="nav-item profileNavIndicator">
                                <Link className="nav-link" to="#">Admin Profile</Link>
                            </li>] : null}
                        </ul>] : null }
                        <ul className="navbar-nav ml">
                            {/* Logout will be shown if user is authenticated */}
                            { this.props.isAuth ?
                                <li className="nav-item logoutNavItem">
                                <Link to="/signout" className="nav-link logoutNavLink" onClick={this.signOut}>Logout</Link>
                                </li> : null } 
                        </ul>
                    </div>
            </nav>
        </div>
        )
    }
}

// Using mapStateToProps to use isAuthenticated state
function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps, actions)(Navbar);
