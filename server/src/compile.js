const ts = require("typescript");

function compile(fileNames, options) {
  let program = ts.createProgram(fileNames, options);
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  const errors = allDiagnostics.map(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      );
      let message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n"
      );
      // need to subtract the line numbers from our types etc that we're smashed in
      return `(${line + 1},${character + 1}): ${message}`;
    } else {
      return ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    }
  });

  if (errors.length == 0) {
    return { _type: "Right", payload: "OK" };
  } else {
    return { _type: "Left", payload: errors };
  }
}

module.exports = {
  compile
};
