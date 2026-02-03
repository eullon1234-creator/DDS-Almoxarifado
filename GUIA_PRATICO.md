# Guia Prático - DDS Almoxarifado com Deepseek

## Passo a Passo para Começar

### Preparação (primeira vez)

1. **Clone ou acesse o projeto**:
   ```bash
   cd c:\Eullon\Projeto Eullon\DDS\DDS-Almoxarifado
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Obtenha a chave Deepseek**:
   - Visite: https://platform.deepseek.com
   - Faça login ou crie conta
   - Gere uma API Key na seção "API Keys"
   - Copie a chave

4. **Crie o arquivo `.env.local`**:
   ```bash
   # No Windows PowerShell:
   New-Item -Path .env.local -ItemType File
   
   # Ou copie do template:
   Copy-Item .env.example .env.local
   ```

5. **Edite `.env.local`** e adicione sua chave:
   ```env
   NEXT_PUBLIC_DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

6. **Inicie o servidor**:
   ```bash
   npm run dev
   ```

7. **Acesse a aplicação**:
   - Abra: http://localhost:3000

### Usando a Aplicação

#### Cenário 1: Usar um tema pré-existente
1. Abra a aplicação
2. Clique em **"Gerar Novo Tema"** para escolher um tema aleatório
3. Digite o nome de quem vai ler
4. Clique em **"Baixar PDF"** para gerar um documento

#### Cenário 2: Gerar novo tema com IA
1. Clique em **"Gerar com IA (Deepseek)"**
2. Aguarde alguns segundos (o botão exibe "Gerando...")
3. Um novo tema único será criado e exibido
4. Repita quantas vezes quiser para gerar vários temas diferentes

#### Cenário 3: Criar múltiplos temas para a semana
1. Clique em "Gerar com IA" uma vez para cada dia da semana
2. Cada clique gera um tema completamente novo
3. Baixe o PDF de cada um
4. Compartilhe com a equipe

### Exemplos de Temas Gerados

A IA pode gerar temas como:
- "Prevenção de Acidentes com Estiletes"
- "Postura Correta Ao Levantar Pesos"
- "Comunicação Segura no Ambiente de Trabalho"
- "Inspeção Diária de Equipamentos"
- "Hidratação e Saúde do Colaborador"
- Etc.

### Troubleshooting

#### Problema: "Erro ao gerar tema com IA"
**Solução:**
```bash
# 1. Verifique se a chave está em .env.local:
cat .env.local

# 2. Reinicie o servidor:
npm run dev

# 3. Limpe o cache (se necessário):
npm run build
npm run dev
```

#### Problema: "DEEPSEEK_API_KEY não configurada"
**Solução:**
- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Verifique se tem a linha: `NEXT_PUBLIC_DEEPSEEK_API_KEY=sua_chave`
- Reinicie o servidor com `Ctrl+C` e `npm run dev`

#### Problema: Erro 401/403 da API
**Solução:**
- A chave pode estar incorreta ou expirada
- Acesse https://platform.deepseek.com e gere uma nova chave
- Atualize `.env.local` com a nova chave
- Reinicie o servidor

#### Problema: Timeout ao gerar tema
**Solução:**
- A API pode estar lenta
- Tente novamente em alguns segundos
- Verifique sua conexão com internet
- Verifique status da API Deepseek: https://platform.deepseek.com/status

### Dicas Importantes

✅ **Boas práticas:**
- Cada dia, gere um novo tema com IA para maior variedade
- Use a função PDF para manter registro dos DDSs
- Registre sempre o nome de quem vai ler
- Customize os temas pré-carregados se necessário

❌ **O que evitar:**
- Não compartilhe sua chave Deepseek
- Não coloque a chave no Git (use `.gitignore`)
- Não revoque a chave enquanto está usando em produção
- Não faça múltiplos cliques em "Gerar com IA" muito rapidamente

### Estrutura dos Temas

Cada tema tem:
```
┌─────────────────────────────────────┐
│         TÍTULO (impactante)         │ ← Máximo 10 palavras
├─────────────────────────────────────┤
│                                     │
│   CONTEÚDO (200-300 caracteres)     │ ← Detalhado e prático
│   Com dicas específicas para o       │
│   almoxarifado                      │
│                                     │
├─────────────────────────────────────┤
│   RESUMO (máximo 15 palavras)        │ ← Frase-chave memorável
│                                     │
└─────────────────────────────────────┘
```

### Exportando para PDF

O PDF gerado inclui:
- Logo/Título da empresa
- Data do DDS
- Nome de quem vai ler
- Título do tema
- Conteúdo completo
- Resumo em destaque

Exemplo de nome do arquivo: `DDS_2026-02-03.pdf`

### Extensões Futuras

Você pode adicionar:
1. **Banco de Dados**: Salvar temas no Supabase
2. **Histórico**: Ver temas já usados
3. **Categorias**: Organizar temas por tipo
4. **Notificações**: Lembrar de fazer o DDS diário
5. **Relatórios**: Análise de temas mais usados
6. **Múltiplos idiomas**: Gerar temas em outros idiomas

### Contato e Suporte

Se encontrar problemas:
1. Verifique a seção "Troubleshooting" acima
2. Leia [DEEPSEEK_SETUP.md](DEEPSEEK_SETUP.md)
3. Leia [ARQUITETURA.md](ARQUITETURA.md) para entender melhor como funciona

---

**Versão**: 1.0  
**Data**: Fevereiro de 2026  
**Status**: ✅ Pronto para Produção
