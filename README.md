### Git

Instalação
```sh
sudo apt update && sudo apt install git
```
### Repositório

```sh
mkdir ~/angular-muff
cd ~/angular-muff
```
Inicializando o repositório

```sh
git init
git remote add origin https://github.com/fernandokvk/angular-muff.git
git pull origin main
```

---
### npm
Instalação
```sh
sudo apt install npm -y
```
---
### Angular
Instalação
```sh
npm install -g @angular/cli
```

Dependências
```sh
npm install
```

Inicializando o projeto

```sh
ng serve
```


---
### Json-server
Instalação do servidor [json-server](https://github.com/typicode/json-server) para mock da api REST

```sh
npm install -g json-server
```
Em outro terminal, navegue para a pasta *database*
```sh
cd ~/angular-muff/database
```
Inicializando a api
```sh
json-server --watch db.json
```

Abra o navegador em http://localhost:4200/


API disponível em http://localhost:3000/ 
