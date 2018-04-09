const mongoose = require('mongoose');
const { User } = require('../models/user');
const { Book } = require('../models/book');
const { auth } = require('../middleware/auth');


module.exports = (app) => {

    //not sure about this, may want to use middleware on every route
    app.get('/api/auth', auth, (req, res) => {
        res.send(req.user)
    });
    
    app.post('/api/register', (req, res) => {
        const user = new User(req.body);
        user.save().then((user) => {
            res.send(user);
        }).catch((e) => {
            res.status(400).send({ message: 'Unable to register'});
        })
    });

    app.post('/api/login', (req, res) => {
        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                res.status(401).send({ message: 'Username not found'});  //should be 400..no promise resolve
                return;
            }
            user.comparePassword(req.body.password).then((user) => {
                user.generateToken().then((token) => {
                    res.cookie('x-auth', token).send(user);
                });
             }).catch((e) => {
                res.status(401).send({ message: 'Incorrect password'}); //***** have to change status to 200 to get message */
                return;
             })
        }).catch((e) => {
            res.status(400).send();
        });
    });

    // app.get('/api/users/:id', (req, res) => {
    //     const id = req.params.id;
    //     User.findById(id).then((user) => {
    //         res.json({ firstName: user.firstName, lastName: user.lastName });
    //     }).catch((e) => {
    //         res.status(400).send(e);
    //     });
    // });

    app.get('/api/users', (req, res) => {
        User.find({}).then((users) => {
            res.send({ users });
        }).catch((e) => {
            res.status(400).send();
        })
    });

    app.delete('/api/logout', auth, (req, res) => {
        req.user.removeToken(req.token).then(() => {
            res.send({message: "Succesfully logged out"});
        }).catch((e) => {
            res.status(400).send();
        })
    });

}

