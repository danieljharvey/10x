import React from "react";
import MonacoEditor from "react-monaco-editor";

interface EditorProps {
  code: string;
  setCode: (a: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ code, setCode }) => {
  const onChange = (newValue: string, e: any) => {
    setCode(newValue);
  };
  const editorDidMount = () => {
    // trigger typechecker
    setCode(code);
  };
  const options = {
    selectOnLineNumbers: true
  };
  return (
    <>
      <MonacoEditor
        width="500"
        height="300"
        language="typescript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </>
  );
};
