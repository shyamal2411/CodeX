import React, { useState } from "react";
import { App as Ide } from "./Components/IDE/Ide";
export const ToggleContext = React.createContext(); //context API

export default function App() {
  return (
    <>
      {/* <h1>This is working</h1> */}
      <Ide />
    </>
  );
}
