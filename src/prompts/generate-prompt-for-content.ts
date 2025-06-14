export interface GenerateContentParams {
  platform: string;
  contentType: string;
  tom: string;
  keys: string[];
}

export function generatePromptForContent({
  platform,
  contentType,
  tom,
  keys,
}: GenerateContentParams): string {
  const keywords =
    keys.length > 0
      ? keys.join(", ")
      : "conteúdo, engajamento, insights, criatividade";

  return `
    Você é um gerador de conteúdo profissional para redes sociais. Gere um conteúdo completo e estratégico para criadores digitais, de acordo com os parâmetros abaixo.

    Parâmetros:
    - Plataforma: ${platform}
    - Tipo de conteúdo: ${contentType}
    - Tom: ${tom}
    - Palavras-chave: ${keywords}

    Instruções:
    - O conteúdo gerado deve ser entregue em formato JSON (estrutura abaixo).
    - O campo "mainText" deve conter o conteúdo principal adaptado ao tipo especificado:
      - Se for vídeo (ex: YouTube, IGTV), siga uma estrutura de roteiro com gancho, introdução, seções numeradas, engajamento no meio e conclusão com CTA.
      - Se for reel ou shorts, utilize roteiro em tópicos rápidos, com impacto nos primeiros segundos, dinâmica e CTA.
      - Se for artigo, escreva uma miniestrutura com título, introdução, subtópicos e conclusão.
      - Se for post tradicional, use texto curto com bullets e pergunta final.
    - Utilize emojis no título, bullets e na pergunta final.
    - Adicione taxa de engajamento estimada e um score de tendência no final.

    Importante:
    - NÃO utilize formatação Markdown. 
    - Não use **negrito**, *itálico*, # títulos, listas com -, blocos de código ou qualquer outro tipo de sintaxe Markdown.
    - Escreva o texto LIMPO, usando apenas texto simples, quebras de linha e emojis para organização e ênfase.

    Estrutura do JSON (responda exatamente neste formato, sem markdown):

    {
      "title": "📌 Título com emoji e gancho atrativo",
      "mainText": "Conteúdo principal estruturado com base no tipo (${contentType}) — pode ser roteiro, texto direto, artigo curto, etc.",
      "hashtags": ["#${keys[0] || "conteudo"}", "#${keys[1] || "engajamento"}", "#${keys[2] || "criador"}", "#${keys[3] || "comunidade"}"],
      "callToAction": "Frase incentivando comentários, compartilhamento ou ação.",
      "bestTime": "09:00 - 12:00 ou 17:00 - 18:00 (dias úteis)",

      "visualSuggestion": {
        "type": "Imagem profissional ou contextual",
        "description": "Tipo ideal de imagem para a plataforma e tema",
        "style": "clean, leve, técnico ou inspirador",
        "suggestedColors": ["#0044cc", "#ffffff", "#eeeeee"],
        "dimensions": "1200x628px"
      },

      "variations": {
        "short": "📌 Versão curta com 3 bullets e pergunta final",
        "question": "❓ Pergunta simples para engajar com base no tema"
      },

      "engagementRate": "8.2%",
      "trendingScore": 87
    }

    ❗Responda apenas com o JSON. Não use blocos de markdown. Não adicione explicações.
  `.trim();
}
