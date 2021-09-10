# Setup
Meu setup de ambiente de desenvolvimento web

## Instaladores

### Git / GitHub
  - Link para download: https://git-scm.com/downloads
  - Gerar chave ssh para liberar no github no terminal `ssh-keygen`
  - Procurar a chave em `C:\Users\<usuario>\.ssh\id_rsa.pub` e copiar para o github em Configurações da conta > Chaves SSH e GPG
  - Comandos GIT:
    * Clonar um repositório do github `git clone git@github.com:nome-do-usuario/repositorio.git`
    * Status de um repositório `git status`
    * Logs de commits de um repositório `git log`
    * Baixar repositório atualizado `git pull origin master`
    * Adicionar arquivos `git add <arquivos>` ou para adicionar todos os arquivos novos `git add .`
    * Criar um commit com as alterações `git commit -m "Mensagem de alteração"`
    * Atalho: Adicionar todos os arquivos alterados já com o commit `git commit -am "Mensagem de alteração"`
    * Subir as alteraçõs no repositório remoto (github) `git push origin master`

### Powershell 7
  - Link para download: https://github.com/PowerShell/PowerShell

### WSL2 (Abandonado)
  - Necessário para rodar o docker no Windows
  - Como instalar o `WSL2` no Windows: https://docs.microsoft.com/pt-br/windows/wsl/install-win10
  - Instalar o Ubuntu 20 pela Microsoft Store
  - Configurando o `WSL2`: https://docs.microsoft.com/pt-br/windows/wsl/wsl-config
    * Basta criar no diretório `C:\Users\<Usuário>` o arquivo `.wslconfig`
    * Utilizaremos as seguintes configurações:
    ```
    [wsl2]
    memory=3GB # Limita a memória da VM para 3GB
    processors=1 # Monta a VM do WSL2 com 1 processador virtual
    ```
  - Listar todas as instâncias WSL rodando: `wsl -l -v`
  - Iniciar uma instância específica: `wsl -d <instancia>`
  - Desligar uma instância específica: `wsl -t <instancia>`
  - Desligar o WSL: `wsl --shutdown`
  - Listar todos os comandoss: `wsl --help`

### Windows Terminal
  - Baixar na Microsoft Store

### MobaXTerm
  - Instalador local
  - Importar configurações

### Vscode
  - Link para download: https://code.visualstudio.com/download
  - Sincronizar com a conta do github `gu-nogueira` para puxar todas as configs, plugins, preferências, etc.
  - Configurar terminal com o diretório do Powershell 7 `C:\Program Files\PowerShell\7\pwsh.exe`
  - Plugins utilizados (basta fazer login no vscode que irá sincronizar todas as configurações):
    * Bracket Pair Colorizer;
    * DotENV;
    * Dracula Official;
    * EditorConfig;
    * ESLint;
    * GitLens; `Fazer login no github`
    * Live Share;
    * Material Icon;
    * Node.js exec;
    * Rocketseat React Native;
    * Rocketseat ReactJS;
    * Tabnine Autocomplete AI; `Fazer login`
    * Vscode-styled-compoments;
  - `ctrl + shift + P > Preference: Open Settings (JSON)`
  ```json
  {
    "tabnine.experimentalAutoImports": true,
    "terminal.external.windowsExec": "C:\\Program Files\\PowerShell\\7\\pwsh",
    "workbench.iconTheme": "material-icon-theme",
    "gitlens.defaultDateFormat": null,
    "editor.fontSize": 14,
    "editor.rulers": [183],
    "editor.wordWrap": "on",
    "editor.tabSize": 2,
    "terminal.integrated.fontSize": 14,
    "emmet.includeLanguages": {
      "javascript": "javascriptreact"
    },
    "emmet.syntaxProfiles": {
      "javascript": "jsx"
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "breadcrumbs.enabled": true,
    "javascript.suggest.autoImports": false,
    "terminal.integrated.tabs.enabled": true,
    "terminal.integrated.defaultProfile.windows": "PowerShell",
    "editor.largeFileOptimizations": false,
    "workbench.colorTheme": "Dracula"
  }
  ```

### Insomnia
  - Link para download: https://insomnia.rest/download

### DevDocs
  - Link para download: https://www.electronjs.org/apps/devdocs-app
  - Linguagens a selecionar:
    * Javascript
    * ReactJS
    * React Native
    * Node

## Package manager

### Chocolatey
  - Link para instalação: https://chocolatey.org/install
### node LTS + npm
  - Link para instalação via package manager (chocolatey): https://nodejs.org/en/download/package-manager/#windows

### JSON Server
  - Serve para criar uma API temporária baseada num arquivo JSON. Link para instalação: https://www.npmjs.com/package/json-server
  - Nela é possível fazer inserts, deletes, updates, assim como uma API convencional em node
  - Ótima ferramenta temporária para testes, fácil de instalar
  - Instalando de forma global: `yarn global add json-server`
  - Para rodar o servidor, basta: `json-server arquivo.json -p 2000`

### Yarn
  - Link para instalação via npm: https://yarnpkg.com/getting-started/install
  - Comandos equivalentes de yarn e npm: https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc
  - Checar versão do yarn: `yarn -v`
  - Checar e instalar se necessário todas as dependências de um projeto: `yarn`
  - Atualizar a versão de um pacote: `yarn upgrade pacote@versão`

## Servidor
  - Escolher uma solução:
    * GCP (USD 300,00 3 meses grátis): https://cloud.google.com/free
    * Azure (BRL 980,00 12 meses grátis): https://azure.microsoft.com/free/
    * AWS?
    * Oracle?
    * Digital Ocean?
    * Vercel? (Only Next.JS)
  - VM Ubuntu ou CentOS:
    * CPU 2 a 4 cores;
    * 2 a 4 GB RAM;
  - Acessar bash administrativo e setar login via SSH: `sudo vim /etc/ssh/sshd_config`
  - Descomentar e mudar (opcional): `Port 22`
  - Descomentar e definir: `PermitRootLogin yes`
  - Reiniciar o serviço de ssh: `service ssh restart`
  - Mudar a senha do usuário root: `sudo root passwd`
  - Reiniciar a máquina: `sudo reboot`
  - Criar nova sessão SSH (Moba): `ssh root@<ip_do_servidor> [ENTER] <senha_root>`

### Docker | Podman
  - Link para download: https://docs.docker.com/get-docker/
    * No windows é necessário utilizar o `WSL` ou o `Hyper-V` para virtualizar o docker
  - Iniciar (criar) um container:
    ```
    docker run
    --name > dá um nome ao container
    -e > uso de variáveis ambientes
    -p > redirecionamento de porta
    -d > nome da imagem a utilizar para criação do container
    --network > define a rede de conversação do container

    exemplo:

    docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```
  - Listar todos os containers em execução:
    ```
    docker ps

    -a > lista todos os containers (até desligados):
    ```
  - Listar todas as imagens de containers:
    ```
    docker image ls
    ```
  - Iniciar um container desligado:
    ```
    docker start <NAME>
    ```
  - Ver os logs do container:
    ```
    docker logs <NAME>
    ```
  - Entrar no bash de um container:
    ```
    docker exec -it <nome_do_container> bash
    ```
    
# Criando um novo projeto

## Padronização de código

### ESLint (necessário extensão vscode)
- Ferramenta que padroniza o código de acordo com o padrão de alguma empresa;
...
> Modulo 2, aula 6
- Modelo para projeto ReactJS:
- Dependências: 
```
yarn add babel-eslint -D eslint -D eslint-config-airbnb -D eslint-config-prettier -D eslint-plugin-import -D eslint-plugin-jsx-a11y -D eslint-plugin-prettier -D eslint-plugin-react -D
yarn add eslint-plugin-react-hooks -D prettier -D
```
- Arquivo `.eslintrc.js`:
```js
module.exports = {
  env: {
    es6: true,
    jest: true,
    browser: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "jsx-a11y", "import", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "import/prefer-default-export": "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/jsx-one-expression-per-line": "off",
    "global-require": "off",
    "react-native/no-raw-text": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    camelcase: "off",
    "no-console": ["error", { allow: ["tron"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      },
    },
  },
};
```

### Prettier (integração com ESLint)
- Deixa o código mais bonito. Separa linhas muito grandes;
...
> Modulo 2, aula 6

### Editor config (extensão vscode)
- Padronização entre ambiente com diferentes editores de código;
- Na pasta raiz do projeto, botão direito: `generate .editorconfig`
- Adicionar no `.editorconfig`:
```js
trim_trailing_whitespace = true
insert_final_newline = true
```

# Setup para desenvolvimento Mobile
- Consultar em: https://react-native.rocketseat.dev/

## JDK11 (Java Development Kit)

- No Windows, necessário verificar as permissões;
- Vamos instalar o JDK em um terminal com acesso administrador
- Vamos rodar o comando: `cinst -y openjdk11`
- Reiniciar o terminal, e verificá-lo com `java -version`

## Emuladores

- Android Studio: https://developer.android.com
  * É necessário setar algumas variáveis ambientes para o yarn funcionar de forma global e preparar o espaço para receber o android studio;
- Celular android (USB): Ativar depuração por USB em configurações, plugar o cabo USB na máquina e rodar `react-native run-android`;
- Celular Android (Wi-Fi):

### Emulando Android Virtual Device por linha de comando
- Primeiro, precisamos achar o nome do dispositivo na pasta do SDK do android, no nosso caso: `cd C:/Android/Sdk/emulator && ./emulator -list-avds`
- Então, rodamos `cd C:/Android/Sdk/emulator && ./emulator -avd NOME_DO_DISPOSITIVO`
- Trabalho: `cd C:/Android/Sdk/emulator && ./emulator -avd Pixel_5_API_29_2`
- Casa: `cd C:/Android/Sdk/emulator && ./emulator -avd Pixel_4_API_29`
- Caso rodando em arquitetura x86, mudar o `C:/Android/Sdk/emulator` por `C:/Android/Sdk/tools` 