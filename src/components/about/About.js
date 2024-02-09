import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="About">
      <div className="About__Img">
        <img
          src="https://lirp.cdn-website.com/adb74c7c/dms3rep/multi/opt/Black-Owned-Business-e1532457853693-640w.png"
          alt="black owned business"
        />
      </div>
      <br />
      <br />
      <h1>About Us</h1>
      <section>
        <h5>
          Melanated Diamonds emerged in June 2023 as a Capstone Project during
          my time at Pursuit Fellowship. Our mission is to support and promote
          black-owned businesses by creating a platform for consumers to connect
          with them, with the goal of increasing their visibility and helping
          them thrive. We aim is to promote entrepreneurship and economic equity
          within the black community, ultimately building a better and more
          inclusive economy <i>for all</i>.
        </h5>
      </section>
    </div>
  );
};

export default About;
