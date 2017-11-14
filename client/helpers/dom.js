var dom = {

  new: function(elementType, id, innerText) {
    var element = document.createElement(elementType);
    if (id) element.id = id;
    if (innerText) element.innerText = innerText;
    return element;
  }

}

module.exports = dom;
