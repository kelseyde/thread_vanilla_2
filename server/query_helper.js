var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

var queryHelper = {

  url: "mongodb://localhost:27017/threads",

  all: function (result) {
    MongoClient.connect(this.url, function(err, db) {
      var threadCollection = db.collection("threads");

      threadCollection.find().toArray(function (err, docs) {
        result(docs);
      });
    });
  },

  insert: function(object, result) {
    MongoClient.connect(this.url, function(err, db) {
      var threadCollection = db.collection("threads");
      threadCollection.insertOne(object, function(err, docs) {
        result(docs);
      });
    });
  },

  update: function(object, result) {
    MongoClient.connect(this.url, function(err, db) {
      if (err) console.log("ERROR");
      var threadCollection = db.collection("threads");
      if (object._id) object._id = new ObjectID(object._id)
      threadCollection.update(
        {
          title: object.title
        },
        object
      );
      result()
    });
  }

}

module.exports = queryHelper;
