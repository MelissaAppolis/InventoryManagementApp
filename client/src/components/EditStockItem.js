import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CurrencyInput from 'react-currency-input';// Importing react component to input currency prefix in cost_price input tag, also supports decimals
import axios from 'axios';

// Importing components
import AdminInventoryList from './AdminInventoryList';
import CreateStockItem from './CreateStockItem';


class EditStockItem extends Component {
    constructor(props) {
        super(props);
        // initialising state
        this.state = {
            id: '',
            date: new Date().toLocaleDateString(),
            item_name: '',
            item_description: '',
            item_category: '',
            colour: '',
            project_location: '',
            cost_price: 0.00,
            quantity: 0
        }
        // binding event handlers
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeItemName = this.onChangeItemName.bind(this);
        this.onChangeItemDescription = this.onChangeItemDescription.bind(this);
        this.onChangeItemCategory = this.onChangeItemCategory.bind(this);
        this.onChangeColour = this.onChangeColour.bind(this);
        this.onChangeProjectLocation = this.onChangeProjectLocation.bind(this);
        this.onChangeCostPrice = this.onChangeCostPrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // fetching stock item that was selected by user by matching id
    componentDidMount() {
        axios.get('http://localhost:3001/inventory/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                id: response.data.id,
                date: response.data.date,
                item_name: response.data.item_name,
                item_description: response.data.item_description,
                item_category: response.data.item_category,
                colour: response.data.colour,
                project_location: response.data.project_location,
                cost_price: response.data.cost_price,
                quantity: response.data.quantity
            })
        })
        .catch(function(error) {
            console.log(error)
        })
    }

    onChangeId(e) {
        this.setState({
            id: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeItemName(e) {
        this.setState({
            item_name: e.target.value
        });
    }

    onChangeItemDescription(e) {
        this.setState({
            item_description: e.target.value
        });
    }

    onChangeItemCategory(e) {
        this.setState({
            item_category: e.target.value
        });
    }

    onChangeColour(e) {
        this.setState({
            colour: e.target.value
        });
    }

    onChangeProjectLocation(e) {
        this.setState({
            project_location: e.target.value
        });
    }

    onChangeCostPrice(event, value, maskedValue) {
        this.setState({cost_price: value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    // Updating stock item by using axios.put and returning to /admin page when user clicks on onSubmit.
    onSubmit(e) {
        e.preventDefault();

        const updateItem = {
            id: this.state.id,
            date: this.state.date,
            item_name: this.state.item_name,
            item_description: this.state.item_description,
            item_category: this.state.item_category,
            colour: this.state.colour,
            project_location: this.state.project_location,
            cost_price: this.state.cost_price,
            quantity: this.state.quantity
        };
        axios.put('http://localhost:3001/inventory/update/'+this.props.match.params.id, updateItem)
        .then(res => console.log(res.data));
        
        this.props.history.push('/admin');
    }

    render() {
        const { match } = this.props
        return (
            <div>
                {/* Matching /admin and /create routes when user clicks on links in Navbar */}
                <Switch>
                    <Route path={`${match.path}/admin`} component={AdminInventoryList} />
                    <Route path={`${match.path}/create`} component={CreateStockItem} />
                </Switch>
                <div className="container">
                    <h3 key="formHeading">Update Stock Item</h3>
                    <form onSubmit={this.onSubmit} key="form">
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">ID: </label>
                            <div className="col-sm-4">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.id || ''}
                                        onChange={this.onChangeId}
                                        required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">Date: </label>
                            <div className="col-sm-4">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.date || ''}
                                        onChange={this.onChangeDate}
                                        readOnly
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-auto col-form-label">Item Name: </label>
                            <div className="col-sm-5">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.item_name || ''}
                                        onChange={this.onChangeItemName}
                                        required
                                />
                            </div>      
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Item Description: </label>
                            <div className="col-sm-6">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.item_description || ''}
                                        onChange={this.onChangeItemDescription}
                                        required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Item Category: </label>
                            <div className="col-sm-5">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.item_category || ''}
                                        onChange={this.onChangeItemCategory}
                                        required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-1 col-form-label">Colour: </label>
                            <div className="col-sm-6">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.colour || ''}
                                        onChange={this.onChangeColour}
                                        required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Project Location: </label>
                            <div className="col-sm-5">
                                <input  type="text" 
                                        className="form-control form-control-sm"
                                        value={this.state.project_location || ''}
                                        onChange={this.onChangeProjectLocation}
                                        required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-auto col-form-label">Cost Price: </label>
                            <div className="col-sm-2">
                                <CurrencyInput  prefix="R"
                                                className="form-control form-control-sm currency"
                                                value={this.state.cost_price || 0.00}
                                                onChange={this.onChangeCostPrice}
                                                required
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-auto col-form-label">Quantity: </label>
                            <div className="col-sm-2">
                                <input  type="number" 
                                        className="form-control form-control-sm"
                                        value={this.state.quantity || 0}
                                        onChange={this.onChangeQuantity}
                                        required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Update Stock Item" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>  
            </div>
        )
    }
}

export default EditStockItem;