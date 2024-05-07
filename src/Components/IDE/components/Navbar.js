import React from "react";
import { NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = (props) => {
  const fontSizes = props.fontSizes.map((size) => (
    <NavDropdown.Item
      key={size.name}
      onClick={() => props.changeFontSize(size.value, size.name)}
    >
      {size.name}
    </NavDropdown.Item>
  ));

  return (
    <div className="navbar p-3 border-b-2 border-slate-700">
      <span id="name" style={{ marginLeft: "20px" }}>
        Code <span style={{ color: "red" }}>X</span>
      </span>
      <div>
        <NavDropdown
          title={props.fontSizeName}
          menuVariant="dark"
          id="fontsize"
          style={{
            fontSize: `${props.fontSize}px`,
            marginLeft: "350px",
            padding: "10px",
          }}
        >
          {fontSizes}
        </NavDropdown>
      </div>
      <div>
        <NavDropdown
          title={props.currentLang.name}
          menuVariant="dark"
          id="language"
          style={{
            fontSize: `${props.fontSize}px`,
            marginLeft: "20px",
            padding: "10px",
          }}
        >
          {props.languages.map((lang) => (
            <NavDropdown.Item
              key={lang.name}
              onClick={() => props.changeLang(lang)}
            >
              {lang.name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </div>
      <div
        className="justify-content-start"
        style={{ marginRight: "400px", minWidth: "120px" }}
        id="runButton"
        onClick={props.execute}
      >
        <FontAwesomeIcon icon={faPlayCircle} />{" "}
        {!props.loading ? "Run" : "Running"}
      </div>
    </div>
  );
};

export default Navbar;
