"use client";

import style from "./Markdown.module.scss";
import getReadme from "@/app/_services/getReadme";
import { Project } from "@/app/_types/Project";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Fragment, isValidElement, type ReactNode, useEffect, useId, useState } from "react";

let mermaidModulePromise: Promise<typeof import("mermaid")> | null = null;

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return getTextContent(node.props.children);
  return "";
}

async function getMermaid() {
  mermaidModulePromise ??= import("mermaid");
  return mermaidModulePromise;
}

function MermaidCode({ children, className }: { children?: ReactNode; className?: string }) {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const diagramId = useId().replace(/:/g, "");
  const isMermaid = typeof className === "string" && /\blanguage-mermaid\b/i.test(className);
  const code = getTextContent(children).replace(/\n$/, "");

  useEffect(() => {
    if (!isMermaid || !code) return;

    let ignore = false;

    async function renderDiagram() {
      try {
        const mermaid = await getMermaid();
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

        mermaid.default.initialize({
          startOnLoad: false,
          theme: isDarkMode ? "dark" : "default",
        });

        const { svg: nextSvg } = await mermaid.default.render(`mermaid-${diagramId}`, code);

        if (!ignore) {
          setSvg(nextSvg);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setSvg("");
          setError(err instanceof Error ? err.message : "Failed to render mermaid diagram.");
        }
      }
    }

    renderDiagram();

    return () => {
      ignore = true;
    };
  }, [code, diagramId, isMermaid]);

  if (!isMermaid) return <code className={className}>{children}</code>;

  if (error) {
    return (
      <pre>
        <code className={className}>{code}</code>
      </pre>
    );
  }

  if (!svg) return <code className={className}>{code}</code>;

  return <div data-name="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default function Markdown({ readme }: { readme: Project["readme"] | undefined }) {
  const [text, setText] = useState<string | null>();

  useEffect(() => {
    async function fetchReadme() {
      if (!readme) return;
      const readmeText = await getReadme(readme);
      setText(readmeText ?? "");
    }

    fetchReadme();
  }, [readme]);

  if (text == null) {
    return (
      <div className={style.skeleton}>
        <div className={style.title} />
        {Array.from({ length: 2 }, (_, idx) => (
          <Fragment key={idx}>
            <div className={style.line} />
            <div className={`${style.line} ${style.wide}`} />
            <div className={`${style.line} ${style.medium}`} />
            <div className={style.block} />
            <div className={style.line} />
            <div className={`${style.line} ${style.short}`} />
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <MarkdownPreview
      source={text}
      components={{
        code: ({ children, className }) => <MermaidCode className={className}>{children}</MermaidCode>,
      }}
    />
  );
}
