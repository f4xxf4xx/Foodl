import React from "react";
import { Headline } from "components/Headline";
import { AnimatedCookbook } from "pages/LandingPage/AnimatedCookbook";
import { AnimatedSharing } from "pages/LandingPage/AnimatedSharing";
import { AnimatedGroceries } from "pages/LandingPage/AnimatedGroceries";
import { ArticleList } from "pages/LandingPage/ArticleList";

export const LandingPage: React.FC = () => {
  return (
    <ArticleList
      articles={[
        {
          id: "main",
          accent: (
            <Headline>
              <h1>The virtual cookbook.</h1>
              <p><b>Foodl</b> can assist you in <b>4</b> different ways.</p>
            </Headline>
          )
        },
        {
          id: "simple",
          accent: (
            <Headline>
              <h3>Cookbooks are meant to be simple.</h3>
              <p>
                Foodl is your virtual cookbook. It helps you organize your
                recipes in the most simple and intuitive way.
              </p>
            </Headline>
          ),
          children: <AnimatedCookbook />,
          inverted: true
        },
        {
          id: "sharing",
          accent: (
            <Headline>
              <h3>Food is all about sharing.</h3>
              <p>
                Foodl brings you closer to friends and family. It enables you
                to share your entire cookbook to the ones you love.
              </p>
            </Headline>
          ),
          children: <AnimatedSharing />
        },
        {
          id: "groceries",
          accent: (
            <Headline>
              <h3>Groceries shouldn’t take all day.</h3>
              <p>
                Foodl saves time by building your grocery list. Spend less
                time planning and more time cooking.
              </p>
            </Headline>
          ),
          children: <AnimatedGroceries />,
          inverted: true
        }
      ]}
    />
  );
}
