var requestHelper = require("./helpers/request_helper");
var threadSearch = require("./helpers/thread_search");
var appendChildren = require('append-children');
var dom = require("./helpers/dom");

const showThread = function(parentThread, thread, parentDiv) {
  var postDiv = dom.new("div", "post-div");
  if (thread.title) {
    var title = dom.new("h4", "post-title", thread.title);
    var hr = dom.new("hr");
  }
  var name = dom.new("p", "post-name", "submitted by " + thread.author);
  var text = dom.new("p", "post-text", thread.text);
  var form = dom.new("form", "reply-button");
  var submit = dom.new("input");
  submit.type = "submit";
  submit.value = "reply";
  form.appendChild(submit);
  parentDiv.appendChild(postDiv);
  if (title) { postDiv.appendChild(title) }
  if (hr) { postDiv.appendChild(title) }
  appendChildren(postDiv, [hr, name, text, form]);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createReplyForm(parentThread, form);
  });
  for (var i = 0; i < thread.children.length; i++) {
    showThread(parentThread, thread.children[i], postDiv);
  }
}

const populateThreadList = function(threadList) {
  var content = document.getElementById("content-div");
  while (content.firstChild) { content.removeChild(content.firstChild) }
  threadList.forEach(function(thread) {
    var postDiv = dom.new("div", "post-div");
    var title = dom.new("h4", "post-title", thread.title);
    var hr = dom.new("hr");
    var name = dom.new("p", "post-name", "submitted by " + thread.author);
    var form = dom.new("form");
    var input = dom.new("input");
    input.type = "submit";
    input.value = "view";
    form.appendChild(input);
    content.appendChild(postDiv);
    appendChildren(postDiv, [title, hr, name, form]);
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      while (content.firstChild) { content.removeChild(content.firstChild) }
      showThread(thread, thread, content);
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

const createReply = function(thread, comment, form) {
  var parent = form.parentElement;
  parent.removeChild(form);
  var replyDiv = dom.new("div", "reply-div");
  var name = dom.new("p", "reply-name", comment.author);
  var text = dom.new("p", "reply-text", comment.text);
  var form = dom.new("form", "reply-button");
  var input = dom.new("input");
  input.type = "submit";
  input.value = "reply";
  form.appendChild(input);
  parent.appendChild(replyDiv);
  appendChildren(replyDiv, [name, text, form]);
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createReplyForm(thread, form);
  });
}

const createReplyForm = function(thread, form) {
  var parent = form.parentElement;
  var replyButton = document.getElementById("reply-button");
  var form = dom.new("form", "reply-form");
  var nameDiv = dom.new("div", "reply-name-div");
  var nameLabel = dom.new("label", "reply-name-label", "name: ");
  var nameInput = dom.new("input", "reply-name-input");
  appendChildren(nameDiv, [nameLabel, nameInput]);
  var commentDiv = dom.new("div", "reply-comment-div")
  var commentLabel = dom.new("label", "reply-text-label", "comment: ");
  var commentInput = dom.new("textarea", "reply-text-input");
  appendChildren(commentDiv, [commentLabel, commentInput]);
  var submit = dom.new("input", "reply-form-submit");
  submit.type = "submit";
  submit.value = "submit";
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
    var foundComment = threadSearch.findComment(thread, commentToFindCopy);
    foundComment.children.push(newComment);
    requestHelper.put("/", JSON.stringify(thread), function() {} );
    createReply(thread, newComment, form);
  });
}


const createThread = function() {
  thread = {
    author: document.getElementById("thread-form-name-input").value,
    title: document.getElementById("thread-form-title-input").value,
    text: document.getElementById("thread-form-comment-input").value,
    children: []
  }
  var content = document.getElementById("content-div");
  while (content.firstChild) { content.removeChild(content.firstChild) }
  var postDiv = dom.new("div", "post-div");
  var title = dom.new("h4", "post-title", thread.title);
  var hr = dom.new("hr", "hr");
  var name = dom.new("p", "post-name", "submitted by " + thread.author);
  var text = dom.new("p", "post-text", thread.text);
  var form = dom.new("form");
  var submit = dom.new("input");
  submit.type = "submit";
  submit.value = "reply";
  form.id = "reply-button"
  form.appendChild(submit);
  content.appendChild(postDiv);
  appendChildren(postDiv, [title, hr, name, text, form]);
  requestHelper.post("/", JSON.stringify(thread), function() {})
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    createReplyForm(thread, form);
  })
}

const createThreadForm = function() {
  var content = document.getElementById("content-div");
  while (content.firstChild) { content.removeChild(content.firstChild) }
  var form = dom.new("form", "thread-form");
  var formTitle = dom.new("h4", "form-title", "start your thread here.");
  var nameDiv = dom.new("div", "name-div");
  var nameLabel = dom.new("label", "thread-form-name-label", "name: ");
  var nameInput = dom.new("input", "thread-form-name-input");
  appendChildren(nameDiv, [nameLabel, nameInput]);
  var titleDiv = dom.new("div", "title-div");
  var titleLabel = dom.new("label", "thread-form-title-label", "title: ");
  var titleInput = dom.new("input", "thread-form-title-input");
  appendChildren(titleDiv, [titleLabel, titleInput]);
  var commentDiv = dom.new("div", "comment-div");
  var commentLabel = dom.new("label", "thread-form-comment-label", "comment: ");
  var commentInput = dom.new("textarea", "thread-form-comment-input");
  appendChildren(commentDiv, [commentLabel, commentInput]);
  var submit = dom.new("input", "form-submit", "submit");
  submit.type = "submit";
  submit.id = document.createElement("form-submit");
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
//249
