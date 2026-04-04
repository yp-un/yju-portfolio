"use client";

import getReadme from "@/app/_services/getReadme";
import { Project } from "@/app/_types/Project";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useEffect, useState } from "react";

export default function Markdown({ readme }: { readme: Project["readme"] | undefined }) {
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchReadme() {
      if (!readme) return;
      const readmeText = await getReadme(readme);
      setText(readmeText ?? "");
    }

    fetchReadme();
  }, [readme]);

  return <MarkdownPreview source={text} />;
}
