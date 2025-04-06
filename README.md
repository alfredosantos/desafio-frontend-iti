# Desafio Frontend ITI - GitHub User Search
Este projeto é uma aplicação web que permite buscar informações de usuários do GitHub, incluindo seus repositórios, seguidores, localização e outras informações relevantes. A interface foi projetada para ser semelhante ao estilo do Google, com uma caixa de busca centralizada e uma lupa estilizada.

## Índice

- [Descrição](#descrição)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como usar](#como-usar)
- [Licença](#licença)

## Descrição

O objetivo deste projeto é implementar uma aplicação frontend que atenda aos requisitos especificados no desafio técnico. A aplicação foi desenvolvida com foco em boas práticas, performance e usabilidade.

## Tecnologias Utilizadas

- **Angular**: Framework principal para construção da aplicação.
- **TypeScript**: Linguagem principal para desenvolvimento.
- **CSS**: Estilização da interface.
- **HTML**: Estrutura da aplicação.
- **GitHub API**: Para buscar informações de usuários e repositórios.

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:
  ```bash
  git clone https://github.com/alfredosantos/desafio-frontend-iti.git
  ```
2. Acesse o diretório do projeto:
  ```bash
  cd desafio-frontend-iti
  ```
3. Instale as dependências:
  ```bash
  npm install
  ```
4. Inicie o servidor de desenvolvimento:
  ```bash
  npm serve
  ```

A aplicação estará disponível em `http://localhost:4200`.

## Funcionalidades

- Busca de usuários do GitHub pelo nome de usuário.
- Exibição de informações detalhadas do usuário:
Nome
  - Username
  - Biografia
  - Seguidores e seguindo
  - Localização
  - Repositórios públicos
  - Lista de repositórios com opções de ordenação:
    - Por nome (A-Z ou Z-A)
    - Por número de estrelas (crescente ou decrescente)
  - Filtro de repositórios por nome.
- Design responsivo e acessível.
- Estilo inspirado no Google, com uma caixa de busca arredondada e uma lupa alinhada à esquerda.

## Estrutura do Projeto

```plaintext
//desafio-frontend-iti/
src/
├── app/
│   ├── components/
│   │   ├── user-search/
│   │   │   ├── user-search.component.ts    # Lógica principal do componente
│   │   │   ├── user-search.component.html  # Template do componente
│   │   │   ├── user-search.component.css   # Estilos do componente
│   ├── services/
│   │   ├── github.service.ts               # Serviço para comunicação com a API do GitHub
├── assets/                                 # Recursos estáticos
├── environments/                           # Configurações de ambiente
```

## Como Usar

1. Digite o nome de usuário do GitHub na caixa de busca.
2. Clique na lupa ou pressione Enter para iniciar a busca.
Veja as informações detalhadas do usuário e a lista de repositórios.
3. Use o filtro para buscar repositórios específicos ou ordene a lista por nome ou estrelas.

## Testes

Para executar os testes unitários:

  ```bash
  ng test
  ```

## Licença

Este projeto está licenciado sob a MIT License.
