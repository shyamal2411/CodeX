import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { languages } from "./components/languages.js";
import Playground from "./components/Playground.js";
import axios from "axios";
import { sizes } from "./components/Size";

export function App() {
  const [currentLang, setCurrentLang] = useState(languages[1]);
  const [value, setValue] = useState("");
  const [inputData, setInputData] = useState("");
  const [running, setRunning] = useState(false);
  const [outputData, setOutputData] = useState("");
  const [fontSize, setFontSize] = useState(sizes[1]);

  function handleChange(v) {
    setValue(v);
  }

  // console.log(value);
  // console.log(currentLang.language_id);
  function handleInput(inp) {
    setInputData(inp);
  }
  // console.log(inputData);
  function changeFontSize(newFontSize, newFontSizeName) {
    setFontSize({ name: newFontSizeName, value: newFontSize });
  }

  function handleClick(newLang) {
    setCurrentLang(newLang);
    setValue(newLang.code);
  }

  const getOutput = async () => {
    setOutputData("");
    setRunning(true);

    if (!value.trim()) {
      setRunning(false);
      setOutputData("Source code cannot be blank.");
      return;
    }

    const encodedSourceCode = btoa(value);
    const encodedStdin = btoa(inputData);

    const submissionConfig = {
      method: "post",
      url: `https://${process.env.REACT_APP_JUDGE0_API_HOST}/submissions?base64_encoded=true`,
      headers: {
        "Content-Type": "application/json",
        "content-type": "application/json",
        "x-rapidapi-host": process.env.REACT_APP_JUDGE0_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_JUDGE0_API_KEY,
        useQueryString: true,
      },
      data: JSON.stringify({
        source_code: encodedSourceCode,
        language_id: currentLang.language_id,
        stdin: encodedStdin,
      }),
    };

    try {
      const response = await axios(submissionConfig);
      const submissionToken = response.data.token;

      const getResultConfig = {
        method: "get",
        url: `https://${process.env.REACT_APP_JUDGE0_API_HOST}/submissions/${submissionToken}`,
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "x-rapidapi-host": process.env.REACT_APP_JUDGE0_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_JUDGE0_API_KEY,
          useQueryString: true,
        },
      };

      const pollInterval = 1000;
      var resultResponse;
      do {
        resultResponse = await axios(getResultConfig);
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      } while (resultResponse.data.status.id <= 2);

      setRunning(false);

      if (resultResponse.data.status.id === 3) {
        setOutputData(resultResponse.data.stdout);
      } else {
        setOutputData(resultResponse.data.stderr);
      }
    } catch (error) {
      setRunning(false);
      console.log(error);
      setOutputData(error.message || "An error occurred.");
    }
  };

  return (
    <div>
      <Navbar
        changeFontSize={changeFontSize}
        changeLang={handleClick}
        currentLang={currentLang}
        languages={languages}
        execute={getOutput}
        loading={running}
        fontSizes={sizes}
        fontSizeName={fontSize.name}
      />
      <Playground
        currentLang={currentLang}
        key={currentLang.name}
        handleCode={handleChange}
        output={outputData}
        handleInput={handleInput}
        fontSize={fontSize.value}
      />
    </div>
  );
}
