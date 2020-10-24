const express = require('express');
const morgan = require('morgan');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db.js');

const app = express();


// Middlewares
//app.use(morgan('dev'))// Morgan gives information about each request
app.use(helmet()); //securing backend with helmet.
app.use(bodyParser.json());
app.use(cors())

// Routes
app.use('/users', require('./routes/users.route'));

const { Inventory } = require('./models/inventory.model.js');
const passport = require('passport');
const inventoryRoutes = express.Router();

app.use('/inventory', inventoryRoutes);

inventoryRoutes.route('/').get(function(req, res) {
    Inventory.find(function(err, inventorys) {
        if (err) {
            console.log(err);
        } else {
            res.json(inventorys);
        }
    });
});

inventoryRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id
    Inventory.findById(id, function(err, inventory) {
        res.json(inventory)
    });
});

// Creating /add route to post a stock item to the database
inventoryRoutes.route('/add').post(function(req, res) {
    let inventory = new Inventory(req.body);
    inventory.save()
    .then(inventory => {
        res.status(200).json({'inventory': 'item added successfully'});
    })
    .catch(err => {
        res.status(400).send('adding new item failed');
    });
});

// Creating /update/:id route to update a stock item and save the updated data to the database
inventoryRoutes.route('/update/:id').put(function(req, res) {
    Inventory.findById(req.params.id, function(err, inventory) {
        if (!Inventory)
            res.status(404).send('data is not found');
        else
            inventory.id = req.body.id;
            inventory.date =  req.body.date;
            inventory.item_name = req.body.item_name;
            inventory.item_description = req.body.item_description;
            inventory.item_category = req.body.item_category;
            inventory.colour = req.body.colour;
            inventory.project_location = req.body.project_location;
            inventory.cost_price = req.body.cost_price;
            inventory.quantity = req.body.quantity;

            inventory.save().then(inventory => {
                res.json('Inventory updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

// Creating /delete/:id route to delete a stock item and remove the stock item from the database
inventoryRoutes.route('/delete/:id').delete(function(req, res) {
    Inventory.findByIdAndRemove(req.params.id, function(err, inventory) {
        if (!Inventory)
            res.status(404).send('data is not found');
        else 
        res.json('Item deleted successfully');
    });
});

// Creating PORT
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});