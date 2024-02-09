import React, { useState } from "react";
import axios from "axios"
import "./ReferBusiness.scss";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Checkbox, FormGroup } from "@mui/material";

const API = process.env.REACT_APP_API_URL;

const ReferBusiness = () => {
  const [ownedBusiness, setOwnedBusiness] = useState(null);
  const [formDetails, setFormDetails] = useState({
    business_name: "",
    website: "",
    phone: "",
    email: "",
    instagram: "",
    facebook: "",
    twitter: "",
  });
  const [website, setWebsite] = useState(false);
  const [phone, setPhone] = useState(false);
  const [email, setEmail] = useState(false);
  const [instagram, setInstagram] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [twitter, setTwitter] = useState(false);

  let navigate = useNavigate();

  function handleText(e) {
    setFormDetails({...formDetails, [e.target.id]: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${API}/referrals`, formDetails)
      .then(() => {
          navigate("/")
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="ReferBusiness">
      <div className="ReferBusiness__Details">
        <Button variant="contained" onClick={() => navigate("/")}>
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
          <FormControl id="owned" onSubmit={handleSubmit}>
            <FormLabel
              id="owned"
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                "&.Mui-focused": { color: "#666" },
              }}
            >
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
            {ownedBusiness === false && (
              <>
                <br />
                <FormLabel
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    "&.Mui-focused": { color: "#666" },
                  }}
                >
                  What's the business name?
                </FormLabel>
                <TextField
                  required
                  id="business_name"
                  onChange={handleText}
                  label="Required"
                  variant="standard"
                  placeholder="e.g Fat Fowl"
                  value={formDetails.business_name}
                />
                <br />
                <FormLabel
                  sx={{
                    fontWeight: "bold",
                    fontSize: 20,
                    "&.Mui-focused": { color: "#666" },
                  }}
                >
                  How should we contact this business?
                </FormLabel>
                <p>Select how we should contact this business</p>
                <FormGroup
                  sx={{ display: "grid" }}
                  className="ReferBusiness__Form__Checkboxes"
                >
                <FormControlLabel
                    control={<Checkbox />}
                    label="Website"
                    onClick={() => setWebsite(!website)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Phone Number"
                    onClick={() => setPhone(!phone)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Email Address"
                    onClick={() => setEmail(!email)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Instagram"
                    onClick={() => setInstagram(!instagram)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Facebook"
                    onClick={() => setFacebook(!facebook)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Twitter"
                    onClick={() => setTwitter(!twitter)}
                  />
                </FormGroup>
                <br />
                {website && (
                  <>
                    {" "}
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "#666" },
                      }}
                    >
                      Website
                    </FormLabel>
                    <TextField
                      required
                      id="website"
                      onChange={handleText}
                      label="Required"
                      variant="standard"
                      placeholder="e.g www.melanteddiamonds.com"
                      value={formDetails.website}
                    />
                    <br />
                  </>
                )}

                {phone && (
                  <>
                    {" "}
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "#666" },
                      }}
                    >
                      Phone Number
                    </FormLabel>
                    <TextField
                      required
                      id="phone"
                      onChange={handleText}
                      label="Required"
                      variant="standard"
                      placeholder="e.g (xxx) xxx - xxxx"
                      value={formDetails.phone}
                    />
                    <br />
                  </>
                )}

                {email && (
                  <>
                    {" "}
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "#666" },
                      }}
                    >
                      Email Address
                    </FormLabel>
                    <TextField
                      required
                      id="email"
                      onChange={handleText}
                      label="Required"
                      variant="standard"
                      placeholder="e.g melanateddiamonds@gmail.com"
                      value={formDetails.email}
                    />
                    <br />
                  </>
                )}

                {instagram && (
                  <>
                    {" "}
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "#666" },
                      }}
                    >
                      Instagram
                    </FormLabel>
                    <TextField
                      required
                      id="instagram"
                      onChange={handleText}
                      label="Required"
                      variant="standard"
                      placeholder="e.g instagram.com/melanateddiamonds"
                      value={formDetails.instagram}
                    />
                    <br />
                  </>
                )}

                {facebook && (
                  <>
                    {" "}
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "#666" },
                      }}
                    >
                      Facebook
                    </FormLabel>
                    <TextField
                      required
                      id="facebook"
                      onChange={handleText}
                      label="Required"
                      variant="standard"
                      placeholder="e.g facebook.com/melanateddiamonds"
                      value={formDetails.facebook}
                    />
                    <br />
                  </>
                )}

                {twitter && (
                  <>
                    {" "}
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        fontSize: 18,
                        "&.Mui-focused": { color: "#666" },
                      }}
                    >
                      Twitter / X
                    </FormLabel>
                    <TextField
                      required
                      id="twitter"
                      onChange={handleText}
                      label="Required"
                      variant="standard"
                      placeholder="e.g twitter.com/melanateddiamonds"
                      value={formDetails.twitter}
                    />
                    <br />
                  </>
                )}

                <Button
                  size="large"
                  sx={{ width: "55%", m: "auto" }}
                variant="contained"
                onClick={handleSubmit}
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
