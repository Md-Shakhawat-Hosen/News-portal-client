import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase-config";
import axios from "axios";
const auth = getAuth(app);

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [roleUser, setRoleUser] = useState([]);

  useEffect(() => {
    if(user?.email){
        axios
          .get(`http://localhost:5000/users?email=${user?.email}`)
          .then((res) => setRoleUser(res.data[0].role));
    }
  }, [user?.email]);
//   console.log(roleUser)


  const createUserEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const userUpdateProfile = (name, image) => {
    console.log(name, image);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const constInfo = {
    createUserEmail,
    user,
    loading,
    signInEmail,
    logOut,
    userUpdateProfile,
    signInGoogle,
    roleUser
  };
  return (
    <AuthContext.Provider value={constInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;