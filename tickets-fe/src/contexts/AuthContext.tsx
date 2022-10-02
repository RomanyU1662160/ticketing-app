import React, { createContext, useEffect, ReactNode, useContext, useState } from "react";


type CurrentUser = {
    id: string
    fname: string
    lname: string
    email: string

}

type AuthContextProps = {
    currentUser: CurrentUser | undefined,
    isLogged: Boolean,
    authError: string | undefined,
    setIsLogged: React.Dispatch<React.SetStateAction<Boolean>>
    setAuthError: React.Dispatch<React.SetStateAction<string | undefined>>
}

const AuthContext = createContext({} as AuthContextProps);
export const useAuthContext = () => {
    return useContext(AuthContext)
}

type ProviderProps = {
    children: ReactNode
}

const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<CurrentUser>()
    const [isLogged, setIsLogged] = useState<Boolean>(false)
    const [authError, setAuthError] = useState<string>()

    const handleAuth = async () => {

        try {
            const res = await fetch(`${process.env.REACT_APP_AUTH_URL}/users/current-user`);
            const data = await res.json();

            if (data.authError) {
                setAuthError(data.authError[0])
                setIsLogged(false)
                return
            }

            setCurrentUser(data.currentUser);
            setIsLogged(true)


        } catch (error) {
            console.log(error)
            setAuthError("Error while checking the  logged user.")

        }
    }

    useEffect(() => {
        if (!currentUser) {
            handleAuth()
        }
    }, [currentUser])
    return <AuthContext.Provider value={{ currentUser, isLogged, authError, setIsLogged, setAuthError }}>

        {children}

    </AuthContext.Provider>

}

export default AuthProvider