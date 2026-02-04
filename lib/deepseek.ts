interface DeepseekTheme {
  title: string;
  content: string;
  summary: string;
}

const DEEPSEEK_API_KEY = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function generateDDSTheme(apiKey?: string): Promise<DeepseekTheme> {
  const finalApiKey = apiKey || (typeof window !== 'undefined' ? localStorage.getItem('cyber_dds_api_key') : null) || process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;

  if (!finalApiKey) {
    throw new Error('Chave API não configurada. Acesse as configurações (ícone de engrenagem) para inserir sua chave.');
  }

  const prompt = `Gere um tema para Diálogo Diário de Segurança (DDS) relevante para um almoxarifado/warehouse.

O tema deve incluir:
1. Um título impactante e curto (máximo 10 palavras)
2. Um conteúdo detalhado com dicas práticas (200-300 caracteres)
3. Um resumo conciso (máximo 15 palavras)

Temas já cobertos para EVITAR: Uso de EPIs, Levantamento de Cargas, 5S/Organização, Empilhadeiras, Prevenção de Incêndios, Estiletes, Paletes Quebrados, Armazenamento em Altura, Cruzamentos, Hidratação, Celular, Descarte de Resíduos, Ergonomia, Eletricidade, Proteção dos Olhos.

Responda APENAS em JSON com este formato:
{
  "title": "Título do Tema",
  "content": "Conteúdo detalhado sobre o tema",
  "summary": "Resumo conciso"
}`;

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${finalApiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Deepseek API Error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Resposta inválida da API Deepseek');
    }

    const content = data.choices[0].message.content;

    // Parse JSON da resposta
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Não foi possível extrair JSON da resposta');
    }

    const theme = JSON.parse(jsonMatch[0]) as DeepseekTheme;

    // Validação básica
    if (!theme.title || !theme.content || !theme.summary) {
      throw new Error('Resposta incompleta da API');
    }

    return theme;
  } catch (error) {
    console.error('Erro ao gerar tema com Deepseek:', error);
    throw error;
  }
}

export async function generateMultipleDDSThemes(count: number = 5): Promise<DeepseekTheme[]> {
  const themes: DeepseekTheme[] = [];

  for (let i = 0; i < count; i++) {
    try {
      const theme = await generateDDSTheme();
      themes.push(theme);
      // Pequeno delay para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Erro ao gerar tema ${i + 1}:`, error);
    }
  }

  return themes;
}
