# Desafio Front-end - Quasar e Vue 3

## Decisões Arquiteturais

### Frameworks e Ferramentas Utilizadas
- **Vue 3**: Escolhi o Vue 3 pela sua facilidade de uso, excelente reatividade e integração com o Quasar Framework, o que facilita o desenvolvimento de interfaces complexas com uma curva de aprendizado suave.
- **Quasar Framework**: Optei por usar o Quasar para acelerar o desenvolvimento, já que ele oferece uma série de componentes prontos e uma abordagem multiplataforma. Isso permite que a mesma base de código seja utilizada tanto para web quanto para mobile ou desktop, o que torna o desenvolvimento mais ágil e eficiente.
- **Design Patterns do Quasar**: Utilizei os padrões de design e arquitetura do Quasar para manter a estrutura organizada e seguir as melhores práticas do framework. Além disso, considero que a utilização de módulos (como acontece em outras arquiteturas de front-end) poderia ser uma boa abordagem para separar funcionalidades em partes mais coesas e independentes.

### Estrutura Modular (Considerada)
Embora o projeto tenha seguido uma estrutura padrão do Quasar, a utilização de uma abordagem modular também seria uma excelente opção para projetos maiores, onde cada módulo (ou feature) é separado em suas próprias pastas, promovendo o isolamento de responsabilidades e uma maior escalabilidade.

### Ferramentas de Teste
- **Vitest**: Para os testes, escolhi o Vitest, que é uma alternativa moderna ao Jest, porém otimizada para o ecossistema Vue. Sua velocidade e integração facilitam o desenvolvimento de testes unitários com menos configurações e mais performance.

## Versões Utilizadas
- **Node.js**: v18.20.4
- **Vue.js**: v3.4.18
- **Quasar Framework**: v2.16.0
- **TypeScript**: v5.5.4
- **Vitest**: v2.1.1 (para testes)

## Instruções para Executar o Projeto

### Requisitos
- **Node.js** versão 16 ou superior
- **Quasar CLI** instalado globalmente
- **Ponto importante:** para subir a aplicação seguir instruções do README.md
  ```bash
  npm install -g @quasar/cli
