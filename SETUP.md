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
### Yarn
  - Link para instalação via npm: https://yarnpkg.com/getting-started/install
  - Comandos equivalentes de yarn e npm: https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc
  - Checar versão do yarn: `yarn -v`
  - Checar e instalar se necessário todas as dependências de um projeto: `yarn`

## Servidor
  - Escolher uma solução:
    * GCP (USD 300,00 3 meses grátis): https://cloud.google.com/free
    * Azure (BRL 670,00 12 meses grátis): https://azure.microsoft.com/free/
    * AWS?
    * Oracle?
    * Digital Ocean?
    * Vercel? (Only Next.JS)
  - VM Ubuntu ou CentOS:
    * CPU 2 a 4 cores;
    * 2 a 4 GB RAM;

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

    
# Criando um novo projeto

## Padronização de código

### ESLint (necessário extensão vscode)
- Ferramenta que padroniza o código de acordo com o padrão de alguma empresa;
...
> Modulo 2, aula 6

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