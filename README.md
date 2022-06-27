
# TFC - Trybe futebol clube

O aplicativo TFC é um site informativo
sobre partidas e classificações de futebol! ⚽️
## Funcionalidades

- Visualização da tabela de classificação do campeonato.
- Escolher filtrar a tabela por partidas jogadas em casa ou fora.
- Ver o histórico de partidas.
- Filtrar a lista de partidas por status (em andamento ou finalizado).
- Fazer login na aplicação.
- Logado como admin é possível fazer mudanças nas partidas, como: Finalizar, editar o placar e criar novas partidas.


## Stack utilizada

**Front-end:** React, HTML, CSS, Js (fornecido inteiramente pela Trybe para resolução do desafio).

**Back-end:** Node, Typescript, Express.js, MySQL, Sequelize, Mocha + Chai + Sinon.js

**Além das stacks citadas acima foi utilizada também**: Joi, Docker, Docker-compose, JWT e Bcrypt 

## Como rodar o projeto em sua máquina:

Lembrando que para rodar o projeto localmente será necessário [Docker](https://docs.docker.com/get-docker/) e
[Docker-Compose](https://docs.docker.com/compose/install/) instalados em sua máquina.

clone o projeto:

```bash
  git clone git@github.com:lithhhh/tfc.git
```

entre na pasta do projeto:

```bash
  cd tfc
```

suba a orquestração de containers:

```bash
  npm run compose:up
```

> É nesta etapa que você pode ir pegar um cafezinho e esperar! Pois pode ser um processo demorado (pode demorar até 10 minutos), dependendo da sua velocidade de internet e máquina.

Quando estiver pronto teremos esse resultado:

```bash
  [+] Running 4/4
    ⠿ Network tfc               Created                                                                                              0.8s
    ⠿ Container db              Healthy                                                                                            170.9s
    ⠿ Container app-backend-1   Healthy                                                                                            208.2s
    ⠿ Container app-frontend-1  Started
```

> Isso significa que os containers estão saudáveis, e podem ainda estar em inicialização! espere um minuto.

A aplicação logo logo estará sendo executada nas seguintes portas:

 - frontend: http://localhost:3000/
 - backend: http://localhost:3001/

### para encerrar a aplicação:

Desative a orquestração de containers usando:

```bash
  npm run compose:down
```

Quando estiver pronto teremos esse resultado:

```bash
Stopping app-frontend-1 ... done
Stopping app-backend-1  ... done
Stopping db             ... done
Removing app-frontend-1 ... done
Removing app-backend-1  ... done
Removing db             ... done
Removing network tfc
```



## Aprendizados

O objetivo deste projeto foi integrar o back-end com o front-end
fornecido pela Trybe, a camada de banco de dados (MySQL) gerenciada com o Framework
Sequelize, além da utilização do Docker e sua orquestração de containers com Docker-compose.


Este foi um dos projetos mais desafiadores e divertidos que fiz,
tenho um grande carinho por ele, adorei fazer a lógica de montagem
das tabelas, e o algoritmo de ordenação da tabela com seus devidos
critérios de desempate. Além do mais, foi um dos meus primeiros projetos
complexos utilizando Typescript com POO.

Como o foco do desenvolvimento foi em torno do Back-end, gostaria de trazer
alguns destaques do desafio. Foi nos dado um diagrama de exemplo da estrutura do banco,
logo encarei meu primeiro desafio, criar toda a estrutura do Sequelize a partir de uma linguagem (.ts)
e um paradigma relativamente novo para mim.

![Exemplo banco de dados](./diagram.png)

Após isso, hora de focar no Docker-compose, e bem, no início de toda experiência utilizando Docker
há um friozinho na barriga, então dediquei bastante tempo para compreender como seria a estrutura de
containers e como seria sua montagem, além de manter a garantia de que tudo estará saudável e seguro para
a reprodução.

Pronto! tudo rodando, foco na arquitetura, separei tudo que se diz respeito ao Express.js na camada
de API (routes, middlewares, handlers, server) com foco na implementação da comunicação com o client,
na camada APP mantive toda lógica da aplicação contendo nosso Service (responsável por nos fornecer as regras de negócio, e garantir que o dado correto seja retornado para
o nosso Controller) e o Controller (responsável por garantir a chamada do serviço correto, para garantir que o dado esperado seja retornado para o nosso Client)
os nossos helpers, onde temos algumas implementações de ferramentas como a JWT, validações com Joi e etc. Ah, lembrando que também havia a camada de Database, responsável por armazenar as ferramentas do Sequelize
 (migrations, models, configs e seeders).

A escolha de manter todas as camadas separadas foi estratégica, gostei bastante de desenvolver este projeto,
e talvez eu queira voltar aqui no futuro, e quem sabe integrar com a troca de uma stack por outra, exemplo: caso queira fazer a troca do banco ou ORM (Sequelize),
seria necessário poucas mudanças, apenas na camada de database, sem misturar muito as coisas, e tendo que fazer pouquíssimas refatorações. Acredito que seja
prática do mercado não se apegar à Stacks, podendo haver substituição das mesmas a qualquer instante!

E por falar em mudanças, não podemos deixar para trás os nossos testes, no momento, nossa aplicação não está 100% coberta
por testes, e isso está no meu Roadmap de implementação, sigo utilizando o trio: Mocha, chai e Sinon.

No mais, foi de fato um projeto bastante desafiador, feito em muito pouco tempo, porém dotado de Aprendizados! sendo assim um dos meus projetos de mais orgulho até então.






## Roadmap

- [x]  Aplicação 100% funcional
- [ ]  Documentação da API.
- [ ]  Deploy com Heroku
- [ ]  100% de testes unitários
- [ ]  100% de testes de integração

