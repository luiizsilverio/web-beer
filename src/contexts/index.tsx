import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import api from '@/services/api'
import { IConfig } from '../dtos'

interface IBeerContext {
  menuOpen: boolean
  toggleMenu(): void

  config: IConfig
  senha: string
  isAdmin: boolean
  checaAdmin: (key?: string) => Promise<boolean>
  gravaConfig: (config: IConfig) => Promise<void>
  getConfig: () => Promise<IConfig>
}

const DEFAULT_CONFIG = {
  senha_adm: "",
  qtd_mesas: 12
}

const BeerContext = createContext<IBeerContext>({} as IBeerContext)

interface ProviderProps {
  children: ReactNode;
}

function BeerProvider ({ children }: ProviderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [config, setConfig] = useState<IConfig>(DEFAULT_CONFIG)
  const [senha, setSenha] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  }

  async function checaAdmin(key: string = senha): Promise<boolean> {
    if (key !== senha) {
      setSenha(key)
    }

    if (!key) {
      setIsAdmin(false)
      return false
    }
    
    try {
      const response = await api.get(`/config/password/${ key }`)

      const ok = response.data.match
      setIsAdmin(ok)
      return ok
    }
    catch(erro: any) {
      console.log(erro.message)
      setIsAdmin(false)
      return false
    }
  }

  async function gravaConfig(config_: IConfig) {    
    try {
      const response = await api.post<IConfig>('/config', { ...config_ })
        
      setConfig(response.data)      
    } 
    catch(error: any) {
      console.log(error.message)
    }
  }

  async function getConfig(): Promise<IConfig> {
    try {
      const response = await api.get<IConfig>('config')

      if (!response.data.senha_adm) {
        await api.post<IConfig>('/config', { ...config })
        return config

      } else {        
        setConfig({ ...response.data }) 
        return response.data
      }
    }
    catch(error: any) {
      console.log(error.message)
      return config
    }
  }

  useEffect(() => {
    async function inic() {
      await getConfig()
      // inicProducts()      
    }    
    inic()
  }, [])  


  return (
    <BeerContext.Provider value={{ 
      menuOpen, 
      toggleMenu,
      isAdmin,
      senha,
      config,
      checaAdmin,
      gravaConfig,
      getConfig
    }}>
      {children}
    </BeerContext.Provider>
  )
}


function useBeerContext(): IBeerContext {
  const context = useContext(BeerContext)
  return context
}

export { BeerProvider, useBeerContext }
