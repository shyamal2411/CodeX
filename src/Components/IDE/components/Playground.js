import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Row, Col, Button } from "react-bootstrap";
import Input from "./Input";
import Output from "./Output";

function Playground(props) {
  const [switchBackground, setSwitchBackground] = useState(true);

  const handleEditorChange = (value, event) => {
    props.handleCode(value);
  };

  const toggleTheme = () => {
    setSwitchBackground(!switchBackground);
  };

  return (
    <div className="playground">
      <Row>
        <Col>
          <Editor
            width="70vw"
            height="100vh"
            defaultLanguage={props.currentLang.code}
            defaultValue={props.currentLang.sampleCode}
            theme={switchBackground ? "vs-dark" : "vs-light"}
            onChange={handleEditorChange}
            options={{ fontSize: props.fontSize }}
          />
        </Col>
        <Col className="p-0">
          <Row>
            <Input inputHandler={props.handleInput} />
          </Row>
          <Row>
            <Output out={props.output} />
          </Row>
          <Row className="mt-3">
            <Col>
              <Button variant="primary" onClick={toggleTheme}>
                Toggle Theme
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Playground;
