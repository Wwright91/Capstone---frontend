import React from "react";
// import axios from "axios";
import { useState } from "react";
import {  Button } from "react-bootstrap";
// import { useParams } from "react-router-dom";
import Comment from "./Comment";
import Pagination from "@mui/material/Pagination";
import usePagination from "../pagination/Pagination";
// import CommentForm from "./CommentForm";

// const API = process.env.REACT_APP_API_URL;

const Comments = ({ comments }) => {
  // const [comments, setComments] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const showComment = (e, id) => {
    console.log(e, id)
  }

  let [page, setPage] = useState(1);
  const PER_PAGE = 3;

  const count = Math.ceil(comments.length / PER_PAGE);
  const allReviews = usePagination(comments, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    allReviews.jump(p);
  };

  // let [page, setPage] = useState(1);
  // const PER_PAGE = 24;

  // const count = Math.ceil(comments.length / PER_PAGE);
  // const _DATA = usePagination(comments, PER_PAGE);

  // const handleChange = (e, p) => {
  //   setPage(p);
  //   _DATA.jump(p);
  // };
  // let { id } = useParams();

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
    <section className="Comments">
      {allReviews.currentData().map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              showComment={showComment}
              // handleDelete={handleDelete}
              // handleSubmit={handleEdit}
            />
      ))}
       <Pagination
            style={{ justifyContent: "center", display: "flex" }}
            count={count}
            size="medium"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
    </section>
  );
};

export default Comments;
