import React, { useEffect, useState } from "react";
import "./CommentSection.css";
import toastr from "toastr";

const CommentSection = ({ resName }) => {
  const [comments, setComments] = useState(null);
  const [loadedComments, setLoadedComments] = useState(false);
  const [text, setText] = useState("");

  const username = localStorage.getItem("username");
  const restaurantName = resName;

  useEffect(() => {
    fetch("http://localhost:3000/getComments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resName: JSON.stringify(restaurantName),
      }),
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error(error));
  }, [restaurantName]);

  useEffect(() => {
    if (!comments || loadedComments) {
      return;
    }

    const heading = document.getElementById("heading");

    comments.forEach((comment) => {
      const username = document.createElement("h3");
      username.className = "username";
      username.innerText = comment.username;

      const reportButton = document.createElement("button");
      reportButton.className = "report";
      reportButton.textContent = "Report Comment";
      reportButton.addEventListener("click", function () {
        toastr.error("Comment Reported");
      });
      username.appendChild(reportButton);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete";
      deleteButton.textContent = "Delete Your Comment";
      deleteButton.addEventListener("click", function () {
        toastr.success("Not Yet Implemented");
      });
      username.appendChild(deleteButton);

      const commentItself = document.createElement("div");
      commentItself.className = "comment";
      commentItself.innerText = comment.comment;

      heading.appendChild(username);
      heading.appendChild(commentItself);
    });

    setLoadedComments(true);
  }, [comments, loadedComments]);

  function handleSubmit(e) {
    if (username === null) {
      return;
    }

    e.preventDefault();

    fetch("http://localhost:3000/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resName: JSON.stringify(restaurantName),
        username: username,
        comment: JSON.stringify(text),
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          setText("");
          window.location.reload();
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="section">
      <h1>User Reviews</h1>
      {"\n"}
      <div id="heading"></div>
      <hr />
      {username && (
        <form onSubmit={handleSubmit}>
          <textarea
            rows={2}
            cols={50}
            style={{ fontSize: "15px" }}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div></div>
          <button type="submit" className="button">
            Add Comment
          </button>
        </form>
      )}
      {!username && <div className="message">Log in to add comments.</div>}
    </div>
  );
};

export default CommentSection;
