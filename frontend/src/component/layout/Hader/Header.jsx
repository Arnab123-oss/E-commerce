import React from "react";
import {BsSearchHeart} from "react-icons/bs"
import {FaLuggageCart} from "react-icons/fa"
import {RxAvatar} from "react-icons/rx"
import logo from "../../../images/logo.png";
import { ReactNavbar } from "overlay-navbar";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "rgba(247, 228, 196)",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(229, 122, 166)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "black",
  link1Margin: "1vmax",
  profileIconColor: "rgba(229, 122, 166)",
  searchIconColor: "rgba(229, 122, 166)",
  cartIconColor: "rgba(229, 122, 166)",
  profileIconColorHover: "black",
  searchIconColorHover: "black",
  cartIconColorHover: "black",
  cartIconMargin: "1vmax",
  searchIcon:true,
  SearchIconElement:BsSearchHeart,
  cartIcon :true,
  CartIconElement:FaLuggageCart,
  profileIcon :true,
  ProfileIconElement:RxAvatar

};

const Header = () => {
  return <ReactNavbar {...options}/>
};

// burgerColorHover= "#eb4034"
// logo={logo}
// logoWidth= "20vmax"
// navColor1= "white"
// logoHoverSize= "10px"
// logoHoverColor= "#eb4034"
// link1Text= "Home"
// link2Text= "Products"
// link3Text= "Contact"
// link4Text= "About"
// link1Url= "/"
// link2Url= "/products"
// link3Url= "/contact"
// link4Url= "/about"
// link1Size= "1.3vmax"
// link1Color= "red"
// nav1justifyContent= "flex-end"
// nav2justifyContent= "flex-end"
// nav3justifyContent= "flex-start"
// nav4justifyContent= "flex-start"
// link1ColorHover= "pink"
// link1Margin= "1vmax"
// profileIconUrl= "/login"
// profileIconColor= "rgba(35 35 350.8)"
// searchIconColor= "rgba(35 35 350.8)"
// cartIconColor= "rgba(35 35 350.8)"
// profileIconColorHover= "#eb4034"
// searchIconColorHover= "#eb4034"
// cartIconColorHover= "#eb4034"
// cartIconMargin= "1vmax"
// searchIcon={true}
// SearchIconElement={BsSearchHeart}



export default Header;


