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
import FormContent from "./_components/form-content";

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
            <CardDescription>Sugestões personalizadas</CardDescription>
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

        <FormContent />
      </div>
    </main>
  );
}
