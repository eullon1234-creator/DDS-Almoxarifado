## Arquitetura da Integração Deepseek

```
┌─────────────────────────────────────────────────────────────┐
│                  Interface do Usuário                        │
│              (DDSGenerator.tsx - React Component)            │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────────────────────┐ │
│  │ Gerar Novo Tema  │  │  Gerar com IA (Deepseek) 🔮      │ │
│  │ (Local/Supabase) │  │  (Usa API Deepseek)              │ │
│  └──────────────────┘  └──────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴────────────────────┐
        │                                          │
        ▼                                          ▼
    ┌────────────────┐               ┌──────────────────────┐
    │  Mock Themes   │               │  lib/deepseek.ts     │
    │  ou Supabase   │               │                      │
    │                │               │ generateDDSTheme()   │
    │  15 temas      │               │                      │
    │  pré-carregados│               │  - Cria prompt       │
    └────────────────┘               │  - Faz request       │
                                     │  - Parse resposta    │
                                     └──────────────────────┘
                                              │
                                              │
                                              ▼
                                  ┌─────────────────────────┐
                                  │   Deepseek API          │
                                  │   (Modelo Chat)         │
                                  │                         │
                                  │  Gera resposta JSON:    │
                                  │  - title                │
                                  │  - content              │
                                  │  - summary              │
                                  └─────────────────────────┘
        
        ┌────────────────────────────────────────────┐
        │         Tema Gerado/Selecionado            │
        │    (Theme Object - adicionado à lista)     │
        └────────────────────────────────────────────┘
                        │
        ┌───────────────┴──────────────┐
        │                              │
        ▼                              ▼
    ┌──────────────┐          ┌────────────────┐
    │ Exibir Tema  │          │  Baixar PDF    │
    │              │          │  (jsPDF)       │
    │ - Título     │          │                │
    │ - Conteúdo   │          │ Formato:       │
    │ - Resumo     │          │ Data, Leitor,  │
    └──────────────┘          │ Tema Completo  │
                              └────────────────┘
```

## Fluxo de Dados

### 1. Gerar Novo Tema (Existente)
```
Usuário clica → generateNewTheme() → Seleciona aleatoriamente → Atualiza estado
```

### 2. Gerar com IA (Novo)
```
Usuário clica 
    ↓
generateAITheme() 
    ↓
Faz chamada a generateDDSTheme()
    ↓
Cria prompt em português
    ↓
Faz POST request a https://api.deepseek.com/v1/chat/completions
    ↓
Deepseek retorna JSON com tema novo
    ↓
Parse e validação
    ↓
Adiciona à lista de temas (com ID único)
    ↓
Define como tema atual
    ↓
Exibe ao usuário
```

## Variáveis de Ambiente

```
NEXT_PUBLIC_DEEPSEEK_API_KEY
│
├─ Definida em: .env.local
├─ Origem: https://platform.deepseek.com/api_keys
├─ Obrigatória para: Usar a funcionalidade "Gerar com IA"
└─ Segurança: Prefixo NEXT_PUBLIC_ significa que será exposta no cliente
              Considere usar app/api/deepseek/route.ts para maior segurança
```

## Estrutura de Resposta Deepseek

```json
{
  "id": "...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "deepseek-chat",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "{\"title\": \"...\", \"content\": \"...\", \"summary\": \"...\"}"
      },
      "finish_reason": "stop"
    }
  ]
}
```

## Tratamento de Erros

```
generateAITheme()
    │
    ├─ Se API_KEY não configurada → Erro: "DEEPSEEK_API_KEY não configurada"
    │
    ├─ Se resposta HTTP não 200 → Erro com status code
    │
    ├─ Se JSON inválido → Erro: "Não foi possível extrair JSON da resposta"
    │
    ├─ Se dados incompletos → Erro: "Resposta incompleta da API"
    │
    └─ Erro exibido em caixa vermelha na UI
```

## Performance

- **Timeout típico**: 2-5 segundos
- **Rate Limiting**: Implementado delay de 500ms entre requisições
- **Cache**: Temas gerados são mantidos em memória (useState)
- **Fallback**: Sempre há temas pré-carregados disponíveis

## Segurança

### Recomendações:

1. **Para Produção**: Use variável `DEEPSEEK_API_KEY` (sem NEXT_PUBLIC_) no servidor
2. **Alternativa**: Use a rota `app/api/deepseek/route.ts` como intermediária
3. **Rate Limiting**: Adicione limite de requisições no servidor
4. **Validação**: Valide sempre a resposta antes de usar
