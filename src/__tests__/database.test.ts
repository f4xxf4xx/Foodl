import * as firebase from "@firebase/testing";
const fs = require("fs");

/*
 * ============
 *    Setup
 * ============
 */
const projectId = "foodl";
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;
const rules = fs.readFileSync("firestore.rules", "utf8");

function authedApp(auth) {
  return firebase
    .initializeTestApp({ projectId, auth })
    .firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId });
});

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map((app) => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

/*
 * ============
 *    Tests
 * ============
 */

describe("Recipes rules", () => {
  it("should deny guess to read or write recipes", async () => {
    // arrange
    const guessAuth = authedApp(null);
    // assert
    await firebase.assertFails(guessAuth.collection("recipes").get());
    await firebase.assertFails(guessAuth.collection("recipes").doc("recipe").set({}));
  });

  it("should allow a user to consult or create his own recipes", async () => {
    // arrange
    const aliceAuth = authedApp({ uid: "alice" });
    // act
    // assert
    await firebase.assertFails(aliceAuth.collection("recipes").get());
    await firebase.assertSucceeds(aliceAuth.collection("recipes").where("uid", "==", "alice").get());
    await firebase.assertSucceeds(aliceAuth.collection("recipes").doc("recipe").set({ uid: "alice" }));
    await firebase.assertSucceeds(aliceAuth.collection("recipes").doc("recipe").get());
  });

  it("should not allow a user to consult someone else's recipe", async () => {
    // arrange
    const aliceAuth = authedApp({ uid: "alice" });
    const bobAuth = authedApp({ uid: "bob" });
    // act
    await aliceAuth.collection("recipes").doc("recipe").set({ uid: "alice" });
    // assert
    await firebase.assertFails(bobAuth.collection("recipes").doc("recipe").get());
    await firebase.assertSucceeds(aliceAuth.collection("recipes").doc("recipe").get());
  });

  it("should only a user to create a recipe for itself", async () => {
    // arrange
    const aliceAuth = authedApp({ uid: "alice" });
    const bobAuth = authedApp({ uid: "bob" });
    // act
    // assert
    await firebase.assertSucceeds(aliceAuth.collection("recipes").doc("recipe").set({ uid: "alice" }));
    await firebase.assertFails(bobAuth.collection("recipes").doc("recipe").set({ uid: "alice" }));
  });
});

describe("Cart rules", () => {
  it("should only allow a user to consult his own cart", async () => {
    // arrange
    const aliceAuth = authedApp({ uid: "alice" });
    // act
    await aliceAuth.collection("carts").doc("alice").set({});
    // assert
    await firebase.assertFails(aliceAuth.collection("carts").get());
    await firebase.assertFails(aliceAuth.collection("carts").doc("bob").get());
    await firebase.assertFails(aliceAuth.collection("carts").doc("bob").set({}));
    await firebase.assertSucceeds(aliceAuth.collection("carts").doc("alice").get());
  });
});

describe("Ingredients rules", () => {
  it("should only allow a authenticated user to read and write ingredients", async () => {
    // arrange
    const guessAuth = authedApp(null);
    const aliceAuth = authedApp({ uid: "alice" });
    // assert
    await firebase.assertFails(guessAuth.collection("ingredients").get());
    await firebase.assertFails(guessAuth.collection("ingredients").doc("ingredient").set({}));
    await firebase.assertSucceeds(aliceAuth.collection("ingredients").get());
    await firebase.assertSucceeds(aliceAuth.collection("ingredients").doc("ingredient").set({}));
  });
});