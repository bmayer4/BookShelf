const mongoose = require('mongoose');
const { Book } = require('../models/book');
const { auth } = require('../middleware/auth');

module.exports = (app) => {

    app.post('/api/books', auth, (req, res) => {
        const book = new Book({...req.body, ownerId: req.user._id});
        book.save().then((doc) => {  
        res.send(doc);
        }).catch((e) => {
        res.status(400).send(e);
        });
    });


        //ALL BOOKS
    app.get('/api/books', (req, res) => {
        //localhost:3001/api/books?skip=3&limit=10?&order=asc
        let skip = parseInt(req.query.skip);
        let limit = parseInt(req.query.limit);
        let order = req.query.order;
        Book.find({}).populate('ownerId').skip(skip).sort({ _id: order}).limit(limit).then((books) => {
            res.send({books});
        }).catch((e) => {
            res.status(400).send(e);
        });
    });


    //INDIVIDUAL BOOK BY BOOK ID
    app.get('/api/books/:id', (req, res) => {
        const id = req.params.id;
    Book.findOne({_id: id}).populate('ownerId').then((book) => {
        if (!book) {
            res.status(404).send();
            return console.log('Unable to find book');
        }
        res.send({book});
        }).catch((e) => {
            res.status(400).send();
        })
    });

        //ALL BOOKS BY OWNERID
        app.get('/api/user/books', auth, (req, res) => { 
            Book.find({ ownerId: req.user._id }).then((books) => {  
                if (!books) {
                    res.status(404).send();
                    return;
                }
                res.send({books});
            }).catch((e) => {
                res.status(400).send();
            });
        });

        //ALL BOOKS BY USERID
        app.get('/api/user/:id', (req, res) => { 
            let id = req.params.id
            Book.find({ ownerId: id }).populate('ownerId').then((books) => {  
                if (!books) {
                    res.status(404).send();
                    return;
                }
                res.send({books});
            }).catch((e) => {
                res.status(400).send();
            });
        });



    app.patch('/api/books/:id', auth, (req, res) => {
        const id = req.params.id;

        Book.findOneAndUpdate({ _id: id, ownerId: req.user._id }, { $set: req.body }, { new: true }).then((book) => {
            if (!book) {
                res.status(404).send();
                return;
            }
            res.send({book});
        }).catch((e) => {
            res.status(400).send();
        });
    });

    app.delete('/api/books/:id', auth, (req, res) => {
        const id = req.params.id;

        Book.findOneAndRemove({_id: id, ownerId: req.user._id }).then((book) => {
            if (!book) {
                res.status(404).send();
                return;
            }
            res.send({book});
        }).catch((e) => {
            res.status(400).send();
        });
    });


}