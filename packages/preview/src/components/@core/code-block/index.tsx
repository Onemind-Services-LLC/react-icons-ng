import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/night-owl.css";
import React, { useEffect, useRef } from "react";
import { IoClipboard } from "@onemind-services-llc/react-icons-ng/io5";

// Register only the needed languages(smaller bundle, faster build)
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("jsx", javascript);

type CodeBlockProps = {
  code: string;
  language: "jsx" | "bash";
};

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) hljs.highlightElement(codeRef.current);
  }, [code, language]);

  const copyToClipboard = () => {
    copy(code);
    toast.success("Copied to clipboard");
  };

  return (
    <pre className="code">
      <a onClick={copyToClipboard} className="prism-code--copy">
        <IoClipboard />
      </a>
      <code ref={codeRef} className={`language-${language}`}>
        {code.trim()}
      </code>
    </pre>
  );
}
