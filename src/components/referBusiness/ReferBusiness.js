import React from "react";
import "./ReferBusiness.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const ReferBusiness = () => {
  return (
    <div className="ReferBusiness">
      <div className="ReferBusiness__Details">
        <Button variant="contained">
          {" "}
          <ArrowBackIosIcon /> Back
        </Button>
        <br />
        <br />
        <h4>REFERRAL</h4>
        <h2>HELP BUILD OUR NETWORK</h2>
        <p>Refer a Black-owned Business.</p>
        <img src="https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2FBlack-Owned-Business-update.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.7602&fp-y=0.2304&h=415&q=88&w=622&s=1d59d8de18c91a5a11ac086afc61a598" />
      </div>
      <div className="ReferBusiness__Form">
        <FormControl>
          <FormLabel id="">
            Do you own the Black business you are trying to refer?
          </FormLabel>
          <RadioGroup row aria-labelledby="" name="row-radio-buttons-group">
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default ReferBusiness;
