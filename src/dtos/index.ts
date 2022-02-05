export interface ICategory {
  id: string
  name: string    
  icon?: string 
}

export interface IProduct {
  id: string
  name: string
  id_categoria: string
  preco: number //string  
}

export interface IComplemento {
  id: string
  name: string    
}

export interface IConfig {
  // id: string
  senha_adm: string
  qtd_mesas: number //string
}

export interface IComanda {
  id: string, 
  numMesa: number, 
  dtAbertura: string,
  dtFecha?: string,
  quemFechou?: string,
  fechar?: boolean,
  temNovoConsumo?: boolean
}

export interface IConsumo {
  id: string,
  id_comanda: string,
  id_product: string,
  name: string,
  qtd: number,
  vl_unit: number,
  vl_total: number,
  fechou: boolean,
  complemento?: string
}

export interface IMesa {
  numMesa: number
  situacao: 'Livre' | 'Ocupada'
  fechar?: boolean
  id_comanda: string
  temNovoConsumo?: boolean
}

export interface IResumo {
  vl_total: number
  qtdMesas: number
  vlMedio: number
  comparativo: string
}