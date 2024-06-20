import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Models } from 'react-native-appwrite'
import { getCurrentUser } from '@/lib/appwrite'

type User = Models.Document

export interface GlobalContextType {
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const result = await getCurrentUser()

        if (result) {
          setIsLoggedIn(true)
          setUser(result)
        } else {
          setIsLoggedIn(false)
          setUser(null)
        }
      } catch (error: any) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}>
      {children}
    </GlobalContext.Provider>
  )
}
