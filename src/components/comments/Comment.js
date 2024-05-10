import "./Comment.scss";
import React, { useState } from "react";
// import { useState } from "react";
// import { Button } from "react-bootstrap";
// import CommentForm from "./CommentForm";
// import ReadMoreAndLess from "react-read-more-less";
// import ReactReadMoreReadLess from "react-read-more-read-less";
import Avatar from "@mui/material/Avatar";
import { StarRating } from "../StarRating";

const Comment = ({ id, comment, handleDelete, showComment }) => {
  // const [viewEditForm, toggleEditForm] = useState(false);
  // const [showForm, setShowForm] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // const toggleView = () => {
  //   toggleEditForm(!viewEditForm);
  // };

  return (
    <section className="Comment">
      <li className="Comment__Commenter" id={id}>
        <div className="Comment__Header">
          <div>
          <Avatar alt={comment.author_name} src={comment.profile_photo_url} />
            <h6>{comment.author_name}</h6>{" "}
          </div>
          <div></div>
          <div className="Comment__Details">
            <p>{comment.relative_time_description}</p>
            <p>
              <StarRating rating={comment.rating} />
            </p>
          </div>
        </div>
        {/* <ReactReadMoreReadLess>
       <p>{comment.text}</p>
        </ReactReadMoreReadLess> */}
        {/* <p> */}
        {/* <ReadMoreAndLess
            className="Comment__readMore"
            readMoreText="Show more"
            readLessText="Show less"
          > */}
        {/* {showMore ? comment.text : `${comment.text.substring(0, 250)}`}

        <button onClick={(e) => showComment(e, comment.author_name)}>
        {showMore ? "Show less" : "Show more"}
        </button> */}
        {comment.text}
        {/* </ReadMoreAndLess> */}
        {/* </p> */}
      </li>
    </section>
  );
};

export default Comment;
