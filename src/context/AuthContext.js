import { createContext, useContext, useEffect, useState } from "react";
import {auth} from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut ,onAuthStateChanged, updateCurrentUser } from "firebase/auth";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
   const [user, setUser] = useState({})

   function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
   }

   function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
   }

   function logOut() {
    return signOut(auth)
   }

   useEffect(() => {
     const unSubscribe = onAuthStateChanged(auth, (CurrentUser) => {
        setUser(CurrentUser);
     });
   
     return () => {
       unSubscribe();
     }
   }, [])
   

  return <AuthContext.Provider value={{signUp,logIn, logOut ,user}}>{children}</AuthContext.Provider>;
}

export function UserAuth() {
  return useContext(AuthContext);
}
