"use client";
import React from "react";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import { Highlight, themes } from "prism-react-renderer";
import { IoClipboard } from "@onemind-services-llc/react-icons-ng/io5";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const copyToClipboard = () => {
    copy(code);
    toast.success(`Copied to clipboard`);
  };

  return (
    <Highlight code={code.trim()} language={language} theme={themes.nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} code`} style={style}>
          <a onClick={copyToClipboard} className="prism-code--copy">
            <IoClipboard />
          </a>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
