import * as S from './styles'
import { IConsumo } from '@/dtos'

interface CardProps {
  data: IConsumo
  handleDelete: (data: IConsumo) => void
  handleEdit: (data: IConsumo) => void
  handleFechou: (consumo: IConsumo) => void
}

export default function FecharCard({
  data,
  handleDelete,
  handleEdit,
  handleFechou
}: CardProps) {
  return (
    <S.Container>
      <button type="button">F</button>
      <button type="button">E</button>
      <button type="button">X</button>
      { data.name }
      { data.qtd } x { data.vl_unit } = { data.vl_total }
    </S.Container>
  )
}