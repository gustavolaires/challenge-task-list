import { createContext } from "react"

import { initDatabase } from "@/firebase/config"

export const DatabaseContext = createContext({})

export const DatabaseProvider = ({ children }) => {
  const database = initDatabase()

  return (
    <DatabaseContext.Provider value={{ database }}>
      { children }
    </DatabaseContext.Provider>
  )
}