import admin from 'firebase-admin'

const databaseURL = process.env.NEXT_PRIVATE_DATABASE_URL
const serviceAccount = require('@cert/challenge-task-list-firebase-adminsdk-o85kv-f2dea382de.json');

export const initFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
  });
}