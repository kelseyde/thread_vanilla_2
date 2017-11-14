var threadSearch = {

  findComment: function(startPoint, commentToFind) {
    var element = startPoint;
    if (element.author.includes("submitted by")) {
      var author = element.author.slice(13);
    } else { var author = element.author }
    if (element.author === author &&
          element.text === commentToFind.text) {
            return element;
    } else if (element.children !== null) {
      var result = null;
      for (var i = 0; result === null && i < element.children.length; i++) {
        result = findComment(element.children[i], commentToFind);
      }
      return result;
    }
    return null;
  },

  createParentCommentCopy: function(form) {
    if (form.parentElement.childNodes[0].tagName === "H4") {
      var parentComment = {
        author: form.parentElement.childNodes[2].innerText,
        text: form.parentElement.childNodes[3].innerText
      }
    } else {
      var parentComment = {
        author: form.parentElement.childNodes[0].innerText,
        text: form.parentElement.childNodes[1].innerText
      }
    }
    return parentComment;
  }

}

module.exports = threadSearch
