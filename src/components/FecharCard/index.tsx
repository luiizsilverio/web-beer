import { Edit } from '@styled-icons/material'
import { Delete } from '@styled-icons/fluentui-system-filled'
import { Checkmark } from '@styled-icons/ionicons-outline'

import * as S from './styles'
import { IConsumo } from '@/dtos'

interface CardProps {
  data: IConsumo
  handleDelete: (data: IConsumo) => void
  handleEdit: (data: IConsumo) => void
  handleTicar: (data: IConsumo) => void
}

export default function FecharCard({
  data,
  handleDelete,
  handleEdit,
  handleTicar
}: CardProps) {

  return (
    <S.Container fechou={data.fechou}>
      <div className="controls">
        <button type="button" onClick={() => handleTicar(data)}>
          <Checkmark size={26} title="Ticar" />
        </button>
        <button type="button" onClick={() => handleEdit(data)}>
          <Edit size={22} title="Editar" />
        </button>
        <button type="button" onClick={() => handleDelete(data)}>
          <Delete size={24} title="Excluir" />
        </button>
      </div>
      <div className="info">
        <h3>{ `${data.id_product} - ${data.name}` }
        {
          data.complemento && <span>{ data.complemento }</span>
        }
        </h3>
        <p>{ data.qtd } x { data.vl_unit.toFixed(2) } = R$ { data.vl_total.toFixed(2) }</p>
      </div>
    </S.Container>
  )
}