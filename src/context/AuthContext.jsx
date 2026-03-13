import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_EMAIL, MOCK_PASSWORD } from '../constants/config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('dpr_registered_users');
    if (saved) return JSON.parse(saved);
    // Initial mock user
    const initialUsers = [{
      name: 'Site Engineer',
      email: MOCK_EMAIL,
      password: MOCK_PASSWORD,
      role: 'engineer'
    }];
    localStorage.setItem('dpr_registered_users', JSON.stringify(initialUsers));
    return initialUsers;
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dpr_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem('dpr_user');
      return null;
    }
  });

  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('dpr_dark_mode') === 'true'
  );

  // Sync users to localStorage
  useEffect(() => {
    localStorage.setItem('dpr_registered_users', JSON.stringify(users));
  }, [users]);

  // Initialize theme
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const sessionUser = { ...foundUser };
    delete sessionUser.password; // Don't store password in session

    setUser(sessionUser);
    localStorage.setItem('dpr_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const register = (name, email, password) => {
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }

    const newUser = {
      name,
      email,
      password,
      role: 'engineer' // Default role
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dpr_user');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('dpr_dark_mode', newVal);
      return newVal;
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated: !!user, 
      darkMode, 
      toggleDarkMode 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;


// @module AeroSite
 
