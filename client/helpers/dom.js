var dom = {

  new: function(elementType, id, innerText, type, value) {
    var element = document.createElement(elementType);
    if (id) element.id = id;
    if (innerText) element.innerText = innerText;
    if (type) element.type = type;
    if (value) element.value = value;
    return element;
  },

  clear: function(id) {
    var element = document.getElementById(id);
    while (element.firstChild) { element.removeChild(element.firstChild) }
    return element;
  },

  append: function(parent, children) {
    children.forEach(function(child) {
      if (child) parent.appendChild(child);
    });
  }

}

module.exports = dom;
