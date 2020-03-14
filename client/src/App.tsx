import React from "react";

import { ErrorBox } from "./components/ErrorBox";
import { Editor } from "./components/Editor";
import styled from "styled-components";
import { ConversionFunction } from "./types/types";

import { catToDog } from "./data/sample";

const axios = require("axios");
const debounce = require("lodash.debounce");

const getFunctionBody = (func: ConversionFunction): string =>
  func.from.typeInfo +
  "\n" +
  func.to.typeInfo +
  "\n" +
  `const typecheckMe = (input: ${func.from.name}): ${func.to.name} => {`;

const before = getFunctionBody(catToDog);

const after = `
}
`;

const OuterFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Column = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface Config {
  typecheckUrl: string;
}

const config: Config = {
  typecheckUrl: "http://localhost:3001/typecheck"
};

const updateTypechecking = (val: string, setErrors: (as: string[]) => void) => {
  const all = before + val + after;
  // Make a request for a user with a given ID
  axios
    .post(config.typecheckUrl, { code: all })
    .then(function(response: unknown) {
      setErrors([]);
      console.log(response);
    })
    .catch(function(error: any) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
    });
};

const debouncedTypchecking = debounce(updateTypechecking, 300);

export const App = () => {
  const [code, setCode] = React.useState("");
  const [errors, setErrors] = React.useState<string[]>([]);

  const onChange = (newCode: string) => {
    setCode(newCode);
    debouncedTypchecking(newCode, setErrors);
  };

  return (
    <OuterFlexBox>
      <Column>
        <code>
          <pre>{before}</pre>
        </code>
        <Editor code={code} setCode={onChange} />
        <code>
          <pre>{after}</pre>
        </code>
      </Column>
      <Column>
        <ErrorBox errors={errors} />
      </Column>
    </OuterFlexBox>
  );
};
