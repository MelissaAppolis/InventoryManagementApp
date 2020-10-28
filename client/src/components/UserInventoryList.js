import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import * as actions from '/Users/melissa/Desktop/InventoryManagementApp/client/src/actions/index.action';

// creating function to dislpay the stock items within a table layout.
const Inventory = props => (
    <tr>
        <td className="idTableData">{props.inventory.id}</td>
        <td>{props.inventory.date}</td>
        <td>{props.inventory.item_name}</td>
        <td>{props.inventory.item_description}</td>
        <td>{props.inventory.item_category}</td>
        <td>{props.inventory.colour}</td>
        <td>{props.inventory.project_location}</td>
        <td className="costPriceTableData">R {props.inventory.cost_price}</td>
        <td className="quantityTableData">{props.inventory.quantity}</td>
    </tr>
)


class UserInventoryList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {inventory: []};// Setting initial state as array to store the inventory list in this array.
    }

    // Getting the inventory list from the database
    componentDidMount() {
        this._isMounted = true;

        axios.get('http://localhost:3001/inventory/')
        .then(response => {
            if (this._isMounted) {
                this.setState({inventory: response.data});
            } 
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate() {
        axios.get('http://localhost:3001/inventory/')
        .then(response => {
            if (this._isMounted) {
                this.setState({inventory: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // Using array.map to create an array of all stock items stored in the database.
    inventoryList() {
        return this.state.inventory.map(currentitem => {
            return <Inventory inventory={currentitem} key={currentitem._id} />
        });
    }

    render() {
        return (
            <div className="inventoryList">
                <h3>Inventory List</h3>
                <table className="table table-bordered table-hover inventoryListTable" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th className="idTableHeading">ID</th>
                            <th>Date Added</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Item Category</th>
                            <th>Colour</th>
                            <th>Project Location</th>
                            <th>Cost Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.inventoryList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

// Using mapStateToProps to use isAuthenticated and isAdmin state
function mapStateToProps(state) {
    return {
        isAuth: state.auth.isAuthenticated,
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps, actions)(UserInventoryList);
