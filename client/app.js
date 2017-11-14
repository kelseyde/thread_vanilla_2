const createReply = function(comment, form) {
  var parent = form.parentElement;
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
  })
}

const createReplyForm = function(form) {
  console.log("form: ", form);
  var parent = form.parentElement;
  console.log("parent: ", parent);

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
  commentDiv.id = "comment-div";
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
    var comment = {
      name: nameInput.value,
      text: commentInput.value,
      children: []
    }
    post.children.push(comment);
    parent.removeChild(form);
    console.log("parent: ", parent);
    createReply(comment, form);
  });

}

const createThread = function() {
  var name = document.getElementById("thread-form-name-input").value;
  var title = document.getElementById("thread-form-title-input").value;
  var text = document.getElementById("thread-form-comment-input").value;
  post = {
    name: name,
    title: title,
    text: text,
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
  hr.id = "hr";
  var name = document.createElement("p");
  name.id = "post-name";
  name.innerText = "submitted by " + post.name;
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
