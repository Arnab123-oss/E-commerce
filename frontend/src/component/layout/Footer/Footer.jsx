import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillGithub,
AiFillTwitterCircle
} from "react-icons/ai";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download Our AP4</h4>
        <p>Download App for Android andios mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>E-commerce</h1>
        <p>High Quality is our first priority.</p>

        <p>Copyright 2023 &copy; GhoshArnab</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>

        <a href="https://twitter.com" target="blank">
          <AiFillTwitterCircle />
        </a>
        <a href="https://youtube.com" target="blank">
          <AiFillYoutube />
        </a>
        <a href="https://github.com" target="blank">
          <AiFillGithub />
        </a>
        <a href="https://instagram.com" target="blank">
          <AiFillInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
