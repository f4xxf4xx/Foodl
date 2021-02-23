import React, { } from "react";
import { useHistory } from "react-router-dom";
import { Cookbook } from "modules/cookbooks/models";
import styled from "styled-components";
import { Theme } from "theme";

interface Props {
  cookbook: Cookbook
}

const StyledCookbookCard = styled.div<{ theme: Theme }>`
  padding: 0 0 0 ${({ theme }) => theme.space.large}px;
  flex: 0 0 auto;
  border: 1px black solid;
  border-radius: 4px;
  flex: 1;
`;

const CookbookCard: React.FC<Props> = ({ cookbook }) => {
  const history = useHistory();

  const goToRecipesPage = (cookbookId: string) => () => {
    history.push(`/app/cookbooks/${cookbookId}`)
  };

  return (
    <StyledCookbookCard key={cookbook.id} onClick={goToRecipesPage(cookbook.id)}>
      <p>{cookbook.default ? "My personal cookbook" : cookbook.name}</p>
      <img alt="placeholder" src="https://via.placeholder.com/150" />
    </StyledCookbookCard>
  );
};

export default CookbookCard;
