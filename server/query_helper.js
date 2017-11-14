var MongoClient = require("mongodb").MongoClient;

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
        console.log("1 document inserted!");
        result(docs);
      });
    });
  }
  
}

module.exports = queryHelper;
