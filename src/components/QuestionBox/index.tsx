import * as S from './styles'

type Props = {
  title: string
  pergunta: string
  textYes?: string
  textNo?: string
  handleConfirm(): void
  handleCancel(): void
}

export default function QuestionBox({
  title,
  pergunta,
  textYes = 'Sim',
  textNo = 'Não',
  handleConfirm,
  handleCancel
}: Props) {

  return (
    <S.Container>
      <h1>{ title }</h1>
      <p style={{fontSize: 14}}>{ pergunta }</p>
      <S.ToastButton className="sim" onClick={handleConfirm}>
        { textYes }
      </S.ToastButton>
      <S.ToastButton className="nao" onClick={handleCancel}>
        { textNo }
      </S.ToastButton>
    </S.Container>
  )
}
