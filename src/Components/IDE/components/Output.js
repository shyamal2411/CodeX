import React from "react";

export default function Output(props) {
  return (
    <>
      <div className="outputComponent">
        <div className="heading">Output</div>
        <div className="output">
          <span>{props.out}</span>
        </div>
      </div>
    </>
  );
}
