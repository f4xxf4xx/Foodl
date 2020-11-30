import React, { useState, useEffect } from "react";
import { AnimateSharedLayout } from "framer-motion";
import { Article, Props as ArticleProps } from "pages/LandingPage/Article";

interface Props {
  articles: ArticleProps[];
}

export const ArticleList: React.FC<Props> = props => {
  const [currentArticle, setCurrentArticle] = useState("");
  const intersectThreshold = 1.0;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const target = entry.target;
      if (entry.intersectionRatio >= intersectThreshold &&
          target instanceof HTMLElement) {
        setCurrentArticle(target.dataset.id);
      }
    });
  }, { threshold: intersectThreshold });

  return (
    <AnimateSharedLayout>
      {props.articles.map(article => (
        <Article
          id={article.id}
          key={article.id}
          accent={article.accent}
          inverted={article.inverted}
          observer={observer}
          isCurrent={currentArticle === article.id}
        >
          {article.children}
        </Article>
      ))}
    </AnimateSharedLayout>
  );
}