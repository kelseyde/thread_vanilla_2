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
        result(docs);
      });
    });
  },

  update: function(object, result) {
    MongoClient.connect(this.url, function(err, db) {
      var threadCollection = db.collection("threads");
      console.log("object: ", object);
      console.log("object title: ", object.title);
      // var parsedCopy = JSON.parse(object);
      threadCollection.update(
        {
          title: object.title
        },
        object
      );
    });
  }

}

module.exports = queryHelper;
