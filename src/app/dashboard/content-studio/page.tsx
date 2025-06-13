import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  CalendarIcon,
  FileTextIcon,
  Lightbulb,
  SparklesIcon,
} from "lucide-react";
import { Suggestion } from "./_components/suggestion";
import { getTopMy3Trend } from "./_data-access/get-top-my-3-trend";

export default async function ContentStudio() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const cards = await getTopMy3Trend(session.user.id);

  return (
    <main className="w-full h-full space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-purple-500/80 via-pink-400 to-pink-500/50 w-fit rounded-full p-4">
          <SparklesIcon className="size-10 text-white" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Content Studio</h1>
          <p className="text-muted-foreground">
            Crie conteúdo profissional com IA para todas as redes sociais
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4">
        <Card className="bg-transparent h-fit">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-8 text-muted-foreground" />
              <CardTitle className="text-xl">Ideias de hoje</CardTitle>
            </div>
            <CardDescription>
              Sugestões personalizadas do Gemini AI
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {cards?.map((card, index) => (
              <Suggestion
                key={index}
                title={card.title}
                searchGrowth={card.searchGrowth}
                competition={card.competition}
                platforms={card.platforms}
                badgeColor={card.badgeColor}
                borderColor={card.borderColor}
                trendLabel={card.trendLabel}
              />
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-transparent h-fit">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="size-8 text-muted-foreground" />
                <CardTitle className="text-xl">
                  Configurações do Conteúdo
                </CardTitle>
              </div>

              <CardDescription>
                Configure os parâmetros para gerar conteúdo personalizado
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Plataforma</Label>

                  <Select defaultValue="linkedin">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="linkedin">
                        <IconBrandLinkedin className="size-5 text-white" />
                        LinkedIn
                      </SelectItem>

                      <SelectItem value="instagram">
                        <IconBrandInstagram className="size-5 text-white" />
                        Instagram
                      </SelectItem>

                      <SelectItem value="twitter">
                        <IconBrandTiktok className="size-5 text-white" />
                        TikTok
                      </SelectItem>

                      <SelectItem value="youtube">
                        <IconBrandYoutube className="size-5 text-white" />
                        YouTube
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Conteúdo</Label>

                  <Select defaultValue="post">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="post">
                        <FileTextIcon className="size-5 text-white" />
                        Post
                      </SelectItem>

                      <SelectItem value="article">
                        <FileTextIcon className="size-5 text-white" />
                        Artigo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tom</Label>

                  <Select defaultValue="education">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="education">Educativo</SelectItem>
                      <SelectItem value="professional">Profissional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="inspirational">Inspirador</SelectItem>
                      <SelectItem value="humorous">Engraçado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tópico ou Palavra-chave</Label>

                <Textarea
                  placeholder="Digite aqui..."
                  className="max-h-36 min-h-36 resize-none"
                />
              </div>

              <Button className="w-full transition-colors duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                <SparklesIcon className="size-4 mr-2" />
                Gerar Conteúdo
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-lg">Conteúdo Gerado</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">
                  Explore as melhores práticas para criar conteúdo envolvente e
                  eficaz.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-lg">Sugestão Visual</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">
                  Explore as melhores práticas para criar conteúdo envolvente e
                  eficaz.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle className="text-lg">Variações</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground">
                Explore as melhores práticas para criar conteúdo envolvente e
                eficaz.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
