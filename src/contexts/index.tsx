import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { destroyCookie } from 'nookies'

import api from '@/services/api'
import { IConfig, IProduct, ICategory, IComplemento } from '../dtos'

interface ProductProps {
  id: string
  name: string
  preco: number
}

interface IBeerContext {
  menuOpen: boolean
  toggleMenu(vOpen?: string): void

  config: IConfig
  senha: string
  isAdmin: boolean
  logout(): void
  checaAdmin: (key?: string) => Promise<boolean>
  gravaConfig: (config: IConfig) => Promise<void>
  getConfig: () => Promise<IConfig>

  products: ProductProps[]
  loadProducts: () => Promise<void>
  inicProducts: () => void

  categories: ICategory[]
  loadCategories: () => Promise<void>
  inicCategories: () => void

  complementos: IComplemento[]
  loadComplementos: () => Promise<void>
  inicComplementos: () => void
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
  const [products, setProducts] = useState<ProductProps[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [complementos, setComplementos] = useState<ICategory[]>([])

  const toggleMenu = (vOpen: string = '') => {
    if (vOpen === 'open')
      setMenuOpen(true);
    else
    if (vOpen === 'close')
      setMenuOpen(false);
    else
       setMenuOpen(prev => !prev);
  }

  async function checaAdmin(key: string = senha): Promise<boolean> {
    if (key !== senha) {
      setSenha(key)
    }

    if (!key) {
      setIsAdmin(false)
      setSenha("")
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

  function logout() {
    setIsAdmin(false)
    setSenha("")
    destroyCookie(null, 'MyBeer:senha')
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

  async function loadProducts() {
    try {
      const response = await api.get<IProduct[]>('products', {
        params: {
          // _sort: 'name',
          _order: 'asc'
        }
      })

      const lista = response.data.map(item => ({
        id: item.id,
        name: item.name,
        preco: item.preco
      }))
      .sort((a: any, b: any) => {
        if (a.id.toString() < b.id.toString()) {
          return -1;
        }
        if (a.id.toString() > b.id.toString()) {
          return 1;
        }
        return 0; // a deve ser igual a b
      })

      setProducts([ {id: '0', name: '', preco: 0}, ...lista ])
    }
    catch(error: any) {
      console.log(error.message)
    }
  }

  function inicProducts() {
    setProducts([])
  }

  async function loadCategories() {
    try {
      const response = await api.get<ICategory[]>('categories', {
        params: {
          _sort: 'name',
          _order: 'asc'
        }
      })

      setCategories(response.data)
    }
    catch(error: any) {
      console.log(error.message)
    }
  }

  function inicCategories() {
    setCategories([])
  }

  async function loadComplementos() {
    try {
      const response = await api.get<IComplemento[]>('complementos', {
        params: {
          _sort: 'name',
          _order: 'asc'
        }
      })

      setComplementos(response.data)
    }
    catch(error: any) {
      console.log(error.message)
    }
  }

  function inicComplementos() {
    setComplementos([])
  }

  useEffect(() => {
    async function inic() {
      await getConfig()
      inicProducts()
    }
    inic()
  }, [])


  return (
    <BeerContext.Provider value={{
      menuOpen,
      toggleMenu,
      isAdmin,
      senha,
      logout,
      config,
      checaAdmin,
      gravaConfig,
      getConfig,
      products,
      loadProducts,
      inicProducts,
      categories,
      loadCategories,
      inicCategories,
      complementos,
      loadComplementos,
      inicComplementos
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
