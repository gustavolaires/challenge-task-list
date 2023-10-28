import admin from 'firebase-admin'

const databaseURL = process.env.NEXT_PRIVATE_DATABASE_URL

const serviceAccount = {
  type: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_TYPE,
  project_id: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_PRIVATE_KEY,
  client_email: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  universe_domain: process.env.NEXT_PRIVATE_FIREBASE_ADMIN_UNIVERSE_DOMAIN,
};

export const initFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
  });
}