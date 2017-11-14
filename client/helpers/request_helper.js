var requestHelper = {

  get: function(url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url);
    request.addEventListener('load', function() {
      var jsonString = request.responseText
      var data = JSON.parse(jsonString)
      callback(data)
    })
    request.send()
  },

  post: function(url, objectToInsert, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.addEventListener("load", function() {
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      callback(data);
    });
    request.send(objectToInsert);
  }

}

module.exports = requestHelper
