import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCode, faExchangeAlt} from "@fortawesome/free-solid-svg-icons";


function NavBarPrefix(prop) {
  const logo = (<FontAwesomeIcon icon={faCode} size='3x' color='white' id='logo'/>);
  const switchIcon = (<FontAwesomeIcon icon={faExchangeAlt} size='1x' color='white' id='logo'/>);
  
  return (
  <div className="navBarPrefiix">
  <>
    <span id="name">&nbsp;&nbsp; SG</span>
  </>
  {/* // <ToggleContext.Consumer>

  // </ToggleContext.Consumer> */}
  </div>);
}

export default NavBarPrefix;
