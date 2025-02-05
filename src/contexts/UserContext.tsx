import { UserInfo } from 'firebase/auth'
import { ReactNode, createContext, useState } from 'react'

type User = UserInfo

type UserContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
})

function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
