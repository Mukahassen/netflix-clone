// Import necessary modules and components
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

// Create an authentication context
const AuthContext = createContext();

// Create a provider component for the authentication context
export function AuthContextProvider({ children }) {
    // Initialize user state
    const [user, setUser] = useState({});

    // Function to sign up a user
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc(doc(db, 'users', email), {
            savedShows: []
        });
    }

    // Function to log in a user
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Function to log out a user
    function LogOut() {
        return signOut(auth);
    }

    // Use useEffect to set up an auth state change listener
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    // Provide the authentication context value to child components
    return (
        <AuthContext.Provider value={{ signUp, login, LogOut, user }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook to access the authentication context
export function UserAuth() {
    return useContext(AuthContext);
}
