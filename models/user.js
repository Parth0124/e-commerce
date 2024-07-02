const getDb = require('../util/database').getDb
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save()
    {
        const db = getDb();
        db.collection('users')
        .insertOne(this);
    }

    static findById()
    {
        const db = getDb()
        return db.collection('users').findOne({_id: new ObjectId(userId)});
    }
}

module.exports = User;