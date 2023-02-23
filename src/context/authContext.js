import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../services/firebase";


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    return (
        <UserContext.Provider value={createUser}>
            {children}
        </UserContext.Provider>
    )
};

export const UsersAuth = () => {
    return UserContext(UserContext)
};