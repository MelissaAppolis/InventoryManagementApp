const mongoose = require('mongoose');
const db = require('./config/user.config').mongoURI;

// Connect to uri - database
mongoose.connect(db,
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

    