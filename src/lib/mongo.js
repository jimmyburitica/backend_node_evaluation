const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `${config.dbConnection}://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib
{
  constructor()
  {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  connect()
  {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) =>
      {
        this.client.connect(err =>
        {
          if (err) {
            reject(err);
          }

          // console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  // Regresa todos los registros
  getAll(collection, query)
  {
    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray();
    });
  }

  // Regresa un solo registro
  get(collection, id)
  {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  // Crea un registro
  create(collection, data)
  {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data);
    }).then(result => result.ops[0]);
  }

  // actualiza y si no existe lo adiciona.
  update(collection, id, data)
  {
    return this.connect().then(db => {
      db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: false });
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    }).then(result => result);
  }

  // Borra un registro
  delete(collection, id)
  {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: ObjectId(id) });
    }).then(() => id);
  }

}

module.exports = MongoLib;