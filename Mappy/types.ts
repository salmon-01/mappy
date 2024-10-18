export interface AvatarPickerProps {
  selectedAvatar: string;
  setAvatar: (avatar: string) => void;
}

export interface BottomSheetContentProps extends CountryListPropsBase {
  selectedCountry: GeoJsonFeature | null;
  getCountryName: (isoCode: string) => string;
  updateCountryStatus: (isoCode: string, listType: 'visited' | 'wishlist') => void;
}

export interface ContinueButtonProps {
  onPress: () => void;
}

export interface CountryDetails {
  name: string;
  continent: string;
}

export interface CountryBottomSheetProps extends CountryListPropsBase {
  showVisited: boolean;
  onToggle: (value: boolean) => void;
  getCountryDetails: (isoCode: string) => CountryDetails | undefined;
}

export interface CountryListPropsBase {
  visitedCountries: string[];
  wishlistCountries: string[];
}

export interface CountryListProps {
  countries: string[];
  getCountryDetails: (isoCode: string) => CountryDetails | undefined;
  showVisited: boolean;
}

export interface CountryToggleProps {
  showVisited: boolean;
  onToggle: (value: boolean) => void;
}

export interface LoginButtonProps {
  provider: 'Google' | 'Apple';
  onPress: () => void;
}

export interface GeoJsonFeature {
  type: string;
  properties: {
    iso_3166_1_alpha_3: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
}

export interface MapProps extends CountryListPropsBase {
  updateCountryStatus: (isoCode: string, listType: 'visited' | 'wishlist') => Promise<void>;
}

export interface SettingsSheetProps {
  isVisible?: boolean;
  onClose: () => void;
  onClearMap: () => void;
  onLogout: () => void;
  onDeleteAccount: () => void;
}

export interface StatsProps {
  totalVisited: number;
  percentageOfWorld?: string;
  regionsVisited?: number;
  totalRegions?: number;
  favoriteRegion?: string;
}

export interface UserInputFormProps {
  username: string;
  setUsername: (value: string) => void;
  displayName: string;
  setDisplayName: (value: string) => void;
}

export interface UserProfileProps {
  username: string;
  avatar: string;
  onPress: () => void;
}

export interface CountryContextType extends CountryListPropsBase {
  selectedCountry: GeoJsonFeature | null;
  setVisitedCountries: React.Dispatch<React.SetStateAction<string[]>>;
  setWishlistCountries: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCountry: (country: GeoJsonFeature | null) => void;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export interface Country {
  code: string;
  name: string;
  continent: string;
  flag?: string;
}
