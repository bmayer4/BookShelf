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

app.listen(port, () => {
    console.log(`server is up on port ${port}!`);
});
