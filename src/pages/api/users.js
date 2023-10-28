import { initFirebaseAdmin } from "@/firebase/admin-config"

const firebaseAdminApp = initFirebaseAdmin()

export default async function handler(req, res) {
  const authorization = req.headers.authorization

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization header not found.' })
  }

  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Bearer token not found.' })
  }

  try {
    const {uid} = await firebaseAdminApp.auth().verifyIdToken(token)

    if (!uid) {
      return res.status(401).json({ message: 'User not authorized.' })
    }

    // User Authenticated
    const result = await listAllUsers()

    if (!Array.isArray(result)) {
      res.status(500).json(result)
    }

    res.status(200).json({users: result})
  } catch (error) {
    res.status(401).json({error: `${error}`, message: 'Invalid Token.' })
  }
}

const listAllUsers = async (nextPageToken, previousUserList = []) => {

  // List batch of users, 1000 at a time.
  const result = firebaseAdminApp
    .auth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      const newUsersList = listUsersResult.users.map((userRecord) => {
        return {
          uid: userRecord.uid,
          displayName: userRecord.displayName,
          email: userRecord.email,
          photoURL: userRecord.photoURL
        }
      })

      if (listUsersResult.pageToken) {
        
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken)
      } else {
        return previousUserList.concat(newUsersList)
      }

    })
    .catch((error) => {
      return {
        error: error,
        message: 'Failed to list users.'
      }
    })

  return result
}