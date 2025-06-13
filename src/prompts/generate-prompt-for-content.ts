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
  const dynamicInstructions = getContentInstructions(contentType);
  return `
    Você é um gerador de conteúdo profissional para redes sociais. Com base nos campos abaixo, gere um conteúdo otimizado e completo para um post, no estilo da plataforma indicada:

    📌 Parâmetros:
    - Plataforma: ${platform}
    - Tipo de conteúdo: ${contentType}
    - Tom: ${tom}
    - Palavras-chave: ${keys.join(", ")}

    ${dynamicInstructions}

    📌 Gere as seguintes seções, no formato abaixo:

    {
      "title": "📌 Título com emoji e gancho atrativo",
      "mainText": "Texto principal com até 3 parágrafos curtos, usando o tom definido. Inclua uma lista de até 3 pontos principais com emojis. Finalize com uma pergunta para gerar comentários.",
      "hashtags": ["#palavra1", "#palavra2", "#palavra3", "#palavra4"],
      "callToAction": "Frase breve incentivando comentários ou compartilhamento.",
      "bestTime": "09:00 - 12:00 ou 17:00 - 18:00 (dias úteis)",

      "visualSuggestion": {
        "type": "Imagem profissional ou contextual",
        "description": "Descreva o tipo de imagem ideal para o post, com base no tema e canal",
        "style": "clean, leve, técnico ou inspirador",
        "suggestedColors": ["#0044cc", "#ffffff", "#eeeeee"],
        "dimensions": "1200x628px"
      },

      "variations": {
        "short": "📌 Versão curta com bullet points e pergunta final",
        "question": "❓ Uma pergunta direta para engajar a rede com base no tema"
      },

      "engagementRate": "8.2%",
      "trendingScore": 87
    }

    ❗Responda apenas com o JSON limpo.
  `;
}

function getContentInstructions(contentType: string): string {
  const type = contentType.toLowerCase();

  if (
    type.includes("reel") ||
    type.includes("shorts") ||
    type.includes("short")
  ) {
    return `
🎬 Este é um conteúdo de vídeo curto (Reels, Shorts, TikTok). Gere um roteiro com:
- Abertura impactante nos primeiros 5 segundos com emoji.
- Desenvolvimento com 2 a 3 pontos curtos e envolventes.
- Fechamento com uma chamada para ação clara (ex: "Comenta se você já passou por isso!").
- Indique a duração aproximada do vídeo.
- Sugestão de cortes, músicas ou visual dinâmico.
    `.trim();
  }

  if (
    (type.includes("video") || type.includes("vídeo")) &&
    !type.includes("short")
  ) {
    return `
📽️ Este é um conteúdo do tipo VÍDEO LONGO (YouTube, IGTV, etc). Gere um roteiro estruturado com:
- Introdução com gancho atrativo em até 10 segundos.
- Desenvolvimento dividido em blocos com subtítulos curtos.
- Pelo menos 2 perguntas ao longo do vídeo para engajar o público.
- Conclusão com resumo e chamada para ação (ex: "inscreva-se", "comente sua opinião").
- Estilo sugerido (ex: vlog, tutorial, entrevista) e duração estimada.
    `.trim();
  }

  if (
    type.includes("article") ||
    type.includes("artigo") ||
    type.includes("blog")
  ) {
    return `
📝 Este é um conteúdo do tipo ARTIGO ou BLOG. Estruture da seguinte forma:
- Título otimizado para SEO.
- Introdução clara e contextualizando o tema.
- 3 a 5 seções com subtítulos bem definidos.
- Conclusão com reflexão ou resumo.
- Sugestão de imagens ou gráficos que podem complementar o texto.
    `.trim();
  }

  return `
🧾 Este é um conteúdo para REDES SOCIAIS. Estruture assim:
- Texto principal com até 3 parágrafos.
- Lista de até 3 tópicos com emojis.
- Pergunta final para engajamento com emoji.
- Hashtags relevantes e linguagem adaptada à plataforma.
    `.trim();
}
