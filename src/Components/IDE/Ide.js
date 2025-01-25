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

    const codeToExecute = value.trim() || currentLang.sampleCode;

    if (!codeToExecute.trim()) {
      setRunning(false);
      setOutputData("Source code cannot be blank.");
      return;
    }

    const encodedSourceCode = btoa(codeToExecute);
    const encodedStdin = btoa(inputData);

    const submissionConfig = {
      method: "post",
      url: `https://${process.env.REACT_APP_JUDGE0_API_HOST}/submissions?base64_encoded=true`,
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": process.env.REACT_APP_JUDGE0_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_JUDGE0_API_KEY,
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
        url: `https://${process.env.REACT_APP_JUDGE0_API_HOST}/submissions/${submissionToken}?base64_encoded=true`,
        headers: {
          "Content-Type": "application/json",
          "x-rapidapi-host": process.env.REACT_APP_JUDGE0_API_HOST,
          "x-rapidapi-key": process.env.REACT_APP_JUDGE0_API_KEY,
        },
      };

      const pollInterval = 1000;
      let resultResponse;
      do {
        resultResponse = await axios(getResultConfig);
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      } while (resultResponse.data.status.id <= 2);

      setRunning(false);

      if (resultResponse.data.status.id === 3) {
        setOutputData(atob(resultResponse.data.stdout));
      } else if (resultResponse.data.status.id === 6) {
        const compileOutput =
          atob(resultResponse.data.compile_output) ||
          "Compilation failed with no output.";
        setOutputData(`Compilation Error: ${compileOutput}`);
      } else {
        const errorOutput =
          atob(resultResponse.data.stderr) ||
          atob(resultResponse.data.status.description);
        setOutputData(`Error: ${errorOutput}`);
      }
    } catch (error) {
      setRunning(false);
      setOutputData(error.message || "An error occurred.");
    }
  };

  function handleKeyDown(event) {
    if (event.ctrlKey && event.key === "Enter") {
      getOutput();
    }
  }

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
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
