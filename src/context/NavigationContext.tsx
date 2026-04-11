import { createContext, useContext, useState, type ReactNode } from 'react';

type PageView = 'home' | 'checkout';

interface NavigationContextType {
  currentPage: PageView;
  goToHome: () => void;
  goToCheckout: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const goToHome = () => setCurrentPage('home');
  const goToCheckout = () => setCurrentPage('checkout');

  return (
    <NavigationContext.Provider value={{ currentPage, goToHome, goToCheckout }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
