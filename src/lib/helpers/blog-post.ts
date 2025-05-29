import React from "react";

export const cleanMarkdownContent = (content: string) => {
  return content.replace(/\n\s+/g, "\n").replace(/\n+/g, "\n").trim();
};

export const generateTableOfContents = (content: string) => {
  const lines = content.split("\n");
  const toc: Array<{
    id: string;
    text: string;
    level: number;
    children?: Array<{ id: string; text: string }>;
  }> = [];

  let currentH2: { id: string; text: string } | null = null;

  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      const text = h2Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      currentH2 = { id, text };
      toc.push({ id, text, level: 2 });
    }

    const h3Match = line.match(/^###\s+(.+)/);
    if (h3Match && currentH2) {
      const text = h3Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");

      const parent = toc.find((item) => item.id === currentH2?.id);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push({ id, text });
      }
    }
  });

  return toc;
};

export const createHeadingRenderer = (level: number) => {
  const HeadingComponent = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingText = String(children);
    const slug = headingText
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    return React.createElement(`h${level}`, { ...props, id: slug }, children);
  };
  return HeadingComponent;
};

export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}
