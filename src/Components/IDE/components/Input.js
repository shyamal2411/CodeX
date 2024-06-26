import React from "react";
import "../Ide.css";

function Input(props) {
  const getInputValue = (e) => {
    props.inputHandler(e.target.value);
    e.preventDefault();
  };
  return (
    <div className="input">
      <div className="heading">Input</div>
      <textarea
        onChange={getInputValue}
        type="text"
        rows="5"
        cols="5"
        placeholder="Enter Input"
        id="inputTextArea"
      ></textarea>
    </div>
  );
}

export default Input;