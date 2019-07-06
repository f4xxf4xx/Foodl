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

describe("Database rules", () => {
  it("should deny guess to look at recipes", async () => {
    const db = authedApp(null);
    await firebase.assertFails(db.collection("recipes").get());
  });

  it("should only allow a user to consult his own cart", async () => {
    const db = authedApp({ uid: "alice" });
    await firebase.assertFails(db.collection("carts").doc("bob").get());
    await firebase.assertSucceeds(db.collection("carts").doc("alice").get());
  });
});