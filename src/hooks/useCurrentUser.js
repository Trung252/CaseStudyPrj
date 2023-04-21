import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState({
    uid: "",
    email: "",
    displayName: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
        });
      }
    });

    return unsubscribe;
  }, []);

  return currentUser;
};

export default useCurrentUser;
