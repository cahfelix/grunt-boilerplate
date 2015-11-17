# Grunt Boilerplate #

A função deste codigo é permitir automatizar tarefas como: concatenação de scripts, compilação, minificação, testes unitários, estruturação e padronização de pastas, download de bootstrap em sass

A vantagem disso é que você não precisa utilizar uma ferramenta pra cada uma dessas tarefas, pois tudo esta centralizado no Grunt que dá conta de tudo. Fazendo que o desenvolvedor tenha um projeto com padrões front-end e ganhando agilidade no seu desenvolvimento.


## Observações ##
Se necessário execute os comandos com sudo

## Para configurar o Grunt ##
1. Instale o nodejs através do link: [NodeJS via Package Manager](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
2. Instale o Sass na sua máquina: `$ gem install sass`
3. Instale o Grunt na sua máquina: `$ npm install -g grunt grunt-cli`
5. Instale as dependências do Grunt: `$ npm install`


## Vamos lá
Clonar este repositório

```
git clone https://github.com/cahfelix/boilerplate-grunt.git
```


Acessar a pasta do projeto 

```
cd boilerplate-grunt
```

Instale as dependências

```
npm install

```

## Comandos para rodar tasks ##

 *   EXECUTA TODAS AS TASKS:   	`$ grunt`
 *   INSTALA BOOTSTRAP EM SASS: `$ grunt bootstrap`
 *   LIMPAR CACHE DE JS E CSS: 	`$ grunt clean`
 *   SASS WATCH:               	`$ grunt sass-watch`
 *   SASS COMPILE:             	`$ grunt sass-compile`
 *   IMAGE COMPRESSOR:         	`$ grunt image-compressor`
 *   COMPRIMIR JS:             	`$ grunt js-compressor`
 *   GERAR SPRITESHEET:        	`$ grunt spritesheet`


## Autor
[Cah Felix](http://cahfelix.com.br)

## Contribuidores
[Cah Felix](http://cahfelix.com.br)
