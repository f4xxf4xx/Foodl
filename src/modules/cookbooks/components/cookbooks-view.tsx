import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import { Cookbook } from "modules/cookbooks/models";
import {
  fetchCookbooksAsync,
} from "modules/cookbooks/store/cookbooks-actions";
import { auth } from "firebase-config";
import CookbookCard from "modules/cookbooks/components/cookbook-card";
import styled from "styled-components";
import { Theme } from "theme";
import NewCookbookModal from "modules/cookbooks/components/new-cookbook-modal";

const StyledCookbooks = styled.div<{ theme: Theme }>`
  display: flex;
`;

const CookbooksView = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: ApplicationState) => state.cookbooks.isLoading
  );
  const uid = auth.currentUser.uid;
  const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);
  const [privacy, setPrivacy] = useState(null)
  const [newCookbookModalOpened, setNewCookbookModalOpened] = useState(false)

  useEffect(() => {
    dispatch(fetchCookbooksAsync(uid, privacy, setCookbooks))
  }, [uid, dispatch, privacy]);

  const renderCookbooks = () => {
    return (
      <>
        <StyledCookbooks>
          {isLoading ? <h1>Loading...</h1> : cookbooks.map((cookbook) => <CookbookCard key={cookbook.id} cookbook={cookbook} />)}
        </StyledCookbooks>
      </>
    );
  };

  return (
    <Container>
      <NewCookbookModal visible={newCookbookModalOpened}/>
      <h3>My cookbooks</h3>
      <button onClick={() => setNewCookbookModalOpened(true)}>New cookbook</button>
      <button onClick={() => setPrivacy("public")}>Public</button>
      <button onClick={() => setPrivacy("private")}>Private</button>
      {renderCookbooks()}
    </Container>
  );
};

export default CookbooksView;
