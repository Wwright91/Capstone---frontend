import "./Comment.scss";
import React from "react";
// import { useState } from "react";
// import { Button } from "react-bootstrap";
// import CommentForm from "./CommentForm";
import ReadMoreAndLess from "react-read-more-less";

const Comment = ({ comment, handleDelete }) => {
  // const [viewEditForm, toggleEditForm] = useState(false);
  // const [showForm, setShowForm] = useState(false);

  // const toggleView = () => {
  //   toggleEditForm(!viewEditForm);
  // };

  return (
    // <div className="Review">
    //   {viewEditForm ? (
    //     <CommentForm
    //       commentDetails={comment}
    //       toggleView={toggleView}
    //       handleSubmit={handleSubmit}
    //     />
    //   ) : (

    <section className="Comment">
      {/* <ul> */}
      <li className="Comment__Commenter">
        <h6>{comment.author_name}</h6>{" "}
        {/* <p> */}
          <ReadMoreAndLess
            className="Comment__Read__More"
            readMoreText="Show more"
            readLessText="Show less"
          >
            {comment.text}
          </ReadMoreAndLess>
        {/* </p> */}
      </li>
      {/* <>
              <Button onClick={() => setShowForm(!showForm)} variant="dark">
                {!showForm ? "Add A New Comment" : "Hide Form"}
              </Button>

              {showForm && (
                <CommentForm
                  handleSubmit={handleAdd}
                ></CommentForm>
              )}
            </> */}

      {/* <li>{comment.content}</li> */}
      {/* </ul> */}
      {/* <Button variant="warning" onClick={toggleView}>
              {!viewEditForm ? "Edit" : "See Comment"}
            </Button>{" "} */}
      {/* <Button variant="danger" onClick={() => handleDelete(comment.id)}>
              Delete
            </Button> */}
    </section>
  );
};

export default Comment;
