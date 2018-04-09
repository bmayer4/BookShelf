const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const keys = require('./config/keys');
const { User } = require('./models/user');
const { Book } = require('./models/book');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

app.use(cookieParser());

userRoutes(app);
bookRoutes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build')); //go to cd client, npm run build

    const path = require('path');
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));  //   '../client' teacher has
    });
}

app.listen(port, () => {
    console.log(`server is up on port ${port}!`);
});
