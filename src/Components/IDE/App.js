import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { languages } from "./components/languages.js";
import Playground from "./components/Playground.js";
import axios from "axios";

export function App() {
  // languages compare function remaining intentionally.
  const [fontSizeName, setFontSizeName] = useState("Small");
  const [fontSize, setFontSize] = useState("18");
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [value, setValue] = useState("");
  const [inputData, setInputData] = useState("");
  const [running, setRunning] = useState(false);
  const [outputData, setOutputData] = useState("");

  function handleChange(v) {
    setValue(v);
  }

  function handleInput(inp) {
    setInputData(inp);
  }

  function changeFontSize(newFontSize, newFontSizeName) {
    setFontSize(newFontSize);
    setFontSizeName(newFontSizeName);
  }

  function handleClick(newLang) {
    setCurrentLang(newLang);
    setValue(newLang.code);
  }

  const getOutput = async () => {
    setOutputData("");
    setRunning(true);
    console.log(value);
    console.log(inputData);

    var data = JSON.stringify({
      code: value,
      language: currentLang.extension,
      input: inputData,
    });

    var config = {
      method: "post",
      url: "https://codex-api.herokuapp.com",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setOutputData(response.data.output);
        setRunning(false);
        console.log(response.data.output);
      })
      .catch(function (error) {
        setRunning(false);
        console.log(error);
        setOutputData(error);
      });
  };
  return (
    <div>
      <Navbar
        changeFontSize={changeFontSize}
        changeLang={handleClick}
        currentLang={currentLang}
        key={currentLang.code}
        execute={getOutput}
        loading={running}
        fontSize={fontSize}
        fontSizeName={fontSizeName}
      />
      <Playground
        currentLang={currentLang}
        key={currentLang.name}
        handleCode={handleChange}
        output={outputData}
        handleInput={handleInput}
        fontSize={fontSize}
      />
    </div>
  );
}
