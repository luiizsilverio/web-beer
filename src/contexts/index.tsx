import { createContext, ReactNode, useContext, useState } from "react";

interface IBeerContext {
  menuOpen: boolean
  toggleMenu(): void
}

const BeerContext = createContext<IBeerContext>({} as IBeerContext)

interface ProviderProps {
  children: ReactNode;
}

function BeerProvider ({ children }: ProviderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  }

  return (
    <BeerContext.Provider value={{ menuOpen, toggleMenu }}>
      {children}
    </BeerContext.Provider>
  )
}

function useBeerContext(): IBeerContext {
  const context = useContext(BeerContext)
  return context
}

export { BeerProvider, useBeerContext }
