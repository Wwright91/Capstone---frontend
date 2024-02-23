import "./Comment.scss";
import React from "react";
// import { useState } from "react";
// import { Button } from "react-bootstrap";
// import CommentForm from "./CommentForm";
// import ReadMoreAndLess from "react-read-more-less";
// import ReactReadMoreReadLess from "react-read-more-read-less";

const Comment = ({ comment, handleDelete }) => {
  // const [viewEditForm, toggleEditForm] = useState(false);
  // const [showForm, setShowForm] = useState(false);

  // const toggleView = () => {
  //   toggleEditForm(!viewEditForm);
  // };

  return (
    <section className="Comment">
      <li className="Comment__Commenter">
        <h6>{comment.author_name}</h6>{" "}
       <p>{comment.text}</p>
      </li>
    </section>
  );
};

export default Comment;
