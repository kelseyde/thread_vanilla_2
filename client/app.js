const createReply = function(comment, form) {
  var parent = form.parentElement;
  parent.removeChild(form);
  var replyDiv = document.createElement("div");
  replyDiv.id = "reply-div";
  var name = document.createElement("p");
  name.innerText = comment.name;
  name.id = "reply-name";
  var text = document.createElement("p");
  text.innerText = comment.text;
  text.id = "reply-text";
  var form = document.createElement("form");
  var input = document.createElement("input");
  input.type = "submit";
  input.value = "reply";
  form.appendChild(input);
  parent.appendChild(replyDiv);
  replyDiv.appendChild(name);
  replyDiv.appendChild(text);
  replyDiv.appendChild(form);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createReplyForm(form);
  });
}

const createReplyForm = function(form) {
  var parent = form.parentElement;
  var replyButton = document.getElementById("reply-button");
  var form = document.createElement("form");
  form.id = "reply-form";
  var nameDiv = document.createElement("div");
  nameDiv.id = "reply-name-div";
  var nameLabel = document.createElement("label");
  nameLabel.innerText = "name: "
  nameLabel.id = "reply-name-label";
  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "reply-name-input";
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);
  var commentDiv = document.createElement("div");
  commentDiv.id = "reply-comment-div";
  var commentLabel = document.createElement("label");
  commentLabel.innerText = "comment: "
  commentLabel.id = "reply-text-label";
  var commentInput = document.createElement("textarea");
  commentInput.type = "text";
  commentInput.id = "reply-text-input";
  commentDiv.appendChild(commentLabel);
  commentDiv.appendChild(commentInput);
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "submit";
  submit.id = "reply-form-submit";
  form.appendChild(nameDiv);
  form.appendChild(commentDiv);
  form.appendChild(submit);
  parent.appendChild(form);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var newComment = {
      author: nameInput.value,
      text: commentInput.value,
      children: []
    }
    var commentToFindCopy = createParentCommentCopy(form);
    var foundComment = findComment(post, commentToFindCopy);
    foundComment.children.push(newComment);
    console.log(post);
    createReply(newComment, form);
  });
}


var findComment = function(startPoint, commentToFind) {
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
}

var createParentCommentCopy = function(form) {
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


const createThread = function() {
  post = {
    author: document.getElementById("thread-form-name-input").value,
    title: document.getElementById("thread-form-title-input").value,
    text: document.getElementById("thread-form-comment-input").value,
    children: []
  }
  var content = document.getElementById("content-div");
  while (content.firstChild) { content.removeChild(content.firstChild) }
  var postDiv = document.createElement("div");
  postDiv.id = "post-div";
  var title = document.createElement("h4");
  title.id = "post-title";
  title.innerText = post.title;
  var hr = document.createElement("hr");
  var name = document.createElement("p");
  name.id = "post-name";
  name.innerText = "submitted by " + post.author;
  var text = document.createElement("p");
  text.id = "post-text";
  text.innerText = post.text;
  var form = document.createElement("form");
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "reply";
  form.id = "reply-button"
  form.appendChild(submit);
  content.appendChild(postDiv);
  postDiv.appendChild(title);
  postDiv.appendChild(hr);
  postDiv.appendChild(name);
  postDiv.appendChild(text);
  postDiv.appendChild(form);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createReplyForm(form);
  })
}

const createThreadForm = function() {
  var content = document.getElementById("content-div");
  while (content.firstChild) { content.removeChild(content.firstChild) }
  var form = document.createElement("form");
  form.id = "thread-form";
  var formTitle = document.createElement("h4");
  formTitle.innerText = "start your thread here."
  formTitle.id = "form-title"
  var nameDiv = document.createElement("div");
  nameDiv.id = "name-div";
  var nameLabel = document.createElement("label");
  nameLabel.innerText = "name: "
  nameLabel.id = "thread-form-name-label";
  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "thread-form-name-input";
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(nameInput);
  var titleDiv = document.createElement("div");
  titleDiv.id = "title-div";
  var titleLabel = document.createElement("label");
  titleLabel.innerText = "title: "
  titleLabel.id = "thread-form-title-label";
  var titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "thread-form-title-input";
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);
  var commentDiv = document.createElement("div");
  commentDiv.id = "comment-div";
  var commentLabel = document.createElement("label");
  commentLabel.innerText = "comment: "
  commentLabel.id = "thread-form-comment-label";
  var commentInput = document.createElement("textarea");
  commentInput.type = "text";
  commentInput.id = "thread-form-comment-input";
  commentDiv.appendChild(commentLabel);
  commentDiv.appendChild(commentInput);
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.id = document.createElement("form-submit");
  submit.value = "submit";
  form.appendChild(formTitle);
  form.appendChild(nameDiv);
  form.appendChild(titleDiv);
  form.appendChild(commentDiv);
  form.appendChild(submit);
  content.appendChild(form);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createThread();
  });
}

const initialiseStartButton = function() {
  var start = document.getElementById("start");
  start.addEventListener("click", createThreadForm);
}

window.addEventListener("DOMContentLoaded", function() {
  initialiseStartButton()
});
