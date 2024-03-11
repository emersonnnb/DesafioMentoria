# Ecommerce

Aplicação de Ecommerce que está sendo desenvolvida durante a **Mentoria Angular Pro**.

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **Este workspace foi gerado pelo [Build System Nx.](https://nx.dev)** ✨

## Setup do projeto

```
git clone https://github.com/andrewarosario/ecommerce.git
cd ecommerce
npm install
```

## Servir o projeto localmente

```
npm start
```

Ou

```
npx nx serve
```

O projeto será servido por padrão em http://localhost:4200/.

## Executar tarefas independentes

```
npx nx <NOME_DA_TAREFA> <NOME_DO_MODULO>
```

Exemplos:

```
npx nx test ecommerce
npx nx lint modules-layout
```

## Visualizar Dependency Graph

```
npx nx graph
```

## Executar tarefas somente do que foi afetado

```
npx nx affected:<NOME_DA_TAREFA>
```

Exemplos:

```
npx nx affected:test
npx nx affected:graph
```

## Gráfico Monorepo - Ecommerce
![alt text](https://github.com/emersonnnb/DesafioMentoria/blob/Master/apps/ecommerce-admin/src/assets/graph.png?raw=true)

## E-commerce Painel Administrativo

Nesta área é possível acessar a lista completa de usuários da plataforma do e-commerce para administração.
A funcionalidade conta com uma busca por todos as colunas da tabela de usuários bem como paginação.

Foi utilizada a estrutura e o layout  do e-commerce alterando ele para monorepo.
Seguindo o padrão do sistema, os serviços e componentes possuem testes unitários em Jest.


**Libs desenvolvidas:**
- data-access/user
- feature/user