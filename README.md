<table>
  <tr>
    <td><img src="https://github.com/luiizsilverio/web-beer/blob/main/public/favicon.png" /></td>
    <td><h1>MY-BEER</h1></td>
  </tr>
</table>

## Conteúdo
* [Sobre o Projeto](#sobre-o-projeto)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Screenshots](#camera_flash-screenshots)
* [Iniciando o Projeto](#car-Iniciando-o-projeto)
* [Licença](#balance_scale-licença)
* [Contato](#email-contato)

## Sobre o projeto
Aplicação desenvolvida em React com Next.js e Typescript. Exibe um __dashboard__, com diversos gráficos (pizza, linear, barra) e estatísticas de venda do bar.<br />
Desenvolvi esta aplicação sozinho, do zero 🥳, baseado apenas em minhas anotações, documentação e Google.<br />
A tela de Dashboard possui gráficos, animações, responsividade e acessa a minha API Node [Beer-API](https://github.com/luiizsilverio/beer-api).<br />
Na tela de Fechamento, mostra todas as mesas do bar, na cor correspondente à situação (ocupada, livre).<br />
Permite lançar o consumo das mesas e fechar as contas.<br />

## :hammer_and_wrench: Tecnologias
* __React / Next.js__
* __Typescript__
* Estilização dos componentes com __Styled-Components__
* __Recharts__ para construir os gráficos
* __Axios__ para acessar a API
* Animação com __React-lottie-player__
* __jsonwebtoken__ para expirar a sessão após 8 horas
* __Date-fns__ para sofrer menos com datas

## :camera_flash: Screenshots
<table>
  <tr>
    <td><img src="https://github.com/luiizsilverio/web-beer/blob/main/src/assets/my-beer.gif" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/luiizsilverio/web-beer/blob/main/src/assets/tela3.png" /></td>
    <td><img src="https://github.com/luiizsilverio/web-beer/blob/main/src/assets/tela7.png" /></td>
  </tr>
</table>

## :car: Iniciando o projeto
* Baixe o repositório com ``` git clone ``` e entre na pasta do projeto.
* Renomeie o arquivo ``` .env.local-example ``` para ``` .env.local ``` e informe a secret da API.
* Digite ``` yarn dev ``` no terminal.
* Abra no navegador ``` localhost:3000 ``` .

## :balance_scale: Licença
Este projeto está licenciado sob a [licença MIT](LICENSE).

## :email: Contato

E-mail: [**luiiz.silverio@gmail.com**](mailto:luiiz.silverio@gmail.com)
