import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentForm = (props) => {
  let { id } = useParams();
  const { commentDetails, currentUser } = props;

  console.log("currentUser", currentUser);

  const [comment, setComment] = useState({
    commenter: "",
    content: "",
    business_id: id,
  });

  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };

  useEffect(() => {
    if (commentDetails) {
      setComment(commentDetails);
    }
  }, [id, commentDetails, props]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(comment, id);
    if (commentDetails) {
      props.toggleView();
    }
    setComment({
      commenter: "",
      content: "",
      business_id: id,
    });
  };

  return (
    <div className="Edit">
      {props.children}
      <form onSubmit={handleSubmit}>
        <>
          <label htmlFor="commenter">Name:</label>
          <input
            id="commenter"
            value={comment.commenter}
            type="text"
            onChange={handleTextChange}
            placeholder="Your name"
            required
          />
          <label htmlFor="content">Comment:</label>
          <input
            id="content"
            type="text"
            name="content"
            value={comment.content}
            placeholder="What do you think..."
            onChange={handleTextChange}
          />
          <br />
          <input type="submit" className="btn btn-warning" />
        </>
      </form>
    </div>
  );
};

export default CommentForm;
