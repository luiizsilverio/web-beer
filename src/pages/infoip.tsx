import { useState } from 'react'
import { useRouter } from 'next/router';
import { SatelliteDish } from '@styled-icons/fa-solid'
import { setCookie } from 'nookies'

import * as S from '@/styles/infoip.styles'
import InputBox from '@/components/InputBox'
import { MyButton } from '@/components/MyButton'
import api, { apiConfig } from '@/services/api';

function InfoIP() {
  const [ip, setIp] = useState(apiConfig.api_host)
  const router = useRouter()

  async function handleHost() {
    apiConfig.api_host = ip;
    api.defaults.baseURL = `http://${ ip }:${ apiConfig.api_port }`;

    setCookie(null, 'MyBeer:api_host', ip)

    apiConfig.ok = true;
    router.push("/")
  }

  return (
    <S.Container>
      <S.Content>
        <S.Title>
          <SatelliteDish size={120} color={"var(--orange)"} /> 
          <h1>My-Beer</h1>
        </S.Title>

        <S.Form>
          <InputBox 
            label='Servidor não encontrado'
            type="text"
            value={ip} 
            onChange={(e) => setIp(e.target.value)}
            maxLength={15} 
            placeholder="Informe o IP do Beer-API"
            spellCheck={false}
          />
          <MyButton
            type="button"
            onClick={handleHost}
          >
            Confirma o IP
          </MyButton>
        </S.Form>

      </S.Content>
    </S.Container>
  )
}

export default InfoIP;
