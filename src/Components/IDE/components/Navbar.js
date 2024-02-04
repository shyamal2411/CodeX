import React from "react";
import NavBarPrefix from "../../NavBarPrefix";
import { Col, NavDropdown } from "react-bootstrap";
import { languages } from "./languages";
import { sizes } from "./Size";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const fontSizes = [];
  const arr = [];

  for (let i = 0; i < languages.length; i++) {
    arr.push(
      <NavDropdown.Item onClick={() => props.changeLang(languages[i], i)}>
        {languages[i].name}
      </NavDropdown.Item>
    );
  }

  for (let i = 0; i < sizes.length; i++) {
    fontSizes.push(
      <NavDropdown.Item
        onClick={() => props.changeFontSize(sizes[i].value, sizes[i].name)}
      >
        {sizes[i].name}
      </NavDropdown.Item>
    );
  }

  return (
    <>
      <div className="navbar p-3 justify-centre">
        <span id="name" style={{ marginRight: "20px", marginLeft: "20px" }}>
          Code <span style={{ color: "red" }}>X</span>
        </span>
        {/* <Col className="ml-10 p-0"> */}
        <div>
          <NavDropdown
            title={props.fontSizeName}
            menuVariant="dark"
            id="fontsize"
            style={{ fontSize: "20px", marginLeft: "350px" }}
          >
            {fontSizes}
          </NavDropdown>
        </div>
        {/* </Col> */}
        {/* <Col className="m-0 p-0 bg-red"> */}
        <div>
          <NavDropdown
            title={props.currentLang.name}
            menuVariant="dark"
            id="language"
            style={{ fontSize: "20px" }}
          >
            {arr}
          </NavDropdown>
        </div>
        {/* </Col> */}

        {/* <Col> */}
        <div
          className="justify-content-start"
          style={{ marginRight: "400px" }}
          id="runButton"
          onClick={props.execute}
        >
          {/* <FontAwesomeIcon icon={faPlayCircle} size="1px" /> */}
          <FontAwesomeIcon
            icon={faPlayCircle}
            size="1x"
            spin={props.loading}
          />{" "}
          {!props.loading ? "Run" : "Running"}
        </div>
        {/* </Col> */}
      </div>
    </>
  );
};

export default Navbar;
