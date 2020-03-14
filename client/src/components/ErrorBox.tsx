import * as React from "react";

import styled from "styled-components";

interface BoxProps {
  isError: boolean;
}

const Box = styled.div<BoxProps>`
  background-color: lightgrey;
  padding: 16px;
  ${props => (props.isError ? `border: 2px red solid;` : `border: none;`)}
`;

interface ErrorBoxProps {
  errors: string[];
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ errors }) => (
  <Box isError={Boolean(errors.length > 0)}>
    <code>
      {errors.length > 0 ? (
        errors.map((error: string, key) => <pre key={key}>{error}</pre>)
      ) : (
        <span role="img">👍</span>
      )}
    </code>
  </Box>
);
