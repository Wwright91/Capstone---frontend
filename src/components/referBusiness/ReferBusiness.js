import React, { useState } from "react";
import "./ReferBusiness.scss";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Checkbox, FormGroup } from "@mui/material";

const ReferBusiness = () => {
  const [ownedBusiness, setOwnedBusiness] = useState(null);

  // console.log(ownedBusiness);

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
        <p>Refer a Black-owned business.</p>
        <img
          src="https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2FBlack-Owned-Business-update.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.7602&fp-y=0.2304&h=415&q=88&w=622&s=1d59d8de18c91a5a11ac086afc61a598"
          alt="business owners"
        />
      </div>
      <div className="ReferBusiness__Form">
        <FormControl>
          <FormLabel id="" sx={{ fontWeight: "bold", fontSize: 20 }}>
            Do you own the Black business you are trying to refer?
          </FormLabel>
          <RadioGroup row aria-labelledby="" name="row-radio-buttons-group">
            <FormControlLabel
              value="Yes"
              control={<Radio />}
              label="Yes"
              onClick={() => setOwnedBusiness(true)}
            />
            <FormControlLabel
              value="No"
              control={<Radio />}
              label="No"
              onClick={() => setOwnedBusiness(false)}
            />
          </RadioGroup>
          {!ownedBusiness && (
            <>
              <br />
              <FormLabel sx={{ fontWeight: "bold", fontSize: 18 }}>
                What's the business name?
              </FormLabel>
              <TextField
                required
                id="standard-basic"
                label="Required"
                variant="standard"
                placeholder="e.g Fat Fowl"
              />
              <br />
              <FormLabel sx={{ fontWeight: "bold", fontSize: 20 }}>
                How should we contact this business?
              </FormLabel>
              <p>Select how we should contact this business</p>
              <FormGroup
                sx={{ display: "grid" }}
                className="ReferBusiness__Form__Checkboxes"
              >
                <FormControlLabel control={<Checkbox />} label="Website" />
                <FormControlLabel control={<Checkbox />} label="Phone Number" />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Email Address"
                />
                <FormControlLabel control={<Checkbox />} label="Instagram" />
                <FormControlLabel control={<Checkbox />} label="Facebook" />
                <FormControlLabel control={<Checkbox />} label="Twitter" />
              </FormGroup>
              <br />
              <Button
                size="large"
                sx={{ width: "55%", m: "auto" }}
                variant="contained"
              >
                Send Business Referral
              </Button>
            </>
          )}
        </FormControl>
      </div>
    </div>
  );
};

export default ReferBusiness;
