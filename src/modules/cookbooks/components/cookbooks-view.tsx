import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ApplicationState } from "index";
import { Container } from "layout/container";
import { Cookbook } from "modules/cookbooks/models";
import {
  fetchCookbooksAsync,
} from "modules/cookbooks/store/cookbooks-actions";
import { auth } from "firebase-config";

const CookbooksView = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(
    (state: ApplicationState) => state.cookbooks.isLoading
  );
  const uid = auth.currentUser.uid;

  const [cookbooks, setCookbooks] = useState<Cookbook[]>([]);

  useEffect(() => {
    dispatch(fetchCookbooksAsync(uid, setCookbooks));
  }, [uid, dispatch]);

  const goToRecipesPage = (cookbookId: string) => () => {
    history.push(`/app/cookbooks/${cookbookId}`)
  };

  const renderCookbooks = () => {
    return (
      <>
        <div className="cookbooks">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
              cookbooks.map((cookbook) => (
                <div className="cookbook-card" key={cookbook.id} onClick={goToRecipesPage(cookbook.id)}>
                  <p>{cookbook.default ? "My personal cookbook" : cookbook.name}</p>
                  <img alt="placeholder" src="https://via.placeholder.com/150" />
                </div>
              ))
            )}
        </div>
      </>
    );
  };

  return (
    <Container>
      <h3>My cookbooks</h3>
      {renderCookbooks()}
    </Container>
  );
};

export default CookbooksView;
