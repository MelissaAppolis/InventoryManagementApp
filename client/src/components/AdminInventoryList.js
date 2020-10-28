import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../actions/index.action';


// Creating function to dislpay the stock items within a table layout and adding an edit link and a delete button to every line item.
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
        <td className="editDeleteTableData">
           <Link to={"/edit/"+props.inventory._id} className="editButton" style={{textDecoration: 'none'}}>edit</Link><button className="deleteButton" onClick={() => { props.deleteItem(props.inventory._id) }}>delete</button> 
        </td> 
    </tr>
)

class AdminInventoryList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);

        this.state = {inventory: []};// Setting initial state as an  array to store the inventory list in this array
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

    componentDidUpdate(prevProps, prevState) {
        axios.get('http://localhost:3001/inventory/')
        .then(response => {
            // compare initital state with update state
            if (JSON.stringify(response.data) !== JSON.stringify(this.state.inventory)) {
                this.setState({inventory: response.data});
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    // Delete an item from the inventory list using MongoDB automatic ID
    deleteItem(id) {
        axios.delete(`http://localhost:3001/inventory/delete/${id}`)
        .then(res => console.log(res.data));

        this.setState({
            inventory: this.state.inventory.filter(el => el._id !== id)
        })
    }

    // Using array.map to create an array of all stock items stored in the database.
    inventoryList() {
        return this.state.inventory.map(currentitem => {
            return <Inventory inventory={currentitem} deleteItem={this.deleteItem} key={currentitem._id} />
        });
    }

    // This inventory list will only be display if the user is logged in as an admin, thus using this.props.isAdmin
    render() {
        return (
            <div className="inventoryList">
                { this.props.isAdmin ? 
                [<h3 key="adminHeading">Inventory List</h3>,
                <table className="table table-bordered table-hover inventoryListTable" style={{ width: '100%' }} key="tables">
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
                </table> ] : <h1>Please Login as an admin to view admin inventory list</h1> }
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

export default connect(mapStateToProps, actions)(AdminInventoryList);
