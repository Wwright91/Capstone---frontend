import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Badge, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const API = process.env.REACT_APP_API_URL;

const Comments = ({ comments }) => {
  // const [comments, setComments] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);
  let { id } = useParams();

  // console.log("comments", comments.length)

  // useEffect(() => {
  //     axios.get(`${API}/businesses/${id}/comments`).then((response) => {
  //       // console.log(response.data)
  //         setComments(response.data);
  //         // console.log(comments)
  //   });
  // }, [id]);

  // const handleAdd = (newComment) => {
  //   axios
  //     .post(`${API}/businesses/${id}/comments`, newComment)
  //     .then(
  //       (response) => {
  //         setComments([response.data, ...comments]);
  //       },
  //       (error) => console.error(error)
  //     )
  //     .catch((c) => console.warn("catch", c));
  // };

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`${API}/businesses/${id}/comments/${id}`)
  //     .then(
  //       (response) => {
  //         const copyCommentArray = [...comments];
  //         const indexDeletedComment = copyCommentArray.findIndex((comment) => {
  //           return comment.id === id;
  //         });
  //         copyCommentArray.splice(indexDeletedComment, 1);
  //         setComments(copyCommentArray);
  //       },
  //       (error) => console.error(error)
  //     )
  //     .catch((c) => console.warn("catch", c));
  // };

  // const handleEdit = (updatedComment) => {
  //   axios
  //     .put(`${API}/businesses/${id}/comments/${updatedComment.id}`, updatedComment)
  //     .then((response) => {
  //       const copyCommentArray = [...comments];
  //       const indexUpdatedComment = copyCommentArray.findIndex((comment) => {
  //         return comment.id === updatedComment.id;
  //       });
  //       copyCommentArray[indexUpdatedComment] = response.data;
  //       setComments(copyCommentArray);
  //     })
  //     .catch((c) => console.warn("catch", c));
  // };

  return (
    // <section className="comments-section">
    <Button variant="light" onClick={() => setShowComments(!showComments)}>
      Comments{" "}
      {/* <Badge bg={comments ? "secondary" : "danger"}>
          {comments.length}
        </Badge> */}
    </Button>
    //   <br />
    //   <br />
    //   {showComments && (
    //     <>
    //       {comments.map((comment) => (
    //         <Comment
    //           key={comment.id}
    //           comment={comment}
    //           handleDelete={handleDelete}
    //           handleSubmit={handleEdit}
    //         />
    //       ))}
    //       <br />
    //       <h3>
    //         <Button onClick={() => setShowForm(!showForm)} variant="dark">
    //           {!showForm ? "Add A New Comment" : "Hide Form"}
    //         </Button>
    //       </h3>
    //     </>
    //   )}
    //   {showForm && <CommentForm handleSubmit={handleAdd}></CommentForm>}
    // </section>
  );
};

export default Comments;
