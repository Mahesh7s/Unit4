import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../services/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const registerUser = async (email, password, selectedRole) => {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await set(ref(db, `users/${userCred.user.uid}`), {
      email,
      role: selectedRole,
    });
    navigate('/'); // redirect to login
  };

  const loginUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirection will happen in App.jsx based on role
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    navigate('/'); // redirect to login
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const snap = await get(ref(db, `users/${currentUser.uid}/role`));
        if (snap.exists()) setRole(snap.val());
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, registerUser, loginUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
