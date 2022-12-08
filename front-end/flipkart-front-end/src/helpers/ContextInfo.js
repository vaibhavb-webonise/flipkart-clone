import { createContext, useContext, useReducer } from "react"

const UserContext = createContext();

const UserContextProvider = ({ reducer, children }) => {
    return (
        <UserContext.Provider value={useReducer(reducer)}>
            {children}
        </UserContext.Provider>
    )
}

const useUserValue = () => useContext(UserContext)
export { useUserValue, UserContextProvider }
