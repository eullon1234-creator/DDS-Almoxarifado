# DDS Almoxarifado - Integração Deepseek

## Configuração da API Deepseek

### 1. Obter a Chave de API

1. Acesse [https://platform.deepseek.com](https://platform.deepseek.com)
2. Crie uma conta ou faça login
3. Vá para a seção de API Keys
4. Gere uma nova chave de API
5. Copie a chave (você não poderá vê-la novamente)

### 2. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto (copie do `.env.example`)
2. Adicione sua chave Deepseek:
   ```
   NEXT_PUBLIC_DEEPSEEK_API_KEY=sua_chave_aqui
   ```

3. Se ainda não tiver Supabase configurado, também adicione:
   ```
   NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
   ```

### 3. Reiniciar o Servidor

```bash
npm run dev
```

## Funcionalidades

- **Gerar Novo Tema**: Seleciona aleatoriamente um dos temas pré-carregados
- **Gerar com IA (Deepseek)**: Usa a API do Deepseek para gerar um novo tema de DDS único e relevante
- **Baixar PDF**: Cria um PDF do tema atual para imprimir ou compartilhar

## Como Funciona

A integração Deepseek:
1. Envia um prompt em português pedindo um tema de segurança para almoxarifado
2. Evita temas já cobertos (lista de temas pré-existentes)
3. Gera conteúdo estruturado com título, conteúdo detalhado e resumo
4. Adiciona o novo tema à lista e o exibe imediatamente

## Troubleshooting

**"DEEPSEEK_API_KEY não configurada"**
- Verifique se `.env.local` existe e tem a chave correta
- Reinicie o servidor (`npm run dev`)

**Erro 401/403 da API**
- Verifique se a chave está correta
- A chave pode estar expirada ou revogada

**Erro de timeout**
- A API pode estar lenta
- Tente novamente em alguns segundos

## Desenvolvimento

Arquivo principal da integração: `lib/deepseek.ts`
Componente que usa a integração: `components/DDSGenerator.tsx`
