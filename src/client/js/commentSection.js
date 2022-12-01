const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, newCommentId) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const removeBtn = document.createElement("span");
  removeBtn.innerText = "❌";
  removeBtn.addEventListener("click", handleCommentRemove);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(removeBtn);
  videoComments.prepend(newComment);
};
const handleCommentSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });
  textarea.value = "";
  if (response.status === 201) {
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }

  // window.location.reload();
};

const handleCommentRemove = async (e) => {
  e.preventDefault();
  const li = e.target.parentElement;
  const commentId = li.dataset.id;
  const response = await fetch(`/api/comments/${commentId}/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    li.remove();
  }
};

const removeBtns = document.querySelectorAll(".comment_remove");
removeBtns.forEach((removeBtn) =>
  removeBtn.addEventListener("click", handleCommentRemove)
);

form.addEventListener("submit", handleCommentSubmit);
