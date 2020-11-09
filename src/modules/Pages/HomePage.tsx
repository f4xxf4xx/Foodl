import React from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "index";
import { isAuthenticated } from "helpers/userHelper";

const HomePage = () => {
  const auth = useSelector((state: ApplicationState) => state.firebase.auth);

  return (
    <>
      {isAuthenticated(auth) ? (
        <h3>Welcome, {auth.displayName}</h3>
      ) : (
        <>
          <h3>Foodl</h3>
          <h6>An app for foodies</h6>
          <div>
            <div>
              <p>library_books</p>
              <p>
                Manage your own cookbook by creating recipes, and share the
                recipes to the people you love.
              </p>
            </div>
            <div>
              <p>shopping_cart</p>
              <p>
                Keep track of food you need to buy to make recipes, or for
                ingredients you are running low of.
              </p>
            </div>
            <div>
              <p>restaurant</p>
              <p>
                Share restaurants you suggest to your friends and keep a bucket
                list of restaurants you want to go to.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
