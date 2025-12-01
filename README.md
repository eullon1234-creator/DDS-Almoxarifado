# App DDS Almoxarifado

Este é um aplicativo Next.js para gerenciar Diálogos Diários de Segurança (DDS) para a equipe do almoxarifado.

## Funcionalidades

- **Geração de Temas**: Temas diários focados em segurança no almoxarifado.
- **Resumos**: Conteúdo resumido para leitura rápida.
- **PDF**: Opção de baixar o tema do dia em PDF para impressão.
- **Supabase**: Configurado para integração com banco de dados (opcional para persistência).

## Como Configurar

1.  **Instalar dependências**:
    ```bash
    npm install
    ```

2.  **Configurar Supabase (Opcional)**:
    - Crie um projeto no [Supabase](https://supabase.com/).
    - Crie um arquivo `.env.local` na raiz do projeto.
    - Adicione suas chaves:
      ```env
      NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
      NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
      ```
    - *Nota: O app funciona com dados de exemplo mesmo sem o Supabase configurado.*

3.  **Rodar o projeto**:
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000`.

## Estrutura

- `components/DDSGenerator.tsx`: Componente principal que gera os temas e o PDF.
- `lib/supabase.ts`: Cliente de conexão com o Supabase.
- `app/page.tsx`: Página inicial.

## Personalização

Para adicionar mais temas, edite a lista `MOCK_THEMES` no arquivo `components/DDSGenerator.tsx` ou conecte ao Supabase para buscar do banco de dados.
