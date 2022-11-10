const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleCommentSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const videoId = videoContainer.dataset.id;
  const text = textarea.value;
  await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: text }),
  });
  textarea.value = "";
};

form.addEventListener("submit", handleCommentSubmit);
