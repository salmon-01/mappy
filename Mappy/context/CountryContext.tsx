import React, { createContext, useState, ReactNode, useContext } from 'react';
import { CountryContextType, GeoJsonFeature } from '~/types';

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
  const [selectedCountry, setSelectedCountry] = useState<GeoJsonFeature | null>(null); 

  return (
    <CountryContext.Provider
      value={{
        visitedCountries,
        wishlistCountries,
        selectedCountry, 
        setVisitedCountries,
        setWishlistCountries,
        setSelectedCountry, 
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryProvider };
