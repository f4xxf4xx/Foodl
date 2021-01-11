import React, { useRef } from "react";
import styled, { withTheme } from "styled-components";
import { OverviewHeadline } from "modules/public/components/overview-headline";
import { OverviewFeatures } from "modules/public/components/overview-features";
import { Theme } from "theme";

export const OverviewView: React.FC = props => {
  const nextArticleRef = useRef<HTMLDivElement>();
  return (
    <>
      <OverviewHeadline />
      <OverviewFeatures />
    </>
  );
};
