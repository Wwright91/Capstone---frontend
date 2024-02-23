import "./BusinessPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import ShowMap from "../map/ShowMap";
import Pagination from "@mui/material/Pagination";

// import Comments from "../comments/Comments";
import Comment from "../comments/Comment";
// import CommentForm from "../comments/CommentForm";
import { StarRatingAndReviews } from "../StarRating";
import BusinessHours from "../businessHours/BusinessHours";
import BusinessPhotos from "../businessPhotos/BusinessPhotos";
import usePagination from "../pagination/Pagination";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const API = process.env.REACT_APP_API_URL;
// const API_key = ""
const API_key = process.env.REACT_APP_GOOGLE_API_KEY;

const Show = ({ setFavs, favs, currentUser, findBusinessByPlaceId }) => {
  // const [key, setKey] = useState("description");
  const [favorite, setFavorite] = useState(false);
  let { id } = useParams();
  const [comments, setComments] = useState([]);
  // const [showForm, setShowForm] = useState(false);
  // const [showComments, setShowComments] = useState(false);

  const placeId = findBusinessByPlaceId(Number(id));

  const [business, setBusiness] = useState([]);
  const [businessDataFromAPI, setBusinessDataFromAPI] = useState([]);
  const [businessHours, setBusinessHours] = useState([]);
  const [showHours, setShowHours] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(null);
  const [businessReviews, setBusinessReviews] = useState([]);
  const [businessPhotos, setBusinessPhotos] = useState([]);

  useEffect(() => {
    const backendData = axios.get(`${API}/businesses/${id}`);
    const googleData = axios.get(
      `${API}/places/details?&place_id=${placeId}&key=${API_key}`
    );

    Promise.all([backendData, googleData])
      .then((res) => {
        // console.log(res[1].data["result"]["opening_hours"]["businessHours"]);
        setBusiness(res[0].data);
        placeId && setBusinessDataFromAPI(res[1].data["result"]);
        placeId &&
          setBusinessHours(
            res[1].data["result"]["opening_hours"]["weekday_text"]
          );
        placeId &&
          setBusinessOpen(res[1].data["result"]["opening_hours"]["open_now"]);
        placeId && setBusinessReviews(res[1].data["result"]["reviews"]);
        placeId && setBusinessPhotos(res[1].data["result"]["photos"]);
      })
      .catch((c) => console.error("catch", c));
  }, [placeId, id]);

  console.log(
    "data from api",
    businessDataFromAPI
    // "data from backend",
    // business
  );

  let [page, setPage] = useState(1);
  const PER_PAGE = 1;

  const count = Math.ceil(businessReviews.length / PER_PAGE);
  const allReviews = usePagination(businessReviews, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    allReviews.jump(p);
  };

  const { name, address, contact_num, img, website, is_store } = business;

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

  const handleDelete = (id) => {
    axios
      .delete(`${API}/businesses/${id}/comments/${id}`)
      .then(
        (response) => {
          const copyCommentArray = [...comments];
          const indexDeletedComment = copyCommentArray.findIndex((comment) => {
            return comment.id === id;
          });
          copyCommentArray.splice(indexDeletedComment, 1);
          setComments(copyCommentArray);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };

  const handleEdit = (updatedComment) => {
    axios
      .put(
        `${API}/businesses/${id}/comments/${updatedComment.id}`,
        updatedComment
      )
      .then((response) => {
        const copyCommentArray = [...comments];
        const indexUpdatedComment = copyCommentArray.findIndex((comment) => {
          return comment.id === updatedComment.id;
        });
        copyCommentArray[indexUpdatedComment] = response.data;
        setComments(copyCommentArray);
      })
      .catch((c) => console.warn("catch", c));
  };

  function addToFavorites() {
    console.log(currentUser.uid);
    axios.post(`${API}/users/user/${currentUser.uid}/favorites`, business);
  }

  const details = [
    {
      comp: (
        <div className="BusinessPage__Details__Expanded__Details__About">
          <h4>About</h4>
          <p>{business.description}</p>
        </div>
      ),
    },
    {
      comp: (
        <div>
          <h4>Reviews</h4>
          {allReviews.currentData().map((comment, index) => (
            <Comment
              key={index}
              comment={comment}
              handleDelete={handleDelete}
              handleSubmit={handleEdit}
            />
          ))}
          <br />
          <Pagination
            style={{ justifyContent: "center", display: "flex" }}
            count={count}
            size="medium"
            page={page}
            variant="outlined"
            shape="rounded"
            onChange={handleChange}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="BusinessPage">
      <div className="BusinessPage__Details">
        <div className="BusinessPage__Details__Header">
          <h1>{name || businessDataFromAPI.name}</h1>
          <Button
            variant="warning"
            onClick={() => {
              setFavorite(!favorite);
              addToFavorites();
            }}
          >
            {!favorite ? (
              <i className="fa-regular fa-star" id="unfavorite"></i>
            ) : (
              <i className="fa-solid fa-star" id="favorite"></i>
            )}
          </Button>
        </div>
        <div className="BusinessPage__Details__Rating">
          {businessDataFromAPI && (
            <span>
              <StarRatingAndReviews
                rating={businessDataFromAPI.rating}
                reviews={businessReviews}
              />
            </span>
          )}
          {businessDataFromAPI.price_level && (
            <span className="BusinessPage__Details__Rating__Price">
              <h6>Price Level: {businessDataFromAPI.price_level}</h6>
            </span>
          )}
        </div>
        <div className="BusinessPage__Details__Contact">
          {!is_store ? (
            <a href={website ? website : "N/A"} target="*">
              Online Only
            </a>
          ) : (
            <p>
              <i className="fa-solid fa-location-dot"></i>{" "}
              <a href={`http://maps.google.com/?q=${name}`} target="*">
                {businessDataFromAPI.formatted_address || address}
              </a>
            </p>
          )}
          {/* <a href="#"> */}
          <i className="fa-solid fa-phone"></i>{" "}
          {businessDataFromAPI.formatted_phone_number || contact_num || "N/A"}
          {/* </a> */}
          <p>
            <i className="fa-solid fa-laptop"></i>{" "}
            {website && (
              <a href={website} target="*">
                Website
              </a>
            )}
          </p>
          <span onClick={() => setShowHours(!showHours)}>
            <i className="fa-regular fa-clock"></i>{" "}
            <span className="BusinessPage__Details__Contact__Hours">
              {!businessOpen ? "Closed now:" : "Open now:"}
            </span>{" "}
            See all hours <i className="fa-solid fa-circle-info"></i>{" "}
          </span>
          {showHours && (
            <BusinessHours
              business={business}
              businessHours={businessHours}
              showHours={showHours}
              setShowHours={setShowHours}
            />
          )}
        </div>
        <div className="BusinessPage__Details__Expanded">
          <div className="BusinessPage__Details__Img">
            {businessPhotos.length !== 0 && (
              <BusinessPhotos photos={businessPhotos} />
            )}
          </div>
          <div className="BusinessPage__Details__Container">
            <div className="BusinessPage__Details__Expanded__Details">
              <Carousel autoPlay={false}>
                {details.map((item, i) => {
                  return (
                    <Paper key={i}>
                      <div style={{ paddingTop: "20px" }}>{item.comp}</div>
                    </Paper>
                  );
                })}
              </Carousel>
            </div>
            <div className="BusinessPage__Details__Expanded__Location__Map">
              <ShowMap business={business} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
