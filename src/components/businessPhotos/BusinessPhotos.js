import "./BusinessPhotos.scss";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const API_key = process.env.REACT_APP_GOOGLE_API_KEY;

const BusinessPhotos = ({ photos }) => {
  return (
    <Carousel
      className="BusinessPhotos"
      navButtonsProps={{
        style: {
          backgroundColor: "black",
          borderRadius: 10,
        },
      }}
      indicatorIconButtonProps={{
        style: {
          padding: "7px",
          color: "gold",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor: "gray",
        },
      }}
    >
      {photos.map((item) => (
        <Paper style={{ width: "50%" }}>
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photo_reference}&key=${API_key}`}
            alt="business-reference"
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default BusinessPhotos;
