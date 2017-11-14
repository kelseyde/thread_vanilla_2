var requestHelper = require("./helpers/request_helper");
var appendChildren = require('append-children');
var threadSearch = require("./helpers/thread_search");

const showThread = function(thread, parentDiv) {
  post = thread;
  console.log(thread);
  var postDiv = document.createElement("div");
  postDiv.id = "post-div";
  if (thread.title) {
    var title = document.createElement("h4");
    title.id = "post-title";
    title.innerText = thread.title;
    var hr = document.createElement("hr");
  }
  var name = document.createElement("p");
  name.id = "post-name";
  name.innerText = "submitted by " + thread.author;
  var text = document.createElement("p");
  text.id = "post-text";
  text.innerText = thread.text;
  var form = document.createElement("form");
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.value = "reply";
  form.id = "reply-button"
  form.appendChild(submit);
  parentDiv.appendChild(postDiv);
  if (title) { postDiv.appendChild(title) }
  if (hr) { postDiv.appendChild(title) }
  appendChildren(postDiv, [hr, name, text, form]);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createReplyForm(form);
  });
  console.log(thread.children);
  for (var i = 0; i < thread.children.length; i++) {
    console.log("we are in the for loop");
    showThread(thread.children[i], postDiv);
  }
}

const populateThreadList = function(threadList) {
  var content = document.getElementById("content-div");
  while (content.firstChild) { content.removeChild(content.firstChild) }
  threadList.forEach(function(thread) {
    var postDiv = document.createElement("div");
    postDiv.id = "post-div";
    var title = document.createElement("h4");
    title.id = "post-title";
    title.innerText = thread.title;
    var hr = document.createElement("hr");
    var name = document.createElement("p");
    name.id = "post-name";
    name.innerText = "submitted by " + thread.author;
    var form = document.createElement("form");
    var input = document.createElement("input");
    input.type = "submit";
    input.value = "view";
    form.appendChild(input);
    content.appendChild(postDiv);
    appendChildren(postDiv, [title, hr, name, form]);
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      while (content.firstChild) { content.removeChild(content.firstChild) }
      showThread(thread, content);
    });
  });
}

const inititaliseViewButton = function() {
  var viewButton = document.getElementById("view");
  viewButton.addEventListener("click", function() {
    requestHelper.get("/threads", function(threadList) {
      populateThreadList(threadList);
    });
  });
}

const createReply = function(comment, form) {
  var parent = form.parentElement;
  parent.removeChild(form);
  var replyDiv = document.createElement("div");
  replyDiv.id = "reply-div";
  var name = document.createElement("p");
  name.innerText = comment.author;
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
  appendChildren(replyDiv, [name, text, form]);
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
  appendChildren(nameDiv, [nameLabel, nameInput]);
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
  appendChildren(form, [nameDiv, commentDiv, submit]);
  parent.appendChild(form);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var newComment = {
      author: nameInput.value,
      text: commentInput.value,
      children: []
    }
    var commentToFindCopy = threadSearch.createParentCommentCopy(form);
    var foundComment = threadSearch.findComment(post, commentToFindCopy);
    console.log("POST: ", post);
    console.log("FOUND COMMENT: ", foundComment);
    foundComment.children.push(newComment);
    requestHelper.put("/", JSON.stringify(post), function() {
      console.log("put request sent! content is ", JSON.stringify(post));
    });
    createReply(newComment, form);
  });
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
  appendChildren(postDiv, [title, hr, name, text, form]);

  requestHelper.post("/", JSON.stringify(post), function() {})

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
  appendChildren(nameDiv, [nameLabel, nameInput]);
  var titleDiv = document.createElement("div");
  titleDiv.id = "title-div";
  var titleLabel = document.createElement("label");
  titleLabel.innerText = "title: "
  titleLabel.id = "thread-form-title-label";
  var titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "thread-form-title-input";
  appendChildren(titleDiv, [titleLabel, titleInput]);
  var commentDiv = document.createElement("div");
  commentDiv.id = "comment-div";
  var commentLabel = document.createElement("label");
  commentLabel.innerText = "comment: "
  commentLabel.id = "thread-form-comment-label";
  var commentInput = document.createElement("textarea");
  commentInput.type = "text";
  commentInput.id = "thread-form-comment-input";
  appendChildren(commentDiv, [commentLabel, commentInput]);
  var submit = document.createElement("input");
  submit.type = "submit";
  submit.id = document.createElement("form-submit");
  submit.value = "submit";
  appendChildren(form, [formTitle, nameDiv, titleDiv, commentDiv, submit]);
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
  initialiseStartButton();
  inititaliseViewButton();
});
