import React from "react";
import Link from "next/link";

interface TableOfContentsProps {
  toc: Array<{
    id: string;
    text: string;
    children?: Array<{ id: string; text: string }>;
  }>;
}

export const TableOfContents = ({ toc }: TableOfContentsProps) => {
  return (
    <nav className="blog-detail__toc">
      <h2 className="blog-detail__toc-title">Table of Contents</h2>
      <ul className="blog-detail__toc-list">
        {toc.map((item) => (
          <li key={item.id} className="blog-detail__toc-list-item">
            <Link href={`#${item.id}`} className="blog-detail__toc-list-link">
              {item.text}
            </Link>
            {item.children && (
              <ul className="blog-detail__toc-list-sublist">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={`#${child.id}`}
                      className="blog-detail__toc-list-link blog-detail__toc-list-link--child"
                    >
                      {child.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
