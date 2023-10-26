import { createContext } from "react"

import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'

import { initFirebase } from "@/firebase/config"

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const firebaseApp = initFirebase()
  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth()

  return (
    <AuthContext.Provider value={{ auth, googleProvider, githubProvider, firebaseApp }}>
      { children }
    </AuthContext.Provider>
  )
}