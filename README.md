## Getting Started


## Working Locally
### Context
The package `firebase-tools` provides the _Firebase Local Emulator Suite_, allowing developpers to use locally emulated Firebase services instead of using production services and polluting production data.

Although many Firebase services can be emulated, some are purposely disabled, as explained below.

* **Authentication Emulator** - DISABLED

   The authentication emulator is primarily used to seed user data for integration testing. In our development workflow, we can use our _real_ accounts without polluting the production database. Hence, the emulator is not used.

* **Firestore Emulator** - ENABLED

   The Firestore emulator is used to provide a clean environment to the developper in which production data cannot be damaged. Hence, the Firestore Emulator MUST be used.

* **Realtime Database Emulator** - DISABLED

   The Realtime Database emulator is an alternative to Firestore. Since Firestore is favored in this project, this emulator is not used.

* **Functions Emulator** - DISABLED

   The Functions emulator should be used in development to prevent pollution and corruption of production data. However, Functions are not currently used in this project, so the emulator is disabled.

* **Hosting Emulator** - DISABLED

   The hosting emulator serves productions builds located in the `build/` folder. Hence, this is not a viable emulator for development purposes, because we would have to rebuild to test every changes. Live reloading does NOT work with this emulator.

### Setup
1. Make sure you have `firebase-tools` installed globally on your machine.
   ```
   $ npm i -g firebase-tools
   ```

2. Start the firebase emulators.
   ```
   $ firebase emulators:start --import=./test_data
   ```
   > You can now visit http://localhost:4000/ to view and edit Firestore emulator data. 
3. Run `npm start`, as usual.

4. If you want to save the Firestore db for the test user, use 
   ```
   $ firebase emulators:export ./test_data
   ```

## TODOs

- Update typing for firebase methods
- Update typing for all utility & db methods
- Review store necessary