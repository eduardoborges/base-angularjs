# Esqueleto de projeto AngularJS

[![Issue Stats](http://issuestats.com/github/eduardoborges/base-angularjs/badge/pr?style=flat)](http://issuestats.com/github/eduardoborges/base-angularjs)
[![Issue Stats](http://issuestats.com/github/eduardoborges/base-angularjs/badge/issue?style=flat)](http://issuestats.com/github/eduardoborges/base-angularjs)
[![npm version](https://badge.fury.io/js/%40angular%2Fcore.svg)](https://badge.fury.io/js/%40angular%2Fcore)

Uma simples base para construção de aplicações angularJS feito com Gulp e GDGlove <3

  - Auto injeção dos arquivos js do projeto;
  - Auto injeção de dependencias do bower;
  - Conversão dos templates HTML para JS;
  - Compilação de arquivos Sass;
  - Tarefa de deploy para produção (por enquanto FTP, logo mais SSH);
  - Minificação, e etc.

> Vocês também pode utilizar para outras coisas, apesar de ter sido escrito focado em AngularJS

### Installation

Como já é de prache, você precisa do [Node.js](https://nodejs.org/) v4+ NPM e Gulp (instalado globalmente)

> Copie o arquivo 'sample-deploy.conf.js' para 'deploy.conf.js' e coloque os dados do servidor ftp. (Está no gitignore, fique tranquilo. )

Clone isto, ou baixe a [última build](https://github.com/eduardoborges/base-angularjs/releases).

Instale as dependências e dependências de desenvolvimento, assim:

```sh
$ npm i && bower i
```

### Tarefas

Servindo os arquivos para desenvolvimento:
```sh
$ gulp serve
```

Compilar projeto (produção):
```sh
$ gulp build
```

Fazer deploy do projeto para servidor de produção (ftp):
```sh
$ gulp deploy
```
