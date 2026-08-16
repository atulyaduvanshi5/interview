import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  };

  return (
    <div className="code-block">
      <button
        className={`copy-btn ${copied ? "copied" : ""}`}
        onClick={handleCopy}
        type="button"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <Highlight code={code.trim()} language={language} theme={themes.nightOwl}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className="code-pre" style={style}>
            <code>
              {tokens.map((line, i) => {
                const { className, ...lineProps } = getLineProps({ line });
                return (
                  <div key={i} className={`code-line ${className}`} {...lineProps}>
                    <span className="code-line-number">{i + 1}</span>
                    <span className="code-line-content">
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
