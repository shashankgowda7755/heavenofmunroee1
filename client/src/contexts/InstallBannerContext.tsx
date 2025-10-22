import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InstallBannerContextType {
  isInstallBannerVisible: boolean;
  setInstallBannerVisible: (visible: boolean) => void;
}

const InstallBannerContext = createContext<InstallBannerContextType | undefined>(undefined);

export const useInstallBanner = () => {
  const context = useContext(InstallBannerContext);
  if (!context) {
    throw new Error('useInstallBanner must be used within an InstallBannerProvider');
  }
  return context;
};

interface InstallBannerProviderProps {
  children: ReactNode;
}

export const InstallBannerProvider: React.FC<InstallBannerProviderProps> = ({ children }) => {
  const [isInstallBannerVisible, setInstallBannerVisible] = useState(false);

  return (
    <InstallBannerContext.Provider value={{ isInstallBannerVisible, setInstallBannerVisible }}>
      {children}
    </InstallBannerContext.Provider>
  );
};