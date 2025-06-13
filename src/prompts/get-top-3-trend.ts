import { User } from "@/generated/prisma";

export function getTop3Trend(user: User): string {
  return `
    Você é um assistente especializado em identificar tendências relevantes para criadores de conteúdo. Gere 3 insights de tendência para o dia de hoje com base no seguinte perfil de criador de conteúdo:

    Perfil do Criador:
    - Canal principal: Instagram, TikTok, YouTube ou LinkedIn  
    - Público-alvo: ${user.targetAudience}
    - Estilo de conteúdo: ${user.contentStyle}  
    - Interesse em: ${user.interests}  
    - Tema atual: Algum que pertença aos interesses do usuário.

    Formato de saída: JSON puro. NÃO use blocos markdown, nem textos extras. Apenas o JSON:

    [
      {
        "title": "Título curto e chamativo da tendência",
        "searchGrowth": "+340% de aumento nas buscas",
        "competition": "alta", // baixa | média | alta
        "platforms": ["linkedin", "instagram"], // opções: linkedin, instagram, tiktok, youtube
        "badgeColor": "bg-green-500/60", // Classes de cor do Tailwind: bg-green-500/60 para alta, bg-yellow-500/60 para média, bg-red-500/60 para baixa
        "borderColor": "border-green-600", // Classes de cor do Tailwind: border-green-600 para alta, border-yellow-600 para média, border-red-600 para baixa
        "trendLabel": "Em alta"
      }
    ]
`;
}
