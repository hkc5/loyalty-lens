
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Customer, SalesAssociate, mockCustomers, mockSalesAssociates } from '@/lib/data';

type UserType = 'customer' | 'sales_associate' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userType: UserType;
  currentUser: Customer | SalesAssociate | null;
  loginAsCustomer: (identifier: string) => boolean;
  loginAsSalesAssociate: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(null);
  const [currentUser, setCurrentUser] = useState<Customer | SalesAssociate | null>(null);

  const loginAsCustomer = (identifier: string): boolean => {
    const customer = mockCustomers.find(
      cust => cust.email === identifier || cust.phone === identifier
    );

    if (customer) {
      setIsAuthenticated(true);
      setUserType('customer');
      setCurrentUser(customer);
      return true;
    }
    return false;
  };

  const loginAsSalesAssociate = (email: string): boolean => {
    const associate = mockSalesAssociates.find(associate => associate.email === email);
    
    if (associate) {
      setIsAuthenticated(true);
      setUserType('sales_associate');
      setCurrentUser(associate);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        currentUser,
        loginAsCustomer,
        loginAsSalesAssociate,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
