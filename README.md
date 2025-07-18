# Softruck desafio front-end

Tela web em Angular que permite visualizar trajetos GPS e as informações do veículo em um mapa com a seleção do trajeto, animação do veículo, seleção de idioma.

## Funcionalidades Principais

- **Mapa interativo** criado com Leaflet exibindo trajetos animados a partir de dados GPS.
- **Seleção de trajeto** em um select.
- **Animação do veículo** com rotação a partir de um sprite e movimento pelo trajeto selecionado.
- **Painel com informações do veículo** (foto, placa, chassi, cor).
- **Internacionalização (i18n)** idioma alternável entre português, inglês e espanhol.
- **Testes unitários** com Jasmine/Karma cobrindo componentes e lógica.

---

## Instalação e Execução

1. Clone o repositório:

    ```bash
    git clone https://github.com/JohannArouca/softruck-desafio-frontend.git
    ```

2. Instale dependências:

    ```bash
    npm install
    ```

3. Execute a aplicação em modo de desenvolvimento:

    ```bash
    npm start
    ```

4. Acesse a aplicação no navegador:

    ```
    http://localhost:4200
    ```

5. Execução dos testes:

    ```bash
    npm run test
    ```

## Estrutura e funcionalidades do projeto

### O que foi feito

Este projeto consiste em uma aplicação Angular que consome dados de uma API simulada para exibir um mapa interativo com diferentes opções de trajetos, informações do veículo. A interface é responsiva, intuitiva e possui três opções de idioma (PT, EN, ES), foi criada de forma moderna e organizada em componentes reutilizáveis.

Na página inicial da aplicação já é exibido um select para seleção do trajeto e abaixo dele um mapa já é renderizado assim que a página é aberta. Ao selecionar um trajeto é chamada uma função que traça o trajeto escolhido no mapa e chama uma outra função responsável pela animação do carro neste trajeto. Esta segunda função verifica o ponto de partida e o próximo ponto, faz uma animação do carro indo de um ponto ao outro com base na velociade e direção recebida nos dados do back-end. Após esta animação a função é chamada novamente do segundo ao terceiro ponto do trajeto e assim sucessivamente até o ponto final.

No mapa também existe um botão com um ícone de um carro. Ao clicar neste botão é aberto um card com as informações do veículo que também são obtidas a partir da requisição GET feita na API simulada.


### Estruturação do projeto

A estrutura segue boas práticas do Angular, com separação de responsabilidades e reutilização de código. Assim estão estruturadas as pastas do projeto:

```
src/
│
├── app/
│ ├── components/
│ ├── models/
│ ├── pages/
│ ├── resolvers/
│ ├── services/
│ ├── app.component.ts
│ ├── app-routing.module.ts
│ └── app.module.ts
│
├── assets/
│ ├── data/
│ ├── i18n/
│ └── images/
```

- A pasta components contém todos os componentes reutilizáveis da aplicação, como o mapa e o card que exibe as informações do veículo.
- A pasta models possui as interfaces e tipos vindos da API e utilizados no projeto.
- A pasta pages contém todas as páginas do projeto, neste caso possuímos apenas a página home.
- A pasta resolvers contém apenas um resolver para a chamada do service que consome os itens da API. Este resolver é utilizado para que a requisição seja feita antes da abertura da tela.
- A pasta services também possui apenas um service. Este service realiza um GET na API trazendo todos os dados do GPS.
- O component app.component é o componente principal da aplicação, ele possui apenas um router-outlet para abrir as páginas do projeto.
- O app.routing.module possui as rotas da aplicação. Neste caso possuímos apenas a rota principal que abre o componente home.
- O app.module centraliza as declarações e imports utilizados no projeto.
- A pasta assets possui os conteúdos utilizados no projeto. Nesta pasta temos outras pastas que são: data, i18n e images.
- A pasta data possui o json que simula a API back-end.
- A pasta i18n possui os jsons responsáveis pela tradução da aplicação. Existe um json para cada idioma suportado no projeto, português, inglês e espanhol.
- A pasta images possui o sprite do carro que é utilizado na animação dentro do mapa.


### Tecnologias utilizadas

#### Angular

O framework Angular foi o escolhido para o desenvolvimento do projeto por ser o framework com o qual o desenvolvedor possui mais familiaridade e experiência. No projeto foi utilizada a versão 18 do Angular.

#### Angular Material

Em conjunto ao Angular foi utilizado o Angular material para criação de componente de UI, como o select, o card com informações do veículo e o botão. Esta biblioteca foi escolhida por ser de fácil utilização e ter bons componentes.

#### Leaflet

Para a renderização do mapa foi escolhido o Leaflet. Esta biblioteca foi escolhida por utilizar o JavaScript, o que seria compatível com o Angular, e por ser de código aberto. Além disto a biblioteca é conhecida por ser simples e de fácil uso e possui vários exemplos e documentações disponíveis, o que seria o ideal, visto que o desenvolvedor não possuía experiências prévias com o desenvolvimento de mapas.

#### ngx-translate

Como foi pedida a internacionalização da aplicação foi escolhida a biblioteca ngx-translate para esta função. Esta biblioteca foi escolhida pela compatibilidade com o Angular e facilidade na utilização.

#### Flag icons

A biblioteca de ícones de bandeiras chamada Flag Icons foi escolhida para seleção de idiomas. Neste caso se optou pelas bandeiras e não um select apenas por critérios visuais. O desenvolvedor acredita que as bandeiras ficam mais amigáveis do que utilizar o select do Material Angular.

#### Jasmine + Karma

Estas ferramentas são utilizadas nos testes unitários do projeto. Foram escolhidas também por serem compatíveis com o Angular e também pela experiência que o desenvolvedor já possuía.

---

## Autor

**Johann Arouca**  
- [GitHub](https://github.com/JohannArouca)  
- [LinkedIn](https://linkedin.com/in/johann-arouca)