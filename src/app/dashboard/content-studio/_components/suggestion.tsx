import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InstagramIcon,
  LinkedinIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";

export function Suggestion() {
  return (
    <Card className="bg-transparent gap-3">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          <Badge className="bg-green-600/60 border-b border-green-600">
            high
          </Badge>

          <Badge className="bg-purple-600/50 border-b border-purple-600">
            <TrendingUpIcon className="size-4" />
            Trending
          </Badge>
        </div>

        <CardTitle>Ferramentas de automação</CardTitle>
      </CardHeader>

      <CardContent>
        <span className="text-muted-foreground text-sm">
          Tópico em alta com potencial viral (+340% de buscas)
        </span>

        <div className="flex items-center gap-1">
          <LinkedinIcon className="size-5 text-muted-foreground mt-2" />
          <InstagramIcon className="size-5 text-muted-foreground mt-2 ml-2" />
        </div>

        <Button variant="outline" className="mt-4 w-full">
          <ZapIcon className="size-4 mr-2" />
          Usar ideia
        </Button>
      </CardContent>
    </Card>
  );
}
