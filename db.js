const mongoose = require('mongoose');

// Connect to uri - database
mongoose.connect('mongodb+srv://Melissa:melissaPassword@hyperion-dev-1234.a0z2n.mongodb.net/InventoryManagement?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else  {
            console.log('Error in DB connection : ' + err)
        }
    });

    