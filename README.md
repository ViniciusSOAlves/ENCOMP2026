# Passo a passo para execução do site

## Pré requisitos para funcionar: ter o NodeJS instalado em seu computador e um servidor MySQL(recomenda-se o WampServer, o mesmo que foi utilizado para o desenvolvimento).

Após a clonagem da pasta rodar o comando abaixo, tanto na pasta 'backend' e na pasta principal do projeto:
  ```npm i``` 

Criar um arquivo .env para a conexão com o banco de dados, com uma variável chamada DATABASE_URL.
Exemplo: 
```DATABASE_URL = mysql://root:@localhost:3306/encomp2026```

Na pasta 'backend' rodar o comando para vincular o prisma ao banco de dados:
```npm prisma generate```
**caso der erro na conexão com o banco de dados executar ```npm prisma db pull``` e executar novamente o comando acima.

Para iniciar o site, rodar o comando na pasta geral e também na pasta 'backend':
```npm run dev``` 

Assim vai aparecer a URL para o site abrir no navegador.
