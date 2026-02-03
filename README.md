# App DDS Almoxarifado

Este é um aplicativo Next.js para gerenciar Diálogos Diários de Segurança (DDS) para a equipe do almoxarifado com integração de IA (Deepseek).

## Funcionalidades

- **Geração de Temas**: Temas diários focados em segurança no almoxarifado.
- **Geração com IA (Deepseek)**: Gere temas únicos e relevantes usando inteligência artificial.
- **Resumos**: Conteúdo resumido para leitura rápida.
- **PDF**: Opção de baixar o tema do dia em PDF para impressão.
- **Supabase**: Configurado para integração com banco de dados (opcional para persistência).

## Como Configurar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (copie do `.env.example`):

```env
# Deepseek API (Obrigatório para usar IA)
NEXT_PUBLIC_DEEPSEEK_API_KEY=sua_chave_deepseek_aqui

# Supabase (Opcional)
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
```

#### Como obter a Chave Deepseek:
1. Acesse [https://platform.deepseek.com](https://platform.deepseek.com)
2. Crie uma conta ou faça login
3. Vá para a seção de API Keys
4. Gere uma nova chave
5. Copie a chave para `.env.local`

**Nota**: O app funciona com dados de exemplo mesmo sem o Deepseek configurado, mas o botão "Gerar com IA" não funcionará.

### 3. Rodar o projeto
```bash
npm run dev
```
Acesse `http://localhost:3000`.

## Estrutura

- `components/DDSGenerator.tsx`: Componente principal que gera os temas e o PDF.
- `lib/supabase.ts`: Cliente de conexão com o Supabase.
- `lib/deepseek.ts`: Integração com a API Deepseek para gerar temas com IA.
- `app/api/deepseek/route.ts`: Rota API opcional para backend (segurança adicional).
- `app/page.tsx`: Página inicial.

## Como Usar

1. **Gerar Novo Tema**: Clique em "Gerar Novo Tema" para selecionar um tema aleatório pré-existente.
2. **Gerar com IA**: Clique em "Gerar com IA (Deepseek)" para criar um novo tema usando inteligência artificial.
3. **Registrar Leitor**: Digite o nome de quem vai ler o DDS.
4. **Baixar PDF**: Clique em "Baixar PDF" para salvar o tema em PDF.

## Personalização

Para adicionar mais temas pré-carregados, edite a lista `MOCK_THEMES` no arquivo `components/DDSGenerator.tsx`.

Para detalhes sobre a configuração Deepseek, veja [DEEPSEEK_SETUP.md](DEEPSEEK_SETUP.md).
