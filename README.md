# Desafio 09: Relacionamentos com banco de dados no Node.js

Este é um desafio do GoStack Bootcamp da RocketSeat. [Link para o desafio](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-relations)

Nesse desafio, foi criado uma aplicação para aprender e treinar o que foi aprendido até agora no Node.js junto ao TypeScript, incluindo o uso de banco de dados com o TypeORM, e relacionamentos ManyToMany!

Essa é uma aplicação que deve permitir a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

# Requisitos

* NodeJs - (desenvolvido utilizando a versão v12.16.2)
* Yarn - (opcional - versão 1.22.4)

# Tecnologias utilizadas

* NodeJs
* Typescript
* TypeORM

# Instalação

1 - Fazer o gitclone:

```
git clone https://github.com/frfontoura/gostack-desafio09-typeorm-relations
```

2 - Instalar as dependências:
```
yarn
```

3 - Verificar as configurações de banco de dados no arquivo ormconfig.json

4 - Executar as migrations:
```
yarn typeorm migrations:run
```

5 - Inicializar o servidor:
```
yarn dev:server
```

# Executando os testes

Para executar os testes, utilizar o comando:
```
yarn test
```
