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

function app() {
  return firebase
    .initializeTestApp({ projectId })
    .firestore();
}

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId });
});

beforeAll(async () => {
  await firebase.loadFirestoreRules({ projectId, rules });
});

afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
  console.log(`View rule coverage information at ${coverageUrl}\n`);
});

/*
 * ============
 *    Tests
 * ============
 */

describe("Recipes rules", () => {
  it("should deny guess to read or write recipes", async () => {
    //arrange
    const db = authedApp(null);
    //assert
    await firebase.assertFails(db.collection("recipes").get());
    await firebase.assertFails(db.collection("recipes").doc("recipe").set({}));
  });

  it("should allow a user to consult or create his own recipes", async () => {
    //arrange    
    const authDbAlice = authedApp({ uid: "alice" });
    //act
    //assert
    await firebase.assertSucceeds(authDbAlice.collection("recipes").doc("recipe").set({ uid: "alice" }));
    await firebase.assertSucceeds(authDbAlice.collection("recipes").doc("recipe").get());
  });

  it("should not allow a user to consult someone else's recipe", async () => {
    //arrange    
    const authDbAlice = authedApp({ uid: "alice" });
    const authDbBob = authedApp({ uid: "bob" });
    //act
    await authDbAlice.collection("recipes").doc("recipe").set({ uid: "alice" });
    //assert
    await firebase.assertFails(authDbBob.collection("recipes").doc("recipe").get());
    await firebase.assertSucceeds(authDbAlice.collection("recipes").doc("recipe").get());
  });
  
  it("should not allow a user to create a recipe for another user", async () => {
    //arrange    
    const authDbAlice = authedApp({ uid: "alice" });
    const authDbBob = authedApp({ uid: "bob" });
    //act
    //assert
    await firebase.assertFails(authDbBob.collection("recipes").doc("recipe").set({ uid: "alice" }));
    await firebase.assertFails(authDbAlice.collection("recipes").doc("recipe").set({ uid: "bob"}));
  });
});

describe("Cart rules", () => {
  it("should only allow a user to consult his own cart", async () => {
    //arrange
    const authDbAlice = authedApp({ uid: "alice" });
    //act
    authDbAlice.collection("carts").doc("bob").set({});
    authDbAlice.collection("carts").doc("alice").set({});
    //assert
    await firebase.assertFails(authDbAlice.collection("carts").doc("bob").get());
    await firebase.assertSucceeds(authDbAlice.collection("carts").doc("alice").get());
  });
});