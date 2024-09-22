import React, { createContext, useState, ReactNode, useContext } from 'react';

interface CountryContextType {
  visitedCountries: string[];
  wishlistCountries: string[];
  setVisitedCountries: (countries: string[]) => void;
  setWishlistCountries: (countries: string[]) => void;
}

// context with default values
const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const useCountryContext = (): CountryContextType => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountryContext must be used within a CountryProvider');
  }
  return context;
};

const CountryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visitedCountries, setVisitedCountries] = useState<string[]>([]); 
  const [wishlistCountries, setWishlistCountries] = useState<string[]>([]); 

  return (
    <CountryContext.Provider
      value={{
        visitedCountries,
        wishlistCountries,
        setVisitedCountries,
        setWishlistCountries,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryProvider };
