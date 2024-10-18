import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext<any>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const signup = (username: string, password: string, role: string) => {
    const newUser = { username, password, role }; 
    setUser(newUser);
    return true;
  };

  const login = (username: string, password: string) => {
    if (user && user.username === username && user.password === password) {
      return { success: true, role: user.role }; 
    }
    return { success: false }; 
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
