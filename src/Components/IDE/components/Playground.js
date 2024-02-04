import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Row, Col } from "react-bootstrap";
import Input from "./Input";
import Output from "./Output";

function Playground(prop) {
  const [switchBackground, setSwitchBackground] = useState(true);

  return (
    <>
      <div className="playground">
        <Row>
          <Col>
            <Editor
              width="60vw"
              height="100vh"
              defaultLanguage={prop.currentLang.code}
              defaultValue={prop.currentLang.sampleCode}
              theme={switchBackground ? "vs-dark" : "vs-light"}
              onChange={(value) => prop.handleCode(value)}
              options={{ fontSize: prop.fontSize }}
            />
          </Col>
          <Col className="p-0">
            <Row>
              <Input inputHandler={prop.handleInput} />
            </Row>
            <Row>
              <Output out={prop.output} />
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Playground;
