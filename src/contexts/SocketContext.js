import { createContext } from "react"
import { io } from "socket.io-client";

export const SocketContext = createContext({})

export const SocketProvider = ({ children }) => {
  const socket = io()

  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  )
}