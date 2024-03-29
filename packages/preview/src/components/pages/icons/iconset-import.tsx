import CodeBlock from "@components/@core/code-block";
import React from "react";

export default function IconSetImport({ iconId }) {
  const importCode = `import { IconName } from "@onemind-services-llc/react-icons-ng/${iconId}";`;

  return (
    <>
      <h2>Import</h2>
      <CodeBlock language="jsx" code={importCode} />
    </>
  );
}
