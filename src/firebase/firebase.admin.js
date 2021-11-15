const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../../private/feudalswag-firebase-adminsdk-cpdxn-6d5fd5eda4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = getFirestore();

const deleteAnonUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        //delete anon users from auth and firestore db
        if (userRecord.providerData.length === 0) {
          const userDoc = db.doc("users/" + userRecord.uid);
          userDoc.get().then((userDocSnapShot) => {
            if (userDocSnapShot.exists) {
              userDocSnapShot.ref.delete().then(() =>
                getAuth()
                  .deleteUser(userRecord.uid)
                  .then(() => console.log("deleted user:", userRecord.uid))
              );
            }
          });
        }
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        deleteAnonUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};
const deleteAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        //delete user in auth and firestore
        const userDoc = db.doc("users/" + userRecord.uid);
        userDoc.get().then((userDocSnapShot) => {
          if (userDocSnapShot.exists) {
            userDocSnapShot.ref.delete().then(() =>
              getAuth()
                .deleteUser(userRecord.uid)
                .then(() => console.log("deleted user:", userRecord.uid))
            );
          }
        });
      });
      if (listUsersResult.pageToken) {
        // delete next batch of users.
        deleteAnonUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    });
};


deleteAnonUsers();
// deleteAllUsers();
